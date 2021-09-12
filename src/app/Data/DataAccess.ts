import { InanoSQLInstance, nSQL } from "@nano-sql/core";
import { Const } from '../const';
import { Trade } from "../Models/TradeModel";

export class DataAccess {
    private dbNSQL: InanoSQLInstance;

    constructor(dbNSQL = nSQL(Const.TABLE_NAME)) {
        this.dbNSQL = dbNSQL;
    }

    /** Insert a single or bunch of records into the table   */
    /* istanbul ignore next */
    private async insert(data: Trade) {
        await this.dbNSQL.query("upsert", data).exec();
    }

    /** Select all the records form the table */
    /* istanbul ignore next */
    private async selectAll() {
        const data = await this.dbNSQL.query("select").exec();
        return data;
    }

    /** Select records by trade_id form the table */
    /* istanbul ignore next */
    private async selectItemByTradeId(trade_id: string) {
        const data = await this.dbNSQL.query("select").where(["trade_id", "=", trade_id]).exec();
        return data;
    }

    public async dbActions(actionName: string, params: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                switch (actionName) {
                    case Const.GET_ALL_ITEMS:
                        resolve(this.selectAll());
                        break;
                    case Const.GET_ITEM_BY_TRADE_ID:
                        if (params && params.trade_id) {
                            resolve(this.selectItemByTradeId(params.trade_id));
                        } else {
                            reject(new TypeError('Missing paramerter: trade_id'));
                        }
                        break;
                    case Const.INSERT_ITEM:
                        if (params && params.trade_id) {
                            await this.insert(params);
                            resolve('Data inserted');
                        } else {
                            reject(new TypeError(`Data can't be inserted`));
                        }
                        break;
                    case Const.INSERT_ITEMS:
                        if (params && params.length > 0) {
                            await this.insert(params);
                            resolve('Data updated');
                        } else {
                            reject(new TypeError(`Data can't be updated`));
                        }
                        break;
                    default:
                        reject(new Error('No or incorrect action provided'));
                        break;
                }
            } catch (e) {
                /* istanbul ignore next */
                reject(e);
            };
        });
    }
}