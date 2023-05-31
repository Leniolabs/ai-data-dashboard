import { ChatInteraction } from "../../types";

export async function queryTextDavinci003Completions(
  prompt: string,
  options: { apikey: string, model: string }
): Promise<ChatInteraction[]> {
  return fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${options.apikey}`,
    },
    method: "POST",
    body: JSON.stringify({
      max_tokens: 2000,
      model: "text-davinci-003",
      stop: ["Human:", "AI:"],
      temperature: 0.3,
      prompt
    }),
  })
    .then((response) => response.json())
    .then((resp) => {
      const chat = [{
        reply: resp.choices?.[0]?.text || ""
      }];
      return chat;
    });
};
