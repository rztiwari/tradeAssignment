import { InitialDataSetup } from "../Data/InitialDataSetup";
/* istanbul ignore next */
export default class SetupController {

    private initialDataSetup: InitialDataSetup;
    constructor(initialDataSetup: InitialDataSetup = new InitialDataSetup()) {
        this.initialDataSetup = initialDataSetup;
    }
    public async setup() {
        return await this.initialDataSetup.createDatabase();
    };
}