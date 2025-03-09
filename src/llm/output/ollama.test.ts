// import { OllamaResponse } from "@/interfaces";
import { OutputOllamaChat } from "@/llm/output/ollama";

/**
 * Tests the TextPrompt class
 */
describe("llm-exe:output/OutputOllamaChat", () => {
    const model = `deepseek-r1`;
    const created_at = "2025-03-08T16:58:04.349672Z"
  const mock = `
{"model":"${model}","created_at":"2025-03-08T16:58:03.782254Z","message":{"role":"assistant","content":"\\u003cthink\\u003e"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:03.821413Z","message":{"role":"assistant","content":"\\n\\n"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:03.861355Z","message":{"role":"assistant","content":"\\u003c/think\\u003e"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:03.900327Z","message":{"role":"assistant","content":"\\n\\n"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:03.93905Z","message":{"role":"assistant","content":"Hello"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:03.977765Z","message":{"role":"assistant","content":"!"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:04.0163Z","message":{"role":"assistant","content":" How"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:04.05436Z","message":{"role":"assistant","content":" can"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:04.094752Z","message":{"role":"assistant","content":" I"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:04.132316Z","message":{"role":"assistant","content":" assist"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:04.168753Z","message":{"role":"assistant","content":" you"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:04.204911Z","message":{"role":"assistant","content":" today"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:04.241527Z","message":{"role":"assistant","content":"?"},"done":false}
{"model":"${model}","created_at":"2025-03-08T16:58:04.313535Z","message":{"role":"assistant","content":" 😊"},"done":false}
{"model":"${model}","created_at":"${created_at}","message":{"role":"assistant","content":""},"done_reason":"stop","done":true,"total_duration":1014197584,"load_duration":25932875,"prompt_eval_count":5,"prompt_eval_duration":419000000,"eval_count":16,"eval_duration":568000000}`;
  
it("creates class with expected properties", () => {
    const output = OutputOllamaChat(mock).getResult();
    expect(output).toHaveProperty("id");
    expect(output).toHaveProperty("name");
    expect(output).toHaveProperty("created");
    expect(output).toHaveProperty("content");
    expect(output).toHaveProperty("usage");
  });
  it("creates class with expected properties", () => {
    const output = OutputOllamaChat(mock as any).getResult();
    expect((output as any).id).toEqual(`${model}.${created_at}`);
    expect((output as any).name).toEqual(model);
    expect((output as any).created).toEqual(new Date(created_at).getTime());
    expect((output as any).usage).toEqual({
      input_tokens: 0,
      output_tokens: 0,
      total_tokens: 0,
    });
  });
//   it("uses defaults if values are passed in", () => {
//     const output = OutputOllamaChat(mock as any, { model: "some-override"}).getResult();
//     expect((output as any).name).toEqual("some-override");
//   });
  it("creates class with expected methods", () => {
    const output = OutputOllamaChat(mock as any);
    expect(output).toHaveProperty("getResult");
    expect(typeof output.getResult).toEqual("function");
    expect(output).toHaveProperty("getResultText");
    expect(typeof output.getResultText).toEqual("function");
    expect(output).toHaveProperty("getResult");
    expect(typeof output.getResult).toEqual("function");
    expect(output).toHaveProperty("getResultContent");
    expect(typeof output.getResultContent).toEqual("function");
  });
//   it("getResults gets results", () => {
//     const output = OutputOllamaChat(mock as any);
//     expect(output.getResult()).toEqual({
//       content: [
//         { text: "This is the assistant message content.", type: "text" },
//       ],
//       created: 1685025755,
//       id: "chatcmpl-7KfsdfdsfZj1waHPfsdEZ",
//       name: "gpt-3.5-turbo-0301",
//       options: [],
//       stopReason: "stop",
//       usage: { input_tokens: 427, output_tokens: 1, total_tokens: 428 },
//     });
//   });
//   it("getResult gets result", () => {
//     const output = OutputOllamaChat(mock as any);
//     expect(output.getResult()).toEqual({
//       content: [
//         {
//           text: "This is the assistant message content.",
//           type: "text",
//         },
//       ],
//       created: mock.created,
//       id: mock.id,
//       name: "gpt-3.5-turbo-0301",
//       options: [],
//       stopReason: "stop",
//       usage: {
//         input_tokens: mock.usage.prompt_tokens,
//         output_tokens: mock.usage.completion_tokens,
//         total_tokens: mock.usage.total_tokens,
//       },
//     });
//   });
//   it("getResultContent gets result", () => {
//     const output = OutputOllamaChat(mock as any);
//     expect(output.getResultText()).toEqual(
//       "This is the assistant message content."
//     );
//   });

//   it("getResultContent gets [] if not exists", () => {
//     const output = OutputOllamaChat(mock as any);
//     expect(output.getResultContent(8)).toEqual([]);
//   });

//   it("getResultContent gets tool_calls if content is null", () => {
//     const output = OutputOllamaChat({
//       id: "chatcmpl-7KfsdfdsfZj1waHPfsdEZ",
//       object: "chat.completion",
//       created: 1685025755,
//       model: "gpt-3.5-turbo-0301",
//       usage: {
//         prompt_tokens: 427,
//         completion_tokens: 1,
//         total_tokens: 428,
//       },
//       choices: [
//         {
//           message: {
//             role: "assistant",
//             content: null,
//             tool_calls: [
//               {
//                 type: "function",
//                 function: {
//                   name: "test_fn",
//                   arguments: "{}",
//                 },
//               },
//             ],
//           },
//           finish_reason: "stop",
//           index: 0,
//         },
//       ],
//     } as unknown as XAiResponse);
//     expect(output.getResultContent()).toEqual(
//       [{"input": {}, "name": "test_fn", "type": "function_use"}]
//     );
//   });
});
