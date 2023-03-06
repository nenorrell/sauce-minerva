# Minerva
Minerva is a DB connection management layer built on top of Knex.js

## Usage 
```javascript 
import { Minerva } from '@sauce-api/minerva';
import { minervaConfig, ConnectionNames } from './MinervaConfig';

const dbs :Minerva<ConnectionNames> = new Minerva(minervaConfig);
const firstDB = dbs.connections.get("first-db"); // Returns a Knex.js connection. Anything you can do with a knex.js connection you can do here.
const anotherDB = dbs.connections.get("another-db"); // Returns a Knex.js connection. Anything you can do with a knex.js connection you can do here.
```



## Config options

| header | header |
| ------ | ------ |
| camelizeKeys | Translate snake case column names to camelCase |
| disableLogs | Disable any Minerva logs (does not disable logs from Knex.js) |
| logger | Maps to the Knex.js logger arguments. `info`, `debug`, `warn`, and `error` methods are supported |

## Example Minerva Config

``` javascript
import { MinervaConfig } from "@sauce-api/minerva";
import logger from "./logger";

export type ConnectionNames = "first-db" | "another-db";

export const minervaConfig :MinervaConfig<ConnectionNames> = {
    connections: [
        {
            name: "first-db",
            host: process.env.FIRST_DB_HOST,
            port: parseInt(process.env.FIRST_DB_PORT) || 3306,
            user: process.env.FIRST_DB_USER,
            password: process.env.FIRST_DB_PASS,
            database: process.env.FIRST_DB,
            pool: {
                min: 0,
                max: 15
            }
        },
        {
            name: "another-db",
            host: process.env.ANOTHER_DB_HOST,
            port: parseInt(process.env.ANOTHER_DB_PORT) || 3306,
            user: process.env.ANOTHER_DB_USER,
            password: process.env.ANOTHER_DB_PASS,
            database: process.env.ANOTHER_DB_STORE,
            pool: {
                min: 0,
                max: 15
            }
        }
    ],
    camelizeKeys: true,
    disableLogs: true,
    logger: {
        ...logger,
        warn: ()=>{}
    }
} 
```
