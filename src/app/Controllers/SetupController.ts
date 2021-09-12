import { InitialDataSetup } from "../Data/InitialDataSetup";
/* istanbul ignore next */
export default class SetupController {

    private initialDataSetup: InitialDataSetup;
    constructor() {
        this.initialDataSetup = new InitialDataSetup();
    }
    public setup() {
        return this.initialDataSetup.createDatabase();
    };
}