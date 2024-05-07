import { describe, it, expect } from "vitest";
import { GithubApi } from "./github-api";

// Filename
describe("github-api", () => {
  // Function name
  describe("getRepository", () => {
    // Every 'it' is a Product Requirement
    it("should return repository information", async () => {
      const api = new GithubApi(undefined);
      const response = await api.getRepository("mhevery", "qwik");
      expect(response).toMatchSnapshot();
    });
    it.todo("should return timeout after x seconds with time out response");
  });
});
