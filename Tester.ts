// import config from "../../../MinervaConfig";
// import { error } from "../logger";
// import { Minerva } from "./Minerva";
// import { QueryBuilder } from "./QueryBuilder";

// export const tester = async ()=>{
//     const minerva = new Minerva(config).createPools();
//     // minerva.connectPool(connector.pools.get("hermes"))
//     // .then((connection)=>{
//     //     console.log("Connected!")
//     // })
//     // .catch((err)=>{
//     //     error(err);
//     // })

//     await (new QueryBuilder(minerva, "hermes")
//     .select(["*"])
//     .from("users", "myUser")
//     .join({
//         table: "games",
//         column: "id",
//         foreignColumn: "user.id"
//     })
//     .where("id", "=", 1)
//     .andWhere("firstName", "=", "Nick")
//     .andWhere("lastName", "=", "Norrell"))
//     .executeQuery();
// }