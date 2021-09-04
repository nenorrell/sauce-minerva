// import { BaseModel } from "./Model";

// export interface Entity{
//     id ?:number;
//     readonly table :string;
// }

// export interface ForeignColumn<>{
//     propertyKey :string;
//     column :string;
//     fkEntity :BaseModel["model"];
//     fkTable :string;
//     fkColumn :string;
//     fkAttributes :string[];
// }

// export interface FallbackColumn{
//     column :string;
//     foreignPropertyKey :string
// }

// export function Column() :Function{
//     return function (target:BaseModel, propertyKey: string, descriptor: PropertyDescriptor) {        
//         if(!target["columns"]){
//             target["columns"] = [];
//         }
//         target["columns"].push(propertyKey);
//     };
// }

// export function BooleanColumn<T>() :Function{
//     return function (target:BaseModel, propertyKey: string, descriptor: PropertyDescriptor) {
//         Column()(target, propertyKey, descriptor);
//         if(!target["booleanColumns"]){
//             target["booleanColumns"] = [];
//         }
//         target["booleanColumns"].push(propertyKey);
//     };
// }

// export function PrimaryColumn() :Function{
//     return function (target:BaseModel, propertyKey: string, descriptor: PropertyDescriptor) {        
//         Column()(target, propertyKey, descriptor);
//         target["primaryColumn"] = propertyKey;
//     };
// }

// export function FKColumn<T>(column :string, fkEntity :T, foriegnKey :string) :Function{
//     return function (target:BaseModel, propertyKey: string, descriptor: PropertyDescriptor) {
//         if(!target["fkColumns"]){
//             console.log("THIS IS A NEW MODEL");
//             target["fkColumns"] = [];
//         }
//         if(!target["subModels"]){
//             target["subModels"] = [];
//         }

//         const entity = new (fkEntity as any)()
//         target[propertyKey] = entity;

//         target["subModels"].push({
//             propertyKey,
//             model: entity
//         })
//         const foreignModel :BaseModel["model"] = target[propertyKey] as BaseModel["model"];
        
//         const subColumns :string[]= [];
//         if(entity["fkColumns"]){
//             entity["fkColumns"].forEach(fk => {
//                 subColumns.push(fk.column);
//             });
//         }

//         target["fkColumns"].push({
//             column,
//             propertyKey,
//             fkEntity: entity as any,
//             fkTable: foreignModel.table,
//             fkColumn: foriegnKey,
//             fkAttributes: [...foreignModel["columns"], ...subColumns]
//         });
//     };
// }