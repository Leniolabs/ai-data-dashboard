import { IDashboard, IDataset } from "../types";
import { stringifyData } from "../utils/parseData";
import { getPrompt, queryCompletionsChat } from "./completions";
import { promptTemplate, promptGPT35TurboTemplate } from "./template";

export function generatePrompt(
  dataset: IDataset,
  userContext: string,
  sampleRows: number
) {
  return getPrompt(promptTemplate, [ // TODO: use promptGPT35TurboTemplate when user choose it
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
  apikey: string
): Promise<{ dashboard: IDashboard; response: string }> {
  const randomDatasetSample = [];

  for (let i = 0; i < sampleRows; i++) {
    const randomIndex = Math.round(Math.random() * dataset.length);
    randomDatasetSample.push(dataset[randomIndex]);
  }

  const response = await queryCompletionsChat(
    promptTemplate, // TODO: use promptGPT35TurboTemplate when user choose it
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
    { apikey }
  );

  return {
    response: response?.[0].reply || "",
    dashboard: JSON.parse(response?.[0].reply || "") as IDashboard,
  };
}
