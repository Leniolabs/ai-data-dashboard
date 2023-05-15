import { PromptModel, GPTModel } from "../types";
import { promptTemplate, promptGPT35TurboTemplate } from "../openai/template";
import { textDavinci003Completions } from "../models/textDavinci003";
import { gpt35TurboCompletions } from "../models/gpt35Turbo";

export const getModelOptions = () => ["text-davinci-003", "gpt-3.5-turbo"];

export const getPromptModel: PromptModel = {
  "text-davinci-003": promptTemplate,
  "gpt-3.5-turbo": promptGPT35TurboTemplate
};

export const getGPTModel: GPTModel = {
  "text-davinci-003": {
    queryCompletions: textDavinci003Completions
  },
  "gpt-3.5-turbo": {
    queryCompletions: gpt35TurboCompletions
  }
}