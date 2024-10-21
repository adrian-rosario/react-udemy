import PropTypes from "prop-types";
export default function Error({ title, message }) {
  return (
    <div className='error'>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};
