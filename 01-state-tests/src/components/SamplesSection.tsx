import * as model from "../model/data-with-examples.ts";
import TabButton from "./TabButton.tsx";
import { ReactElement, ReactNode, useState } from "react";

export default function SamplesSection() {
  const [selectedTopic, setSelectedTopic] = useState("Choose a topic");
  const [getDescription, setDescription] = useState();
  const [getDescriptionMarkup, setDescriptionMarkup] = useState();

  const createButtons = () => {
    const buttons = [];
    for (const key in model.EXAMPLES) {
      // console.log(`key ${key} value ${JSON.stringify(model.EXAMPLES[key])}`);
      buttons.push(
        <TabButton
          key={key}
          onSelect={() => {
            handleButtonClick(key, model.EXAMPLES[key]);
          }}
          isSelected={key === selectedTopic ? true : false}
        >
          {key}
        </TabButton>
      );
    }
    return buttons;
  };

  const handleButtonClick = (value: ReactNode, data: ReactElement) => {
    console.log("🎳 " + JSON.stringify(value));

    switch (value) {
      case "components":
        setDescriptionMarkup(data!.code);
        setSelectedTopic(value.toString());
        setDescription(data!.description);

        break;

      case "jsx":
        setSelectedTopic(value.toString());
        setDescription(data!.description);
        setDescriptionMarkup(data!.code);
        break;

      case "props":
        setSelectedTopic(value.toString());
        setDescription(data!.description);
        setDescriptionMarkup(data!.code);
        break;

      case "state":
        setSelectedTopic(value.toString());
        setDescription(data!.description);
        setDescriptionMarkup(data!.code);
        break;
    }
  };

  return (
    <>
      <menu>
        <ul>{createButtons()}</ul>
      </menu>

      <div className='selectedDetails'>
        <h3>{selectedTopic}</h3>

        {!getDescription && <p>Try one of the buttons above.</p>}
        <p>{getDescription}</p>

        <pre>
          <code>{getDescriptionMarkup}</code>
        </pre>
      </div>
    </>
  );
}
