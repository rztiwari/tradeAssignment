import { SQLite } from "@nano-sql/adapter-sqlite";
import { InanoSQLInstance, nSQL } from "@nano-sql/core";
import { Const } from '../const';
import * as initialData from './initialItems.json';

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

    public async createDatabase(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const dataBases = await this.listDbs();
                if (!dataBases || dataBases.length == 0) {
                    await this.createDB();
                    await this.insert();
                    const data = await this.select();
                    resolve(data);
                } else {
                    reject(new Error('Database already exists'));
                }
            } catch (e) {
                /* istanbul ignore next */
                reject(e);
            };
        });
    }
}