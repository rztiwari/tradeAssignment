import { Const } from "../const";
import DataAccessController from "../Controllers/DataAccessController";
import { Trade } from "../Models/TradeModel";
import DateUtil from "../Utils/DateUtil";

export class DateChangeHandler {

    private dataAccessController: DataAccessController;

    /*istanbul ignore next */
    constructor(dataAccessController = new DataAccessController()) {
        this.dataAccessController = dataAccessController;
    }

    /*istanbul ignore next */
    private async getItems() {
        try{
            return this.dataAccessController.dataAction(Const.GET_ALL_ITEMS, null);
        } catch (e) {
            // Catch all exceptions here.
        }
    }

    public async checkRecords() {
        const items: Array<Trade> = await this.getItems();
        const itemsToUpdate: Array<Trade> = [];
        items.forEach(item => {
            const currLongDate = DateUtil.getTodayLongDate();
            if (item.maturity_date && DateUtil.getLongTimeFromString(item.maturity_date) < currLongDate) {
                item.expired = 'Y';
                itemsToUpdate.push(item);
            }
        })
        if (itemsToUpdate.length > 0) {
            await this.dataAccessController.dataAction(Const.INSERT_ITEMS, itemsToUpdate);
        }
    }
}