import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing the form submition functionality", () => {
  test("function defined", () => {
    expect(handleSubmit).toBeDefined();
  });
});
