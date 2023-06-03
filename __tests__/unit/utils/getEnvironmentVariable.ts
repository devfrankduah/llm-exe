import { getEnvironmentVariable } from "@/utils";

describe("getEnvironmentVariable handles no environment variables", () => {
  test("getEnvironmentVariable on variable that does not exist", () => {
    expect(getEnvironmentVariable("DOES_NOT_EXIST")).toEqual(undefined);
  });
});

describe("getEnvironmentVariable in environment that does not have process", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    // @ts-ignore
    process.env = undefined;
  });
  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test("getEnvironmentVariable", () => {
    expect(getEnvironmentVariable("SOMETHING")).toEqual(undefined);
  });
});
