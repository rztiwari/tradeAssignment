import { InitialDataSetup } from "../../app/Data/InitialDataSetup";
import { SQLite } from "@nano-sql/adapter-sqlite";
jest.mock('@nano-sql/core');
jest.mock('@nano-sql/adapter-sqlite');


describe('Initial data setup test suite', () => {

    let initialDataSetup: InitialDataSetup;

    const mockSQLite = <jest.Mock<SQLite>>SQLite;
    const mockDefaultNSQL = {
        createDatabase: jest.fn(),
        listDatabases: jest.fn()
    };
    const mockDBNSQL = {
        query: jest.fn()
    };

    mockDBNSQL.query
        .mockReturnValueOnce({ exec: jest.fn() })
        .mockReturnValueOnce({ exec: jest.fn().mockReturnValueOnce({ test: 'testing' }) })

    beforeEach(() => {
        jest.spyOn(InitialDataSetup.prototype as any, 'createDB');
        jest.spyOn(InitialDataSetup.prototype as any, 'insert');
        jest.spyOn(InitialDataSetup.prototype as any, 'select').mockImplementation(() => {
            return { test: 'testing' }
        });
    });

    afterEach(() => {
        jest.clearAllMocks()
    });

    test('load initial data successfully', async () => {
        jest.spyOn(InitialDataSetup.prototype as any, 'listDbs').mockImplementation(() => []);
        initialDataSetup = new InitialDataSetup(
            mockDefaultNSQL as any,
            mockDBNSQL as any,
            new mockSQLite()
        );
        const data = await initialDataSetup.createDatabase();
        expect(data).toEqual({ test: 'testing' });
    });

    test('donot load data if database exists', async () => {
        jest.spyOn(InitialDataSetup.prototype as any, 'listDbs').mockImplementation(() => ['sample']);
        initialDataSetup = new InitialDataSetup(
            mockDefaultNSQL as any,
            mockDBNSQL as any,
            new mockSQLite()
        );
        await expect(initialDataSetup.createDatabase()).rejects.toThrow('Database already exists');
    });
});