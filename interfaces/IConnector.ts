import { Pool } from "mysql";

export interface MinervaPool{
    connectionName :string
    pool :Pool
}