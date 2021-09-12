import { Const } from "../../app/const";
import { DateChangeHandler } from "../../app/Handlers/DateChangeHandler";
import { Trade } from "../../app/Models/TradeModel";

describe('test the DateChangeHandler class', () => {

    let dateChangeHandler: DateChangeHandler;

    const mockdataAccessController = {
        dataAction: jest.fn()
    };

    const mockData: Array<Trade> = [{
        version: 1,
        trade_id: 'T1',
        book_id: 'B1',
        maturity_date: '20/08/2021',
        created_date: '11/09/2021',
        counter_party_id: 'CP_1',
        expired: 'Y'
    },
    {
        version: 1,
        trade_id: 'T1',
        book_id: 'B1',
        maturity_date: '01/09/2021',
        created_date: '11/09/2021',
        counter_party_id: 'CP_1',
        expired: 'N'
    },
    {
        version: 1,
        trade_id: 'T1',
        book_id: 'B1',
        maturity_date: '03/09/2021',
        created_date: '11/09/2021',
        counter_party_id: 'CP_1',
        expired: 'N'
    }]

    beforeEach(() => {
        dateChangeHandler = new DateChangeHandler(mockdataAccessController as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('it should update all expired records', async () => {
        jest.spyOn(DateChangeHandler.prototype as any, 'getItems').mockImplementation(() => {
            return mockData;
        });
        await dateChangeHandler.checkRecords();
        mockData.map(data => data.expired = 'Y');
        expect(mockdataAccessController.dataAction).toBeCalledWith(Const.INSERT_ITEMS, mockData);
    });

})