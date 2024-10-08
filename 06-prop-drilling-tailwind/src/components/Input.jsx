import { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(function Input(
  { label, id, textArea = false, date = false, ...props },
  ref
) {
  const inputCssClasses =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600";

  return (
    <div className='flex flex-col gap-1 my-4'>
      <label
        className='text-sm font-bold uppercase text-stone-500'
        htmlFor={id}
      >
        {label}
      </label>
      {textArea ? (
        <textarea
          ref={ref}
          className={inputCssClasses}
          {...props}
          id={id}
        ></textarea>
      ) : (
        <input
          ref={ref}
          className={inputCssClasses}
          id={id}
          {...props}
          type={date ? "date" : "text"}
        />
      )}
    </div>
  );
});
export default Input;

Input.propTypes = {
  label: PropTypes.any,
  id: PropTypes.any,
  textArea: PropTypes.any,
  date: PropTypes.any,
};
