import { sanitizeJSON, validateCategory, validateQuestion, validateSlug, } from "./validators";
import { describe, expect, it } from "@jest/globals";
describe("validators", () => {
    describe("sanitizeJSON", () => {
        it("returns the input given completely sanitized by xss", () => {
            const data = {
                yes: "gamer",
                ohno: "<script>sigmaklat()</script>",
                bom: ["boklat", "sigma"],
                number: 1,
            };
            const result = sanitizeJSON(data);
            console.log(result);
            expect(result).toStrictEqual({
                yes: "gamer",
                ohno: "&lt;script&gt;sigmaklat()&lt;/script&gt;",
                bom: ["boklat", "sigma"],
                number: 1,
            });
        });
    });
    describe("validateSlug", () => {
        it("returns success if the input is a valid slug", () => {
            const slug = "aaa";
            const result = validateSlug(slug);
            console.log(result);
            expect(result.success).toBe(true);
            expect(result.data).toBe("aaa");
        });
        it("returns unsuccessful if the input is not a valid slug", () => {
            const slug = "";
            const result = validateSlug(slug);
            expect(result.success).toBe(false);
        });
    });
    describe("validateCategory", () => {
        it("returns success if the input is a valid category", () => {
            const category = {
                title: "aaa",
            };
            const result = validateCategory(category);
            expect(result.success).toBe(true);
            expect(result.data?.title).toBe("aaa");
        });
        it("returns unsuccessful if the input is not a valid category", () => {
            const category = {
                title: "",
            };
            const result = validateCategory(category);
            expect(result.success).toBe(false);
        });
    });
    describe("validateQuestion", () => {
        it("returns success if the input is a valid question", () => {
            const question = {
                question: "aaa",
                categoryId: 1,
                correctAnswer: 1,
                answers: ["aaa", "bbb", "ccc", "ddd"],
            };
            const result = validateQuestion(question);
            expect(result.success).toBe(true);
            expect(result.data?.question).toBe("aaa");
        });
        it("returns unsuccessful if the input is not a valid question", () => {
            const question = {
                title: "",
            };
            const result = validateQuestion(question);
            expect(result.success).toBe(false);
        });
    });
});
