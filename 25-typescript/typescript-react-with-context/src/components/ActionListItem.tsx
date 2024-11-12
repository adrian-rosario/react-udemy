import ActionItem from "../model/actionitem";
import React from "react";
import styles from "./ActionListItem.module.css";

const ActionListItem: React.FC<{
  item: ActionItem;
  onDeleteItem: (id: string) => void;
}> = (props) => {
  const handleItemClick = () => {
    console.log("delete this item: " + props.item.id);
    props.onDeleteItem(props.item.id);
  };

  return (
    <li className={styles.item} key={props.item.id}>
      <button onClick={handleItemClick}>{props.item.text}</button>
    </li>
  );
};

export default ActionListItem;
