import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionContent({ /* id,*/ children, className }) {
  const { openItemId /*  toggleItem openItem, closeItem */ } =
    useAccordionContext();

  const id = useAccordionItemContext();

  const isOpen = openItemId === id;

  return (
    <>
      <div
        className={
          isOpen ? `${className ?? ""} open` : `${className ?? ""} closed`
        }
      >
        {children}
      </div>
    </>
  );
}

/*
          isOpen ? "accordion-item-content open" : "accordion-item-content"
*/
