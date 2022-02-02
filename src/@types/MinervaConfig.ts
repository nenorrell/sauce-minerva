import { Knex } from "knex";

export interface ConnectionConfig<ConnectionNames>{
    /**
     * Nickname for connection that you can reference throughout code.
     * Useful for obfuscating db name or shortening long names.
    */
    name :ConnectionNames
    client :Knex.Config["client"]
    host :string
    database :string
    user :string
    password :string
    port :number
    pool ?:{
        min :number
        max :number
    },
    connectionOptions ?:Knex.StaticConnectionConfig
}

export interface MinervaConfig<ConnectionNames=string>{
    connections: ConnectionConfig<ConnectionNames>[]
    /** Camelizes column names from snake_case going in and out of the DB */
    camelizeKeys ?:boolean,
    disableLogs ?:boolean
    logger ?:{
        debug ?:Function
        info ?:Function
        warn ?:Function
        error ?:Function
    }
    /** Pass any knex config items to the knex object.
     * Will override Minerva defaults if there's a collision
    */
    knexConfig ?:Omit<Knex.Config, "connection">
}
