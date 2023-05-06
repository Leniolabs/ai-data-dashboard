type ChatInteraction = {
  question: string;
  reply?: string;
};

export async function queryCompletions(
  prompt: string,
  options: { apikey: string },
  isGpt35Turbo: boolean
): Promise<string> {
  return fetch(isGpt35Turbo ? "https://api.openai.com/v1/chat/completions" : "https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${options.apikey}`,
    },
    method: "POST",
    body: JSON.stringify({
      ...(!isGpt35Turbo && {
        echo: true,
      }),
      max_tokens: 2000,
      model: isGpt35Turbo ? "gpt-3.5-turbo" : "text-davinci-003",
      ...(isGpt35Turbo ? {
        messages: [
          { role: "system", content: prompt.split("Human:")[0] },
          { role: "user", content: prompt.split("Human:")[1] }
        ]
      } : {
        prompt
      }),
      stop: ["Human:", "AI:"],
      temperature: 0.3,
    }),
  })
    .then((response) => response.json())
    .then((resp) => {
      return isGpt35Turbo
        ? (resp.choices?.[0]?.message?.content || "").replace("\n", "").trim()
        : (resp.choices?.[0]?.text || "").replace("\n", "").trim();
    });
}

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
  options: { apikey: string },
  isGpt35Turbo = false
): Promise<ChatInteraction[]> {
  const completion = await queryCompletions(
    getPrompt(context, interactions),
    options,
    isGpt35Turbo
  );
  let chat;
  if (isGpt35Turbo) {
    chat = [{
      question: "",
      reply: completion
    }]
  } else {
    chat = completion
      .split("Human:")
      .map((interaction) => {
        const [question, reply] = interaction.split("AI:");
  
        return {
          question: question.trim(),
          reply: (reply || "").trim(),
        };
      })
      .filter((row) => row.question && row.reply);
  }
  return chat;
};
