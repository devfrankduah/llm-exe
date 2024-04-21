import { asyncCallWithTimeout, chunkArray } from "@/utils";
import { BaseEmbedding } from "./base";
import { backOff } from "exponential-backoff";
import { EmbedOpenAIOptions } from "@/types";
import OpenAI from "openai";

export class EmbeddingOpenAI extends BaseEmbedding {
  private model: string;

  public batchSize: number;
  public stripNewLines: boolean;
  constructor(client: OpenAI, options: EmbedOpenAIOptions) {
    super(client, options);

    this.model = options.modelName || "text-embedding-ada-002";
    this.batchSize = options.temperature || 0;
    this.stripNewLines = !!options.stripNewLines;
    this.client = client;
  }

  async embedDocuments(texts: string[]) {
    const subPrompts = chunkArray(
      this.stripNewLines ? texts.map((t) => t.replace(/\n/g, " ")) : texts,
      this.batchSize
    );
    const embeddings = [];
    for (let i = 0; i < subPrompts.length; i += 1) {
      const input = subPrompts[i];
      const { data } = await this.embeddingWithRetry(input);
      for (let j = 0; j < input.length; j += 1) {
        embeddings.push(data[j].embedding);
      }
    }
    return embeddings;
  }
  async embedQuery(text: string) {
    const data = await this.embeddingWithRetry(
      this.stripNewLines ? text.replace(/\n/g, " ") : text
    );
    return data[0].embedding;
  }
  async embeddingWithRetry(input: string) {
    const response = await backOff<any>(
      () =>
        asyncCallWithTimeout(
          (this.client as OpenAI).embeddings.create({
            model: this.model,
            input: input,
            user: "",
          }),
          this.timeout
        ),
      {
        startingDelay: 0,
        maxDelay: this.maxDelay,
        numOfAttempts: this.numOfAttempts,
        jitter: this.jitter,
        retry: () => {
          console.log(`LlmOpenAI timeout after ${this.timeout}. Retrying...`);
          return true;
        },
      }
    );

    const { data } = response;
    return data;
  }
}
