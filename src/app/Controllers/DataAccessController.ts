import { DataAccess } from "../Data/DataAccess";
/* istanbul ignore next */
export default class DataAccessController {

    private dataAccess: DataAccess;
    constructor() {
        this.dataAccess = new DataAccess();
    }
    public dataAction(actionName: string, params: any) {
        return this.dataAccess.dbActions(actionName, params);
    };
}