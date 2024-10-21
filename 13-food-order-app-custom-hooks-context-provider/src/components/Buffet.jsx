import BuffetItem from "./BuffetItem";
import useHttp from "../hooks/useHttp";
import * as invar from "../util/constants";
import Error from "./Error";

// - without setting the configuration like this (outside the component),
// the empty object configuration for the hook gets recreated and an
// infinite loop is generated
const requestConfiguration = {};

export default function Buffet() {
  const {
    data: loadedMenu,
    isLoading,
    error,
  } = useHttp(invar.MEALS, requestConfiguration, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Error title='There was an error' message='Data failed to load.' />;
  }

  return (
    <main>
      <div className='buffet'>
        <ul>
          {loadedMenu.map((theItem) => (
            <BuffetItem key={theItem.id} item={theItem} />
          ))}
        </ul>
      </div>
    </main>
  );
}

// - refactored
// import * as http from "../util/http";
// import { useState, useEffect } from "react";

// - refactored to custom hook, useHttp.js
// const [loadedMenu, setLoadedMenu] = useState([]);

// - run side effect after component render, and control when
// run (dependencies), avoiding infinite loop
// - refactored to custom hook, useHttp.js
// useEffect(
//   () => {
//     async function loadData() {
//       const data = await http.getMeals();
//       setLoadedMenu(data);
//     }

//     loadData();
//   },
//   [
//     // dependencies
//     // ie. any external props, state/valeus that could change
//     // accross renders
//   ]
// );
