import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useHookStore = (shouldListen = true) => {
  const setTheState = useState(globalState)[1]; // second value in the array, update function

  const dispatch = (actionId, payload) => {
    const newState = actions[actionId](globalState, payload);
    globalState = { ...globalState, ...newState };
    // updates the react state, with the new global state
    // and then re-renders the component using the custom hook
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    // - so we can help mitigate not calling when props havent
    // changed when using React.memo
    if (shouldListen) listeners.push(setTheState);

    // - remove the listener when the component unmounts
    return () => {
      if (shouldListen)
        listeners = listeners.filter((item) => item !== setTheState);
    };
  }, [setTheState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};
