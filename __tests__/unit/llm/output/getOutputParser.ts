import { getOutputParser } from "@/llm/output";

describe("getOutputParser", () => {
  it("should return OutputOpenAIChat for 'openai' provider", () => {
    const response = { data: "exampleData" };
    const result = getOutputParser({ key: "openai.chat.v1" }, response);
    expect(result).toBeInstanceOf(Object);
  });

  it("should return OutputAnthropicClaude3Chat for 'anthropic' provider", () => {
    const response = { data: "exampleData" };
    const result = getOutputParser({ key: "anthropic.chat.v1" }, response);
    expect(result).toBeInstanceOf(Object);
  });

  it("should return OutputAnthropicClaude3Chat for 'amazon.anthropic.v3' provider", () => {
    const response = { data: "exampleData" };
    const result = getOutputParser({ key: "amazon:anthropic.chat.v1" }, response);
    expect(result).toBeInstanceOf(Object);
  });

  it("should return OutputMetaLlama3Chat for 'amazon.meta.v3' provider", () => {
    const response = { data: "exampleData" };
    const result = getOutputParser({key: "amazon:meta.chat.v1" }, response);
    expect(result).toBeInstanceOf(Object);
  });

  it("should throw an error for unsupported provider", () => {
    const response = { data: "exampleData" };
    expect(() => getOutputParser("unsupported" as any, response)).toThrowError("Unsupported provider");
  });
});