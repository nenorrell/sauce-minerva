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
    /** converts object keys to camelCase in results when true */
    camelizeKeys ?:boolean,
    disableLogs ?:boolean
    logger ?:{
        debug ?:Function
        info ?:Function
        warn ?:Function
        error ?:Function
    }
}
