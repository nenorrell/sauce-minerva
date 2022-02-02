import { Knex } from "knex";

interface LookupArgs<T>{
    db :Knex
    table :string
    id :number
    fields ?:Array<keyof T>
}

export const getModifiedRecord = async <T=any>(db :Knex, table :string, fields ?:Array<keyof T>) :Promise<T>=>{
    try{
        const [response] = await db.raw("SELECT LAST_INSERT_ID()");
        const id = response[0]["lASTINSERTID()"];
        return <any>await db(table)
            .where("id", id)
            .first(...fields || "*");
    }
    catch(err) {
        throw err;
    }
};

export const getRecordById = async <T=any>({db, table, id, fields}:LookupArgs<T>) :Promise<T>=>{
    try{
        return <any>await db(table)
            .where("id", id)
            .first(...fields || "*");
    }
    catch(err) {
        throw err;
    }
};
