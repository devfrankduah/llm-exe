import { createLlmExecutor } from "@/executor";
import { BaseLlm } from "@/types";
import { createParser } from "@/parser";
import { createPrompt } from "@/prompt";
import { IChatMessages } from "@/types";
import { JSONSchema } from "json-schema-to-ts";

interface ExtractInformationInput {
  chatHistory: IChatMessages;
  mostRecentMessage: string;
}

export const PROMPT = `# Instructions: I need you to identify and extract the following information from the context and conversation. Reply with only this information, formatted as valid JSON. Do not carry on a conversation. Make sure you read through the context and work step-by-step to make sure you identify accurate information. If you do not know the value, use the default value.

Your response must EXACTLY follow the JSON Schema specified below:

{{>JsonSchema key='schema'}}

# Context
Today is {{context_formatCurrentDate}}`;

export const INSTRUCT = `Respond with:
{{>JsonSchemaExampleJson key='schema'}}`;

export async function extractInformation<
  S extends JSONSchema,
  I extends ExtractInformationInput
>(llm: BaseLlm, input: I, schema: S) {
  const prompt = createPrompt<I>("chat", PROMPT)
    .addChatHistoryPlaceholder("chatHistory")
    .addMessagePlaceholder(`{{mostRecentMessage}}`)
    .addSystemMessage(INSTRUCT);

  const parser = createParser("json", { schema });

  return createLlmExecutor({
    name: "extract",
    llm,
    prompt,
    parser,
  }).execute(Object.assign(input, { schema }));
}
