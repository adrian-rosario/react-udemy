import { v4 as uuid } from "uuid";

class ActionItem {
  id: string;
  text: string;

  constructor(theText: string) {
    const theUuid = uuid();
    this.id = theUuid;
    this.text = theText;
  }
}

export default ActionItem;
