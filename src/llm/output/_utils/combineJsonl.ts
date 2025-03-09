import { CombinedJsonLResult, OutputResultContent } from "@/interfaces";

export function combineJsonl<T extends Record<string, any> = any>(
  jsonl: string
): CombinedJsonLResult<T> {
  // Split lines and parse to objects
  const lines: T[] = jsonl
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (e) {
        throw new Error(`Invalid JSON: ${line}`);
      }
    });

  // Check if we have any lines at all
  if (lines.length === 0) {
    throw new Error("No JSON lines provided.");
  }

  // Sort lines ascending by created_at
  lines.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  // Combine the message content from all lines
  let combinedContent = lines
    .map((line) => line?.message?.content ?? "")
    .join("");

  // Decode certain escaped sequences like "\\u003c" and "\\u003e" to < and >
  combinedContent = combinedContent
    .replace(/\\u003c/g, "<")
    .replace(/\\u003e/g, ">");

  // Identify the final line (with done=true). We'll assume exactly one final line.
  const finalLine = lines.find((line) => line.done === true);
  if (!finalLine) {
    throw new Error("No line found where done = true.");
  }

  const result = {
    model: finalLine.model,
    created_at: finalLine.created_at,
    message: {
      role: finalLine?.message?.role || "assistant",
      content: combinedContent,
    },
    done_reason: finalLine.done_reason,
    done: finalLine.done,
    total_duration: finalLine.total_duration,
    load_duration: finalLine.load_duration,
    prompt_eval_count: finalLine.prompt_eval_count,
    prompt_eval_duration: finalLine.prompt_eval_duration,
    eval_count: finalLine.eval_count,
    eval_duration: finalLine.eval_duration,
  } as unknown as T;

  const content: OutputResultContent = {
    type: "text",
    text: combinedContent,
  };

  return {
    lines,
    result,
    content,
  };
}