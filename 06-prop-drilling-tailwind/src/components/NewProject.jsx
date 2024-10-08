import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";

export default function NewProject({ onAdd, onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const modal = useRef();

  const saveButtonCss =
    "px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950";

  const modalHeadingCss = "text-xl font-bold text-stone-500 my-4";

  const cancelButtonCss = "text-stone-800 hover:text-stone-950";

  function handleSave() {
    const theTitle = title.current.value;
    const theDescription = description.current.value;
    const theDueDate = dueDate.current.value;

    if (theTitle.trim() === "" || theDescription.trim() === "") {
      // console.log("we should error");
      modal.current.open();
      return;
    }

    onAdd({
      title: theTitle,
      description: theDescription,
      dueDate: theDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal}>
        <h2 className={modalHeadingCss}>Please check your entries.</h2>
      </Modal>

      <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            <button onClick={onCancel} className={cancelButtonCss}>
              Cancel
            </button>
          </li>
          <li>
            <button onClick={handleSave} className={saveButtonCss}>
              Save
            </button>
          </li>
        </menu>
        <div>
          <div>
            <Input ref={title} label='Title' id='title' />
          </div>

          <div>
            <Input
              ref={description}
              label='Description'
              id='description'
              textArea
            />
          </div>

          <div>
            <Input ref={dueDate} label='Due Date' id='dueDate' date />
          </div>
        </div>
      </div>
    </>
  );
}

NewProject.propTypes = {
  onAdd: PropTypes.any,
  onCancel: PropTypes.any,
};
