import PropTypes from "prop-types";
import Tasks from "./Tasks";

export default function ProjectDisplay({
  project,
  onRemove,
  onAddTask,
  onDeleteTask,
  tasks,
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const mainCss = "w-[35rem] mt-16";
  const headingCss = "pb-4 mb-4 border-b-2 border-stone-300";

  return (
    <div className={mainCss}>
      <header className={headingCss}>
        <div className='flex items-center justify-between'>
          <h3 className='text-3xl font-bold text-stone-600 mb-2'>
            {project.title}
          </h3>

          <button
            onClick={onRemove}
            className='text-stone-600 hover:text-stone-950'
          >
            Remove
          </button>
        </div>
      </header>

      <div className='mb-4 text-stone-400'>{formattedDate}</div>
      <div className='text-stone-600 whitespace-pre-wrap'>
        {project.description}
      </div>

      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasksArray={tasks} />
    </div>
  );
}

ProjectDisplay.propTypes = {
  project: PropTypes.any,
  onRemove: PropTypes.any,
  onAddTask: PropTypes.any,
  onDeleteTask: PropTypes.any,
  tasks: PropTypes.any,
};
