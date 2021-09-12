import { Const } from "../../app/const";
import { DataAccess } from "../../app/Data/DataAccess";

describe('test the DataAccess class', () => {
    let dataAcces: DataAccess;

    const mockDBNSQL = {
        query: jest.fn()
    };

    mockDBNSQL.query
        .mockReturnValueOnce({
            exec: jest.fn().mockReturnValueOnce({ test: 'testing' }),
            where: jest.fn().mockReturnValueOnce({
                exec: jest.fn()
            })
        });

    const mockData = { field1: 'field1', field2: 'field2', field3: 'field3' }

    beforeEach(() => {
        jest.spyOn(DataAccess.prototype as any, 'insert');
        jest.spyOn(DataAccess.prototype as any, 'selectAll').mockImplementation(() => {
            return [mockData]
        });
        jest.spyOn(DataAccess.prototype as any, 'selectItemByTradeId').mockImplementation(() => {
            return mockData
        });
        dataAcces = new DataAccess(mockDBNSQL as any);
    });

    afterEach(() => {
        jest.clearAllMocks()
    });

    test('it is able to load all items', async () => {
        const data = await dataAcces.dbActions(Const.GET_ALL_ITEMS, null);
        expect(data).toEqual([mockData]);
    });

    test('it is able to get Item by trade_id', async () => {
        const data = await dataAcces.dbActions(Const.GET_ITEM_BY_TRADE_ID, { trade_id: 'T1' });
        expect(data).toEqual(mockData);
    });

    test('it is able to insert an Item', async () => {
        const data = await dataAcces.dbActions(Const.INSERT_ITEM, { trade_id: 'T1' });
        expect(data).toEqual('Data inserted');
    });

    test('it should throw an exception when the trade_id is not provided while searching', async () => {
        await expect(dataAcces.dbActions(Const.GET_ITEM_BY_TRADE_ID, { test: 'T1' })).rejects.toThrow('Missing paramerter: trade_id');
    });

    test('it should throw an exception when the trade_id is not provided while searching', async () => {
        await expect(dataAcces.dbActions(Const.INSERT_ITEM, { test: 'T1' })).rejects.toThrow(`Data can't be inserted`);
    });

    test('it should throw an exception when incorrect action provided', async () => {
        await expect(dataAcces.dbActions('RANDOM_ACTION', { test: 'T1' })).rejects.toThrow(`No or incorrect action provided`);
    });

    test('it should throw an exception when no action provided', async () => {
        await expect(dataAcces.dbActions('', { test: 'T1' })).rejects.toThrow(`No or incorrect action provided`);
    });
});