import { pageCount } from "./pageCount";

describe("Page count function test", () => {
    test("Page count with limit", () => {
        expect(pageCount(100, 10)).toBe(10);
    });
    test("Page count without limit", () => {
        expect(pageCount(150)).toBe(10);
    });
});
