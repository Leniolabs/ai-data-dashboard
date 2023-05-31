import { GPT_MODEL } from "./constants";
import { ChatInteraction } from "../types";
import { queryTextDavinci003Completions, queryGpt35TurboCompletions } from "./models";

export function getPrompt(context: string, interactions: ChatInteraction[]) {
  return `${context}
    
${interactions
  .map(
    (i) => `Human: ${i.question}
AI: ${i.reply || ""}`
  )
  .join("\n")}`;
}

export async function queryCompletionsChat(
  context: string,
  interactions: ChatInteraction[],
  options: { apikey: string, model: string }
): Promise<ChatInteraction[]> {
  const promptResult = getPrompt(context, interactions);
  switch (options.model) {
    case GPT_MODEL.GPT_35_TURBO:
      return queryGpt35TurboCompletions(promptResult, options);
    default:
      return queryTextDavinci003Completions(promptResult, options);
  };
};
