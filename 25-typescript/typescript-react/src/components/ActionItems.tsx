import React from "react";
import ActionItem from "../model/actionitem";
import ActionListItem from "./ActionListItem";

import styles from "./ActionItems.module.css";

// fc is a generic type
// then giving a type to the props to the generic type, we also get access to 'children' in this manner
const ActionItems: React.FC<{
  items: ActionItem[];
  onDeleteItem: (id: string) => void;
}> = (props) => {
  return (
    <>
      <ul className={styles.actionItems}>
        {props.items.map((item) => (
          <ActionListItem
            key={item.id}
            item={item}
            onDeleteItem={props.onDeleteItem}
          />
        ))}
      </ul>
    </>
  );
};
export default ActionItems;
// <li key={item.id}>{item.text}</li>
// props.onDeleteItem.bind(null, item.id)
