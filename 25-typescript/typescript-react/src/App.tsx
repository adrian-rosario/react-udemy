import { useState } from "React";
import ActionItems from "./components/ActionItems";
import NewActionItem from "./components/NewActionItem";
import ActionItem from "./model/actionitem";

function App() {
  /*
  const tempArr: ActionItem[] = [
    new ActionItem("one"),
    new ActionItem("two"),
    new ActionItem("three"),
  ];
  */

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

  return (
    <div className='App'>
      <NewActionItem onAddActionItem={handleOnAddActionItem} />
      <div>hello friend</div>
      <ActionItems
        items={theActionItems}
        onDeleteItem={handleRemoveActionItem}
      />
    </div>
  );
}

export default App;
