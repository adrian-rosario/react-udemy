import { useRef } from "react";
import styles from "./NewActionItem.module.css";

const NewActionItem: React.FC<{
  onAddActionItem: (theText: string) => void;
}> = (props) => {
  const theTextInputRef = useRef<HTMLInputElement>(null); // null is starting value

  const handleForm = (event: React.FormEvent) => {
    // -
    event.preventDefault();
    const userEnteredValue = theTextInputRef.current!.value;
    // console.log("value:\n" + userEnteredValue);
    if (userEnteredValue.trim().length === 0) {
      return;
    }
    props.onAddActionItem(userEnteredValue);
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
