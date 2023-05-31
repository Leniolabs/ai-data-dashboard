import React from "react";
import styles from "../../styles/Components.module.scss";
import gtag from "../../lib/gtag";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import SelectInput from "./SelectInput";
import { GPT_MODEL } from "../../openai/constants";

export function SettingsModal(
  props: React.PropsWithChildren<{
    value: {
      apikey: string;
      sampleRows: number;
      model: string
    };
    onChange?: (value: { apikey: string; sampleRows: number, model: string }) => void;
    onCancel?: () => void;
  }>
) {
  const [settings, setSettings] = React.useState(props.value);

  const handleApiKeyChange = React.useCallback((apikey: string) => {
    setSettings((settings) => ({ ...settings, apikey }));
  }, []);

  const handleRowsSampleChange = React.useCallback((sampleRows: number) => {
    setSettings((settings) => ({ ...settings, sampleRows }));
  }, []);

  const handleModelChange = React.useCallback((model: string) => {
    setSettings((settings) => ({ ...settings, model }));
  }, []);

  const handleSave = React.useCallback(() => {
    gtag.report("event", "api_key", {
      event_category: "settings",
      event_label: "setting_up",
    });
    props.onChange?.(settings);
  }, [props.onChange, settings]);

  const handleCancel = React.useCallback(() => {
    props.onCancel?.();
  }, [props.onCancel]);

  return (
    <div className={styles.settingsModal}>
      <div className={styles.settingsModalContainer}>
        <div className={styles.settingsContent}>
          <TextInput
            value={settings.apikey}
            onChange={handleApiKeyChange}
            label={
              <>
                API Key{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://beta.openai.com/account/api-keys"
                >
                  Get your API key here
                </a>
              </>
            }
            type="text"
          />
          <TextInput
            value={settings.sampleRows}
            onChange={handleRowsSampleChange}
            label="Rows to sample"
            type="number"
          />
          <SelectInput
            onChange={handleModelChange}
            options={Object.values(GPT_MODEL)}
            title="Model"
            value={settings.model}
          />
        </div>
        <div className={styles.settingsFooter}>
          <Button outline onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
