import Button from "./Button";
import PropTypes from "prop-types";

export default function ProjectSidebar({
  onAddProject,
  projects,
  projectSelected,
  projectSelectedId,
}) {
  let buttonCss =
    "w-full text-left px-2 py-1 rounded-sm my-1  hover:text-stone-200 hover:bg-stone-800";

  return (
    <aside className='w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
      <h2 className='mb-8 font-bold uppercase md:text-xl text-stone-200'>
        Your Projects
      </h2>
      <div>
        <Button onClick={onAddProject}>Add Project</Button>
      </div>

      <div>
        {projects.length === 0 ? (
          "None created"
        ) : (
          <ul className='mt-8'>
            {projects.map((item) => {
              if (item.id === projectSelectedId) {
                // TODO: imporve this
                buttonCss += " bg-stone-800 text-stone-200";
              } else {
                buttonCss += " bg-stone-400 text-stone-800";
              }

              return (
                <li key={item.id}>
                  <button
                    onClick={() => projectSelected(item.id)}
                    className={buttonCss}
                  >
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}

ProjectSidebar.propTypes = {
  onAddProject: PropTypes.any,
  projects: PropTypes.any,
  projectSelected: PropTypes.any,
  projectSelectedId: PropTypes.any,
};
