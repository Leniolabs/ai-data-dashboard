import { getGPTModel } from "../models";

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
  const queryCompletions = getGPTModel[options.model].queryCompletions;
  const completion = await queryCompletions(
    promptResult,
    options
  );
  const chat = [{
    reply: completion
  }];
  return chat;
};
