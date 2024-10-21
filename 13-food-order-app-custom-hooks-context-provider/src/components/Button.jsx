import PropTypes from "prop-types";

export default function Button({ children, cssClasses, textButton, ...props }) {
  let theStyles = textButton ? "textButton" : "";

  if (cssClasses) {
    theStyles += " " + cssClasses;
  }

  return (
    <button className={theStyles} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  cssClasses: PropTypes.any,
  textButton: PropTypes.any,
};
