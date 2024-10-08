import Button from "./Button";
import PropTypes from "prop-types";

export default function NoProjectSelected({ onAddProject }) {
  return (
    <div className='mt-24 text-center w-2/3'>
      <h2 className='text-xl font-bold text-stone-500 mt-4 my-4'>
        No project selected.
      </h2>

      <p className='text-stone-400 mb-4'>
        Select a project or start a new one.
      </p>

      <div className='mt-8'>
        <Button onClick={onAddProject}>Create a new project</Button>
      </div>
    </div>
  );
}

NoProjectSelected.propTypes = {
  onAddProject: PropTypes.any,
};
