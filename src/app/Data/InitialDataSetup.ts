import { SQLite } from "@nano-sql/adapter-sqlite";
import { InanoSQLInstance, nSQL } from "@nano-sql/core";
import { Const } from '../const';
import * as initialData from './initialItems.json';

/** Helper Class to setup intial data into the database 
 * It also creates the database and the table.
 */
export class InitialDataSetup {
    private defaultNSQL: InanoSQLInstance;
    private dbNSQL: InanoSQLInstance;
    private sqLite: SQLite;

    /* istanbul ignore next */
    constructor(defaultNSQL = nSQL(), dbNSQL = nSQL(Const.TABLE_NAME), sqLite = new SQLite()) {
        this.defaultNSQL = defaultNSQL;
        this.dbNSQL = dbNSQL;
        this.sqLite = sqLite;
    }

    /* istanbul ignore next */
    private async insert() {
        await this.dbNSQL.query("upsert", initialData.data).exec();
    }

    /* istanbul ignore next */
    private async select() {
        const data = await this.dbNSQL.query("select").exec();
        return data;
    }

    /* istanbul ignore next */
    private async listDbs() {
        const dataBases = this.defaultNSQL.listDatabases();
        return dataBases;
    }

    /* istanbul ignore next */
    private async createDB() {
        const params = {
            id: Const.DATABASE_ID,
            mode: this.sqLite,
            tables: [
                {
                    name: Const.TABLE_NAME,
                    model: { ...Const.TABLE_SCHEMA }
                }
            ]
        };
        await this.defaultNSQL.createDatabase(params);
    }

    /** Function exposed to create the data base 
     * It also sets up the sample data to start with.
     */
    public async createDatabase(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const dataBases = await this.listDbs();
                if (!dataBases || dataBases.length == 0) {
                    // Create the DB
                    await this.createDB();
                    // Insert the data into the database
                    await this.insert();
                    // Select the data from the database and resolve with the same.
                    const data = await this.select();
                    resolve(data);
                } else {
                    // Throw exception when DB already exists.
                    reject(new Error('Database already exists'));
                }
            } catch (e) {
                /* istanbul ignore next */
                reject(e);
            };
        });
    }
}