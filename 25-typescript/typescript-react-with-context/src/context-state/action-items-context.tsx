import React, { useState } from "react";
import ActionItem from "../model/actionitem";

type ActionItemStructure = {
  items: ActionItem[];
  addActionListItem: (theText: string) => void;
  removeActionListItem: (id: string) => void;
};

// - to resolve: Property 'children' does not exist on type '{}'
interface Props {
  children: React.ReactNode;
}

export const TheActionItemsContext = React.createContext<ActionItemStructure>({
  items: [], // default value
  addActionListItem: () => {},
  removeActionListItem: (id: string) => {},
});

const TheActionItemsContextProvider: React.FC<Props> = (props) => {
  const [theActionItems, setTheActionItems] = useState<ActionItem[]>([]);

  const handleOnAddActionItem = (theText: string) => {
    // console.log("the sent text: " + theText);
    const theNewItem = new ActionItem(theText);

    setTheActionItems((prevState) => {
      return prevState.concat(theNewItem);
    });
  };

  const handleRemoveActionItem = (id: string) => {
    // console.log("remove this from state: " + id);

    setTheActionItems((prevState) => {
      return prevState.filter((actionItem) => actionItem.id !== id); // keep all the ids that don't match
    });
  };

  const contextValue: ActionItemStructure = {
    items: theActionItems,
    addActionListItem: handleOnAddActionItem,
    removeActionListItem: handleRemoveActionItem,
  };

  return (
    <TheActionItemsContext.Provider value={contextValue}>
      {props.children}
    </TheActionItemsContext.Provider>
  );
};

export default TheActionItemsContextProvider;
