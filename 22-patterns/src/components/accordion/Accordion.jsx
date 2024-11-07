import { createContext, useContext, useState } from "react";
// - grouping the compound component
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const ComponentContext = createContext();

export function useAccordionContext() {
  const theAccordionContext = useContext(ComponentContext);
  if (!theAccordionContext) {
    throw new Error("No Accordion context provided");
  }
  return theAccordionContext;
}

export default function Accordion({ className, children }) {
  const [openItemId, setOpenItemId] = useState();

  // - refactoring, with on toggleItem function
  function toggleItem(id) {
    setOpenItemId((previousState) => (previousState === id ? null : id));
  }

  // - first pass...
  // function openItem(id) {
  //   setOpenItemId(id);
  // }

  // function closeItem() {
  //   setOpenItemId(null);
  // }

  const contextValue = {
    openItemId,
    toggleItem,
    // openItem,
    // closeItem,
  };

  return (
    <>
      <ComponentContext.Provider value={contextValue}>
        <ul className={className}>{children}</ul>
      </ComponentContext.Provider>
    </>
  );
}

Accordion.item = AccordionItem;
Accordion.title = AccordionTitle;
Accordion.content = AccordionContent;
