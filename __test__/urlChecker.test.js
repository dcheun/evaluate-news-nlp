import { checkForURL } from "../src/client/js/urlChecker";

describe("Testing URL input checker functionality", () => {
  test("Testing well formed URL", () => {
    expect(checkForURL("http://google.com")).toBeTruthy();
  });
  test("Testing bad URL", () => {
    expect(checkForURL("http://goo")).toBeFalsy();
  });
  test("Testing empty URL", () => {
    expect(checkForURL("")).toBeFalsy();
  });
});
