import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";
import { agate } from "../../utils/codeHighligherStyle";
import styles from "../../styles/Components.module.scss";
import { IDashboard } from "../../types";

interface CodeHighlighterProps {
  dashboard: IDashboard;
}

export function CodeHighlighter(props: CodeHighlighterProps) {
  const parsedCode = React.useMemo(() => {
    let strCode = JSON.stringify(props.dashboard);

    const matches = strCode.matchAll(
      /\"javascriptFunction\":\"(data \=\> \{ .*? \})\;?\"/g
    );
    let match = matches.next();
    while (!match.done) {
      const [_, func] = match.value;

      strCode = strCode.replace(`\"${func}\"`, func);
      match = matches.next();
    }

    return strCode;
  }, [props.dashboard]);

  return (
    <div className={styles.codeSection}>
      <SyntaxHighlighter
        customStyle={{ backgroundColor: "#4f4f4f" }}
        language="javascript"
        showLineNumbers={true}
        style={agate}
      >
        {prettier.format(`const config = ${parsedCode};`, {
          parser: "babel",
          plugins: [babylon],
          printWidth: 80,
        })}
      </SyntaxHighlighter>
    </div>
  );
}
