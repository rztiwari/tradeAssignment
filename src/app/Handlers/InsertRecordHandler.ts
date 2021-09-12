import { Const } from "../const";
import DataAccessController from "../Controllers/DataAccessController";
import { Trade } from "../Models/TradeModel";
import DateUtil from "../Utils/DateUtil";

export class InsertRecordHandler {

    private dataAccessController: DataAccessController;

    constructor(dataAccessController = new DataAccessController()){
        this.dataAccessController = dataAccessController;
    }

    /*istanbul ignore next */
    private async getItemByTradeId(trade_id: string){
        return this.dataAccessController.dataAction(Const.GET_ITEM_BY_TRADE_ID, {trade_id});
    }

    public async insertRecord(data: Trade){
        
        if(data && data.trade_id) {
            if(!data.expired){
                data.expired='N';
            }
            const selectedItem =  await this.getItemByTradeId(data.trade_id);
            if(!selectedItem || selectedItem.length == 0){
                await this.dataAccessController.dataAction(Const.INSERT_ITEM, data);
            } else {
                if(!selectedItem[0]['version'] || (selectedItem[0]['version'] <= data.version)){
                    const strMaturityDate = data.maturity_date;
                    const longMaturityDate = DateUtil.getLongTimeFromString(strMaturityDate);
                    const todaylongDate = DateUtil.getTodayLongDate();
                    if(longMaturityDate >= todaylongDate){
                        await this.dataAccessController.dataAction(Const.INSERT_ITEM, data);
                    } else {
                        throw new Error('Maturity Date can\'t be less than today.');
                    }
                } else {
                    throw new Error('The version of the current trade is less than existing trade');
                }
            }
        }
    }
}