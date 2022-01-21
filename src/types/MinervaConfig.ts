export interface ConnectionConfig<ConnectionNames>{
    /**
     * Nickname for connection that you can reference throughout code.
     * Useful for obfuscating db name or shortening long names.
    */
    name :ConnectionNames
    host :string
    database :string
    user :string
    password :string
    port :number
    pool ?:{
        min :number
        max :number
    }
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
}
