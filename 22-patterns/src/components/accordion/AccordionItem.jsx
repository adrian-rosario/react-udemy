import { createContext, useContext } from "react";
import { useAccordionContext } from "./Accordion";
import AccordionContent from "./AccordionContent";
import AccordionTitle from "./AccordionTitle";

const AccordionItemContext = createContext();

export function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("Missing <Accordion.item></Accordion.item>");
  }
  return context;
}

export default function AccordionItem({
  /* title,*/ children,
  /* id, */ className,
  id,
}) {
  return (
    <>
      <AccordionItemContext.Provider value={id}>
        <li className={className}>{children}</li>
      </AccordionItemContext.Provider>
    </>
  );
}

// const { openItemId, toggleItem /* openItem, closeItem */
// } = useAccordionContext();

// const isOpen = openItemId === id;

// function handleTitleClick() {
//   if (isOpen) {
//     closeItem();
//   } else {
//     openItem(id);
//   }
// }

/* 
<h3 onClick={() => toggleItem(id)} style={{ cursor: "pointer" }}>
          {title}
        </h3>

        <div
          className={
            isOpen ? "accordion-item-content open" : "accordion-item-content"
          }
        >
          {children}
        </div>
*/
