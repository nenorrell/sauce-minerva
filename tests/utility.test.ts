import {expect} from "chai";
import { camelize, objKeysToCamelCase } from "../src/utility";

describe("Utility methods", ()=>{
    describe("camelize()", ()=>{
        it("Should convert kebab case to camelCase", done =>{
            expect(camelize("test-kebab-case")).to.eq("testKebabCase");
            done();
        });

        it("Should convert snake_case to camelCase", done =>{
            expect(camelize("test_snake_case")).to.eq("testSnakeCase");
            done();
        });

        it("Should convert snake_case-kebab to camelCase", done =>{
            expect(camelize("snake_case-kebab")).to.eq("snakeCaseKebab");
            done();
        });

        it("Should not change camelCase", done =>{
            expect(camelize("testCamelCase")).to.eq("testCamelCase");
            done();
        });
    });

    describe("objKeysToCamelCase()", ()=>{
        it("Should convert object's snake_case keys to camelCase", async () =>{
            const testObj = {
                some_snake_case: "test value",
                some_other_snake_case: "another test value"
            };
            const expected = await objKeysToCamelCase(testObj);
            expect(expected).to.deep.equal({
                someSnakeCase: "test value",
                someOtherSnakeCase: "another test value"
            });
        });

        it("Should convert object's kebab keys to camelCase", async () =>{
            const testObj = {
                "some-kebab-case": "test value",
                "some-other-kebab-case": "another test value"
            };
            const expected = await objKeysToCamelCase(testObj);
            expect(expected).to.deep.equal({
                someKebabCase: "test value",
                someOtherKebabCase: "another test value"
            });
        });
    });
});
