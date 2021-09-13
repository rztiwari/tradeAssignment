import express from "express";
import SetupHandler from "../Handlers/SetupHandler";
import { DateChangeHandler } from "../Handlers/DateChangeHandler";
import * as routes from '../routes';

const app = express();
const port = 3000;

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

// Creates the server and initizes the date change actions.
export class Server {
    private date: number | undefined;

    // Date change action initialized.
    private checkTime() {
        const newDate = new Date().getDate();
        if (this.date !== newDate) {
            console.log('date changed', newDate, this.date);
            let dateChangeHandler = new DateChangeHandler()
            dateChangeHandler.checkRecords();
            this.date = newDate;
        }
    }

    private async setupDatabase() {
        const data = await new SetupHandler().setup();
    }

    public startServer() {
        // Configure routes
        routes.register(app);
        app.listen(port, () => {
            this.setupDatabase();
            this.date = new Date().getDate();
            setInterval(this.checkTime, 20000);
            console.log(`server started at http://localhost:${port}`);
        });
    }
}