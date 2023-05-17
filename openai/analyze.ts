import { IDashboard, IDataset } from "../types";
import { stringifyData } from "../utils/parseData";
import { getPrompt, queryCompletionsChat } from "./completions";
import { getPromptModel } from "../utils/models";

export function generatePrompt(
  dataset: IDataset,
  userContext: string,
  sampleRows: number,
  model: string
) {
  return getPrompt(getPromptModel(model), [
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

export async function generateDashboard(
  dataset: IDataset,
  userContext: string,
  sampleRows: number,
  apikey: string,
  model: string
): Promise<{ dashboard: IDashboard }> {
  const randomDatasetSample = [];

  for (let i = 0; i < sampleRows; i++) {
    const randomIndex = Math.round(Math.random() * dataset.length);
    randomDatasetSample.push(dataset[randomIndex]);
  }
  const response = await queryCompletionsChat(
    getPromptModel(model),
    [
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
    ],
    { apikey, model }
  );

  return {
    dashboard: JSON.parse(response?.[0].reply || "") as IDashboard,
  };
}
