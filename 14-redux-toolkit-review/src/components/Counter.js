import classes from "./Counter.module.css";
import {
  useSelector,
  useDispatch /* -if class component- connect */,
} from "react-redux";

// - redux devtools
import { counterActions } from "../store/counter-slice";

const Counter = () => {
  // - subscription is managed behind the scenes
  const counterValueFromState = useSelector(
    (state) => state.counterStore.counter
  );
  const dispatch = useDispatch();

  // console.log("counter state: " + counterValueFromState);
  // - get access to the toggle boolean in the store
  const toggleValueFromState = useSelector(
    (state) => state.counterStore.showCounter
  );

  // -
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
    // dispatch({ type: "toggle" });
  };

  const handleIncrement = () => {
    dispatch(counterActions.increment());
    // dispatch({ type: "increment" });
  };

  const handleDecrement = () => {
    dispatch(counterActions.decrement());
    // dispatch({ type: "decrement" });
  };

  const handleLargeIncrease = () => {
    dispatch(counterActions.increase(5));
    // dispatch({ type: "increase", amount: 5 });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>

      {toggleValueFromState && (
        <div>
          <div className={classes.value}>{counterValueFromState}</div>

          <div className='counterActions'>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <div>
              <button onClick={handleLargeIncrease}>Increase by 5</button>
            </div>
          </div>
        </div>
      )}

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
