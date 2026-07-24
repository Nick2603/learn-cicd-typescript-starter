import { getAPIKey } from "../api/auth.js";
import { describe, expect, test } from "vitest";

describe("getAPIKey", () => {
  test("returns null when authorization header is missing", () => {
    const headers = {};

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization scheme is incorrect", () => {
    const headers = {
      authorization: "Bearer my-api-key",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header is malformed", () => {
    const headers = {
      authorization: "ApiKey",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the API key when authorization header is valid", () => {
    const headers = {
      authorization: "ApiKey my-api-key",
    };

    expect(getAPIKey(headers)).toBe("my-api-key");
  });

  test("returns null when authorization header starts with whitespace", () => {
    const headers = {
      authorization: " ApiKey my-api-key",
    };

    expect(getAPIKey(headers)).toBeNull();
  });
});
