import { useRef, useContext } from "react";
import styles from "./NewActionItem.module.css";
import { TheActionItemsContext } from "../context-state/action-items-context";

const NewActionItem: React.FC = () => {
  const theItemsContext = useContext(TheActionItemsContext);

  const theTextInputRef = useRef<HTMLInputElement>(null); // null is starting value

  const handleForm = (event: React.FormEvent) => {
    // -
    event.preventDefault();
    const userEnteredValue = theTextInputRef.current!.value;
    // console.log("value:\n" + userEnteredValue);
    if (userEnteredValue.trim().length === 0) {
      return;
    }
    // props.onAddActionItem(userEnteredValue);
    theItemsContext.addActionListItem(userEnteredValue);
  };

  return (
    <>
      <form onSubmit={handleForm} className={styles.form}>
        <label htmlFor='textInput'>Enter new item:</label>
        <input type='text' id='textInput' ref={theTextInputRef} />
        <button>Add Item</button>
      </form>
    </>
  );
};

export default NewActionItem;
