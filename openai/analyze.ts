import { IDashboard, IDataset } from "../types";
import { stringifyData } from "../utils/parseData";
import {
  ChatInteraction,
  getPrompt,
  queryCompletionsChat,
} from "./completions";
import { promptTemplate } from "./template";

export function generatePrompt(
  dataset: IDataset,
  userContext: string,
  sampleRows: number
) {
  return getPrompt(promptTemplate, [
    {
      question: `
This is the dataset:

${stringifyData(dataset.slice(0, sampleRows), ",")}${
        userContext
          ? `


More information about the dataset: 

          ${userContext}`
          : ""
      }
        `,
    },
  ]);
}

export function getInitialQuestion(
  dataset: IDataset,
  userContext: string,
  sampleRows: number
) {
  const randomDatasetSample = [];

  for (let i = 0; i < sampleRows; i++) {
    const randomIndex = Math.round(Math.random() * dataset.length);
    randomDatasetSample.push(dataset[randomIndex]);
  }

  return `This is the dataset:

${stringifyData(randomDatasetSample.slice(0, sampleRows), ",")}
${
  userContext
    ? `More information about the dataset: 
${userContext}
`
    : ""
}`;
}

export async function generateDashboard(
  dataset: IDataset,
  userContext: string,
  sampleRows: number,
  apikey: string
): Promise<{
  dashboard: IDashboard;
  chat: ChatInteraction[];
}> {
  const initialQuestion = getInitialQuestion(dataset, userContext, sampleRows);

  const response = await queryCompletionsChat(
    promptTemplate,
    [
      {
        question: initialQuestion,
      },
    ],
    { apikey }
  );

  // console.log("analyze", response?.[0].reply || "");
  // console.log("analyze", JSON.parse(response?.[0].reply || ""));

  return {
    dashboard: JSON.parse(response?.[0].reply || "") as IDashboard,
    chat: response,
  };
}

export async function queryDashboard(
  question: string,
  chat: ChatInteraction[],
  apikey: string
): Promise<{
  dashboard: IDashboard;
  chat: ChatInteraction[];
}> {
  const response = await queryCompletionsChat(
    promptTemplate,
    [...chat, { question }],
    { apikey }
  );

  // console.log("analyze", response?.[0].reply || "");
  // console.log("analyze", JSON.parse(response?.[0].reply || ""));

  console.log(response);

  const dashboard = response.reduce((r: IDashboard | null, interaction) => {
    if (!r) return JSON.parse(interaction.reply || "{}") as IDashboard;
    const parsedReply = JSON.parse(
      interaction.reply || "{}"
    ) as Partial<IDashboard>;

    r.filters.push(...(parsedReply?.["filters"] || []));
    r.kpis.push(...(parsedReply?.["kpis"] || []));
    r.charts.push(...(parsedReply?.["charts"] || []));

    return r;
  }, null);

  return {
    dashboard: dashboard as unknown as IDashboard,
    chat: response,
  };
}
