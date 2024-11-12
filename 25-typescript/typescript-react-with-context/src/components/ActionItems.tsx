import React, { useContext } from "react";
// import ActionItem from "../model/actionitem";
import ActionListItem from "./ActionListItem";
import styles from "./ActionItems.module.css";
import { TheActionItemsContext } from "../context-state/action-items-context";

const ActionItems: React.FC = () => {
  const theItemsContext = useContext(TheActionItemsContext);

  return (
    <>
      <ul className={styles.actionItems}>
        {theItemsContext.items.map((item) => (
          <ActionListItem
            key={item.id}
            item={item}
            onDeleteItem={theItemsContext.removeActionListItem.bind(
              null,
              item.id
            )}
          />
        ))}
      </ul>
    </>
  );
};
export default ActionItems;
