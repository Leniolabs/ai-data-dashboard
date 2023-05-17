import { GPT_MODEL } from "../constants/models";
import { textDavinci003Completions, gpt35TurboCompletions } from "../models";

type ChatInteraction = {
  question?: string;
  reply?: string;
};

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
  let queryCompletions;
  switch (options.model) {
    case GPT_MODEL.GPT_35_TURBO:
      queryCompletions = gpt35TurboCompletions;
      break;
    default:
      queryCompletions = textDavinci003Completions;
  };
  const completion = await queryCompletions(
    promptResult,
    options
  );
  const chat = [{
    reply: completion
  }];
  return chat;
};
