import * as express from "express";
import { Const } from "../const";
import DataAccessController from "../Controllers/DataAccessController";
import { InsertRecordHandler } from "../Handlers/InsertRecordHandler";

// All the routes for the project defined here.
/* istanbul ignore next */
export const register = (app: express.Application) => {

    app.post("/insertItem", async (req: any, res) => {
        try {
            const data = req.body;
            const insertRecordHandler = new InsertRecordHandler();
            try {
                await insertRecordHandler.insertRecord(data);
                res.send(`Record added successfully -- ${JSON.stringify(data)}`);
            } catch (e) {
                res.send(`Record could not be inserted because of -- ${e.message}`);
            }
        } catch (e) {
            res.send(e.message);
        }
    });

    app.get("/getAllItems", async (req: any, res) => {
        try {
            const dataAccessController = new DataAccessController();
            const data = await dataAccessController.dataAction(Const.GET_ALL_ITEMS, null);
            res.send(data);
        } catch (e) {
            res.send(e.message);
        }
    });
};