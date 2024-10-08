import PropTypes from "prop-types";
import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [getEnteredTask, setEnteredTask] = useState("");

  function setTask(e) {
    setEnteredTask(e.target.value);
  }

  function handleAddTask() {
    // console.log("handle add task " + getEnteredTask);

    if (getEnteredTask.trim() === "") return;

    onAdd(getEnteredTask);
    setEnteredTask("");
  }

  return (
    <div className='flex items-cener gap-4'>
      <input
        type='text'
        className='w-64 px-2 py-1 rounded-sm bg-stone-200'
        id='newTaskField'
        onChange={setTask}
        value={getEnteredTask}
      />
      <button
        onClick={handleAddTask}
        className='text-stone-700 hover:text-stone-950'
      >
        Add Task
      </button>
    </div>
  );
}

NewTask.propTypes = {
  onAdd: PropTypes.any,
};
