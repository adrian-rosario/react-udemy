// import { useState } from "react";
import ActionItems from "./components/ActionItems";
import NewActionItem from "./components/NewActionItem";
import TheActionItemsContextProvider from "./context-state/action-items-context";
// import ActionItem from "./model/actionitem";

function App() {
  /*
  const tempArr: ActionItem[] = [
    new ActionItem("one"),
    new ActionItem("two"),
    new ActionItem("three"),
  ];
  */

  // - useState() code moved to src/context-state/action-items-context.tsx

  return (
    <div className='App'>
      <TheActionItemsContextProvider>
        <NewActionItem />
        <h1>hello friend</h1>
        <ActionItems />
      </TheActionItemsContextProvider>
    </div>
  );
}

export default App;

/*
      <NewActionItem onAddActionItem={handleOnAddActionItem} />
      <div>hello friend</div>
      <ActionItems
        items={theActionItems}
        onDeleteItem={handleRemoveActionItem}
      />
*/
