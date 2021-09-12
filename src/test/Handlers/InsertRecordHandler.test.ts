import { Const } from "../../app/const";
import { InsertRecordHandler } from "../../app/Handlers/InsertRecordHandler";
import { Trade } from "../../app/Models/TradeModel";

describe('test the InsertRecordHandler class', () => {

    let insertRecordHandler: InsertRecordHandler;

    const mockdataAccessController = {
        dataAction: jest.fn()
    };

    const mockData: Trade = {
        version: 1,
        trade_id: 'T1',
        book_id: 'B1',
        maturity_date: '20/09/2021',
        created_date: '11/09/2021',
        counter_party_id: 'CP_1',
        expired: 'N'
    }

    beforeEach(() => {
        insertRecordHandler = new InsertRecordHandler(mockdataAccessController as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('it should insert the record into the database if its not present already', async () => {
        jest.spyOn(InsertRecordHandler.prototype as any, 'getItemByTradeId').mockImplementation(() => {
            return;
        });
        await insertRecordHandler.insertRecord(mockData);
        expect(mockdataAccessController.dataAction).toBeCalledWith(Const.INSERT_ITEM, mockData);
    });

    test('it should insert the record into the database if higher version of trade is provided and exiry date not prior date', async () => {
        jest.spyOn(InsertRecordHandler.prototype as any, 'getItemByTradeId').mockImplementation(() => {
            return [mockData];
        });
        let tempData = mockData;
        tempData.version = 2;
        await insertRecordHandler.insertRecord(tempData);
        expect(mockdataAccessController.dataAction).toBeCalledWith(Const.INSERT_ITEM, tempData);
    });

    test('it should error out if lower version of trade is provided', () => {
        jest.spyOn(InsertRecordHandler.prototype as any, 'getItemByTradeId').mockImplementation(() => {
            let tempData = mockData;
            tempData.version = 2;
            return [tempData];
        });
        let sampleData = mockData;
        sampleData.version = 1;
        expect(
            insertRecordHandler.insertRecord({
                version: 1,
                trade_id: 'T1',
                book_id: 'B1',
                maturity_date: '20/09/2021',
                created_date: '11/09/2021',
                counter_party_id: 'CP_1',
                expired: 'N'
            })
        ).rejects.toEqual(new Error('The version of the current trade is less than existing trade'));
    });

    test('it should error out if maturity date lower that today', () => {
        jest.spyOn(InsertRecordHandler.prototype as any, 'getItemByTradeId').mockImplementation(() => {
            return [mockData];
        });
        expect(
            insertRecordHandler.insertRecord({
                version: 3,
                trade_id: 'T1',
                book_id: 'B1',
                maturity_date: '15/06/2021',
                created_date: '11/09/2021',
                counter_party_id: 'CP_1',
                expired: 'N'
            })
        ).rejects.toEqual(new Error('Maturity Date can\'t be less than today.'));
    });

})