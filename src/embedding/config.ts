import { Config, EmbeddingProviderKey } from "@/types";
import { getEnvironmentVariable } from "@/utils";

export const embeddingConfigs: {
  [key in EmbeddingProviderKey]: Config<EmbeddingProviderKey>;
} = {
  "openai.embedding.v1": {
    key: "openai.embedding.v1",
    provider: "openai.embedding",
    endpoint: `https://api.openai.com/v1/embeddings`,
    method: "POST",
    headers: `{"Authorization":"Bearer {{openAiApiKey}}", "Content-Type": "application/json" }`,
    options: {
      input: {},
      dimensions: {},
      encodingFormat: {},
      openAiApiKey: {},
    },
    mapBody: {
      input: {
        key: "input",
      },
      model: {
        key: "model",
      },
      dimensions: {
        key: "dimensions",
      },
      encodingFormat: {
        key: "encoding_format",
      },
    },
  },

  "amazon.embedding.v1": {
    key: "amazon.embedding.v1",
    provider: "amazon.embedding",
    endpoint: `https://bedrock-runtime.{{awsRegion}}.amazonaws.com/model/{{model}}/invoke`,
    method: "POST",
    headers: `{"Content-Type": "application/json" }`,
    options: {
      input: {},
      dimensions: {},
      awsRegion: {
        default: getEnvironmentVariable("AWS_REGION"),
        required: [true, "aws region is required"],
      },
      awsSecretKey: {},
      awsAccessKey: {},
    },
    mapBody: {
      input: {
        key: "inputText",
      },
      dimensions: {
        key: "dimensions",
      },
    },
  },
};

export function getEmbeddingConfig(provider: EmbeddingProviderKey) {
  const pick = embeddingConfigs[provider];
  if (pick) {
    return pick;
  }
  throw new Error("Invalid provider");
}
