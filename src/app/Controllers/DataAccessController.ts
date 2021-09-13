/** Controller Class for all data modification actions 
 * based on FrontController pattern */
import { DataAccess } from "../Data/DataAccess";
/* istanbul ignore next */
export default class DataAccessController {

    private dataAccess: DataAccess;
    constructor() {
        this.dataAccess = new DataAccess();
    }
    // Common method for all updates
    public dataAction(actionName: string, params: any) {
        return this.dataAccess.dbActions(actionName, params);
    };
}