// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import reactImage from "./assets/react.svg";
import "./components/MyListItems";
import MyListItems from "./components/MyListItems";

const MOCK_DATA_1 = [
  { id: 123, name: "sam", message: "rocks" },
  { id: 124, name: "tim", message: "trees" },
  { id: 125, name: "ralph", message: "mountains" },
];

function loopMockData(): object[] {
  // return MOCK_DATA_1.forEach((item) => console.log(item));
  // return `name ${this.MOCK_DATA_1.name}, message ${MOCK_DATA_1.message}`;
  // let temp = [];
  // return MOCK_DATA_1.forEach((item) => item);
  //  MOCK_DATA_1.forEach((item) => temp.push(item));
  // const temp = [];
  // MOCK_DATA_1.forEach((item) =>
  //   temp.push(`name: ${item.name} message:${item.message}`)
  // );
  const newStuff = MOCK_DATA_1.map((eachItem) => {
    return (
      <div>
        name: {eachItem.name}, message: {eachItem.message}
      </div>
    );
  });
  console.log("?? + " + typeof newStuff);
  console.log(`??? ${newStuff}`);
  return newStuff;
  // return temp;
}

function HeaderTest() {
  return <h2>hello him</h2>;
}

function App() {
  // const [count, setCount] = useState(0);

  function pickRandomNumber(maxNumber: number) {
    return Math.floor(Math.random() * (maxNumber + 1));
  }

  const mySimpleArray = ["Homee", "Clown", "Laughs", "Homer", "Barney"];

  function someLine(): string {
    return mySimpleArray[pickRandomNumber(mySimpleArray.length - 1)];
  }

  function theList(): string {
    const markup = [];
    mySimpleArray.forEach((item, index) => {
      markup.push(MyListItems({ name: item, words: "he is great" }, index));
    });
    // console.log("markup: \n" + JSON.stringify(markup.toString()));
    return markup;
  }

  return (
    <>
      <div>
        <h1>Hello: {someLine()}</h1>
        <img src={reactImage} alt='' />

        <ul>
          {theList()}
          {/* <MyListItems
            name={mySimpleArray[1]}
            words='hello'
            index='222'
          ></MyListItems> */}
        </ul>
        <hr />
        {loopMockData()}
      </div>

      <HeaderTest></HeaderTest>
    </>
  );
}

export default App;
