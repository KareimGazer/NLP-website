import { checkForURL } from "../src/client/js/urlChecker";

describe("Testing the url checking functionality", () => {
  test("function defined", () => {
    expect(checkForURL).toBeDefined();
  });
  test("testing full url", () => {
    const url = "https://udacity.com";
    const output = true;
    expect(checkForURL(url)).toEqual(output);
  });
  test("testing shortend url", () => {
    const url = "udacity.com";
    const output = true;
    expect(checkForURL(url)).toEqual(output);
  });
  test("testing blog url", () => {
    const url =
      "https://blog.waymo.com/2021/08/addressing-transit-mobility-gaps-what.html";
    const output = true;
    expect(checkForURL(url)).toEqual(output);
  });
  /* false test cases were commented becuase they generate 
  the use of alret which are undefined outside the browser */

  // test("testing fake url", () => {
  //   const url = "udacity/learn";
  //   const output = false;
  //   expect(checkForURL(url)).toEqual(output);
  // });

  // test("testing not url at all", () => {
  //   const url = "gndfgndfgnfg";
  //   const output = false;
  //   expect(checkForURL(url)).toEqual(output);
  // });
});
