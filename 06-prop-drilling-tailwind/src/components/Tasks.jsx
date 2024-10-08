import PropTypes from "prop-types";
import NewTask from "./NewTask";

export default function Tasks({ tasksArray, onAdd, onDelete }) {
  const headingCss = "text-2xl font-bold text-stone-700 mb-4";

  console.log("tasks, any data? " + JSON.stringify(tasksArray));

  return (
    <section className='my-16'>
      <h3 className={headingCss}>Tasks</h3>

      <div>
        <NewTask onAdd={onAdd} />
      </div>

      {tasksArray.length === 0 && (
        <p className='text-stone-800 my-4'>No Tasks Yet</p>
      )}

      <ul>
        {tasksArray.length > 0 &&
          tasksArray.map((item) => {
            return (
              <li key={item.id} className='flex justify-between my-4'>
                <span>{item.text}</span>
                <button
                  onClick={() => onDelete(item.id)}
                  className='text-stone-700 hover:text-red-500'
                >
                  Delete Task
                </button>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

Tasks.propTypes = {
  tasksArray: PropTypes.any,
  onAdd: PropTypes.any,
  onDelete: PropTypes.any,
};
