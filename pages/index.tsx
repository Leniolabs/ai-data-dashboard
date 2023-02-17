import Head from "next/head";
import React from "react";
import {
  Button,
  ButtonsRow,
  Container,
  Icon,
  Panel,
  PanelContent,
  PanelHeader,
  TextAreaInput,
  WelcomeHeader,
  SettingsModal,
  Dashboard,
  ButtonIcon,
  CodeHighlighter,
  TextInput,
  ButtonLink,
  UploadDatasetButton,
  ViewSelect,
  EmptyMessage,
  DataLoadedMessage,
  MissingApiKeyMessage,
} from "../components";
import { HireUs } from "../components/layout/HireUs";
import { Loader } from "../components/layout/Loader";
import { QuestionModal } from "../components/layout/QuestionModal";
import { Table } from "../components/layout/Table";
import {
  ChatInteraction,
  generateDashboard,
  getInitialQuestion,
  getPrompt,
  queryDashboard,
} from "../openai";
import { getRandomDataset } from "../openai/sample";
import { promptTemplate } from "../openai/template";
import { IDashboard, IDataset, ISettings } from "../types";
import { parseData } from "../utils/parseData";

export default function Home() {
  const [view, setView] = React.useState("dashboard");

  const [settings, setSettings] = React.useState<ISettings>({
    apikey: "",
    sampleRows: 10,
  });
  const [loading, setLoading] = React.useState(false);

  const [userContext, setUserContext] = React.useState<string>("");
  const [chat, setChat] = React.useState<ChatInteraction[]>([]);
  const [data, setData] = React.useState<IDataset>();

  const [currentSampleIndex, setCurrentSampleIndex] = React.useState(-1);
  const [dashboard, setDashboard] = React.useState<IDashboard | null>();
  const [showSettings, setShowSettings] = React.useState(false);
  const [showQuestion, setShowQuestion] = React.useState(false);

  const handleRandomDataset = React.useCallback(() => {
    const { data, dashboard, context, index } =
      getRandomDataset(currentSampleIndex);
    setData(parseData(data));
    setDashboard(dashboard);
    setUserContext(context);
    setCurrentSampleIndex(index);
    setChat([
      {
        question: getInitialQuestion(
          parseData(data),
          context,
          settings.sampleRows
        ),
        reply: JSON.stringify(dashboard, undefined, 1),
      },
    ]);
  }, [currentSampleIndex]);

  React.useEffect(() => {
    const config = localStorage.getItem("analyzer-settings");
    if (config) {
      setSettings(JSON.parse(config) as ISettings);
    }

    handleRandomDataset();
  }, []);

  const handleAnalyze = React.useCallback(() => {
    if (!settings.apikey) {
      setShowSettings(true);
    } else if (data) {
      setLoading(true);
      generateDashboard(data, userContext, settings.sampleRows, settings.apikey)
        .then((response) => {
          setChat(response.chat);
          setDashboard(response.dashboard);
          setLoading(false);
        })
        .catch((err) => {
          setDashboard(null);
          setLoading(false);
        });
    }
  }, [data, userContext, settings]);

  const handleDashboardUpdate = React.useCallback(
    (question: string) => {
      handleCloseQuestion();
      if (settings.apikey && chat) {
        setLoading(true);
        queryDashboard(question, chat, settings.apikey)
          .then((response) => {
            setChat(response.chat);
            setDashboard(response.dashboard);
            setLoading(false);
          })
          .catch((err) => {
            setDashboard(null);
            setLoading(false);
          });
      }
    },
    [settings, chat]
  );

  // console.log(dashboard, stringifyData(data || []));

  const handleClear = React.useCallback(() => {
    setData(undefined);
    setDashboard(null);
    setUserContext("");
  }, []);

  const handleSettingsChange = React.useCallback((settings: ISettings) => {
    localStorage.setItem("analyzer-settings", JSON.stringify(settings));
    setSettings(settings);
    setShowSettings(false);
  }, []);

  const handleShowQuestion = React.useCallback(() => {
    setShowQuestion(true);
  }, []);

  const handleCloseQuestion = React.useCallback(() => {
    setShowQuestion(false);
  }, []);

  const handleShowSettings = React.useCallback(() => {
    setShowSettings(true);
  }, []);

  const handleCloseSettings = React.useCallback(() => {
    setShowSettings(false);
  }, []);

  const handleDatasetChange = React.useCallback((dataset: string) => {
    setData(parseData(dataset));
    setDashboard(null);
  }, []);

  const handleClick = React.useCallback(() => {
    setUserContext(" ");
  }, []);

  const handleClearContext = React.useCallback(() => {
    setUserContext("");
  }, []);

  return (
    <>
      <Head>
        <title>AI Data Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Leniolabs_ LLC" />
        {/* OG Meta tags */}
        <meta name="og:type" content="website" />
        <meta
          property="og:image"
          content="https://labs.leniolabs.com/data-dashboard/meta.png"
        />
        <meta property="og:title" content="AI Data Dashboard" />
        <meta
          property="og:description"
          content="Visualize data with our tool created using OpenAI's GPT3 technology"
        />
        <meta
          name="og:url"
          content="https://labs.leniolabs.com/data-dashboard/"
        />
        {/* Twitter Meta tags */}
        <meta name="twitter:creator" content="Leniolabs_ LLC" />
        <meta
          property="twitter:image"
          content="https://labs.leniolabs.com/data-dashboard/meta.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Data Dashboard" />
        <meta
          name="twitter:url"
          content="https://labs.leniolabs.com/data-dashboard/"
        />
        <meta
          property="twitter:description"
          content="Visualize data with our tool created using OpenAI's GPT3 technology"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Panel>
          <PanelHeader>
            <WelcomeHeader
              title="AI Data Dashboard"
              subtitle={
                <>
                  Upload your CSV dataset or{" "}
                  <ButtonLink onClick={handleRandomDataset} accent="BRAND">
                    try it with random data.
                  </ButtonLink>
                </>
              }
            />
            <ButtonIcon icon="cog" onClick={handleShowSettings} />
            {showSettings && (
              <SettingsModal
                value={settings}
                onChange={handleSettingsChange}
                onCancel={handleCloseSettings}
              />
            )}
            <ButtonsRow>
              <UploadDatasetButton onUpload={handleDatasetChange} />
              <Button
                className="trash"
                disabled={!data}
                outline
                onClick={handleClear}
              >
                <Icon icon="thrash" /> Clear
              </Button>
              <Button
                className="analyze"
                disabled={!data && !!settings?.apikey}
                onClick={handleAnalyze}
              >
                {settings?.apikey && dashboard && data ? (
                  <Icon icon="arrow" />
                ) : null}{" "}
                {(() => {
                  if (!settings.apikey) return "Set up your API KEY";
                  return dashboard && data ? "Re-analyze" : "Analyze";
                })()}
              </Button>
            </ButtonsRow>

            {userContext ? (
              <TextInput
                type="textarea"
                label={
                  <>
                    Context about the data
                    <ButtonIcon icon="thrash" onClick={handleClearContext} />
                  </>
                }
                value={userContext}
                onChange={setUserContext}
              />
            ) : (
              <ButtonLink onClick={handleClick}> + Add Context</ButtonLink>
            )}
          </PanelHeader>
          <PanelContent>
            <Table
              data={data || []}
              onChange={(newData) => {
                setData(newData);
              }}
            />
            <HireUs />
          </PanelContent>
        </Panel>
        <Panel>
          <PanelHeader>
            <ButtonLink onClick={handleShowQuestion}>
              + Add a custom Chart/KPI
            </ButtonLink>
            {showQuestion && (
              <QuestionModal
                onSubmit={handleDashboardUpdate}
                onCancel={handleCloseQuestion}
              />
            )}
            <ViewSelect value={view} onChange={setView} />
          </PanelHeader>
          <PanelContent>
            {!settings.apikey && !data && !dashboard ? (
              <MissingApiKeyMessage
                onApiKeyClick={handleShowSettings}
                onRandomData={handleRandomDataset}
              />
            ) : null}
            {settings.apikey && !data && !dashboard ? (
              <EmptyMessage
                onRandomData={handleRandomDataset}
                onUpload={handleDatasetChange}
              />
            ) : null}
            {settings.apikey && data && !dashboard ? (
              <DataLoadedMessage onAnalyze={handleAnalyze} />
            ) : null}
            {dashboard && data && view === "dashboard" ? (
              <Dashboard data={data} dashboard={dashboard} />
            ) : null}
            {dashboard && view === "code" ? (
              <CodeHighlighter dashboard={dashboard} />
            ) : null}
            {data && view === "prompt" && (
              <TextAreaInput disabled value={getPrompt(promptTemplate, chat)} />
            )}
          </PanelContent>
        </Panel>
      </Container>
      {loading && <Loader />}
    </>
  );
}
