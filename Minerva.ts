import {ConnectionConfig, MinervaConfig} from "./interfaces/IMinervaConfig";
import { Knex, knex } from 'knex';
import { objKeysToCamelCase } from "./utility";

export class Minerva<ConnectionNames=any>{
    /**
     * Connections are stored by either the nickname you give them
     * or the DB name itself from the Minerva config
     */
    public connections :Map<ConnectionNames, Knex> = new Map();

    constructor(private config :MinervaConfig<ConnectionNames>){
        this.connect();
    }

    private connect() :this{
        this.log("info", "Setting up connection pools");
        this.config.connections.forEach(this.createConnection.bind(this));
        return this;
    }
    
    /** Setup the DB connection pool. Wraps the mysql createPool method.
     * @see https://www.npmjs.com/package/mysql#pooling-connections 
    */
    private createConnection(connectionConfig :ConnectionConfig<ConnectionNames>) :this{
        this.log("info", `Setting up pool for ${connectionConfig.host}:${connectionConfig.port || 3306}...`);
        const connection = knex({
            client: "mysql",
            postProcessResponse: (result) => {
                if(this.config.enableCamelCase){
                    if (Array.isArray(result)) {
                        return result.map(row => objKeysToCamelCase(row));
                      }
                    return objKeysToCamelCase(result);
                }
            },
            connection:{
                host: connectionConfig.host,
                port: connectionConfig.port || 3306,
                user: connectionConfig.user,
                password: connectionConfig.password,
                database: connectionConfig.database
            },
            pool: connectionConfig.pool || {
                min: 0,
                max: 15
            },
            log: {
                ...this.config.logger as any,
                warn: ()=>{}
            }
        });
        
        this.connections.set(connectionConfig.name as any, connection);
        return this;
    }

    private log(logger : "debug" | "info" | "warn" | "error", msg :any){
        if(!this.config.disableLogs){
            if(this.config.logger[logger]){
                this.config.logger[logger](msg);
            }
            else{
                console.log(msg);
            }
        }
    }
}