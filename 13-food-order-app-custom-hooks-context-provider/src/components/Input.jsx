import PropTypes from "prop-types";

export default function Input({ textLabel, id, type = "text", ...props }) {
  return (
    <div>
      <label htmlFor={id}>{textLabel}</label>
      <input type={type} id={id} name={id} required {...props} />
    </div>
  );
}

Input.propTypes = {
  textLabel: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  props: PropTypes.any,
};
