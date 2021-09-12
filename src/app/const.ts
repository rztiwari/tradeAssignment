export class Const {
    public static TABLE_NAME: string = 'trades';
    public static DATABASE_ID: string = 'my_db';
    public static GET_ALL_ITEMS: string = 'getAllItems';
    public static GET_ITEM_BY_TRADE_ID: string = 'getItemByTradeId';
    public static INSERT_ITEM: string = 'insertItem';
    public static INSERT_ITEMS: string = 'insertItems';

    public static TABLE_SCHEMA: Object = {
        "trade_id:string": { pk: true },
        "version:int": { default: 1 },
        "counter_party_id:string": {},
        "book_id:string": {},
        "maturity_date:string": {},
        "created_date:string": {},
        "expired:string": {}
    };
}