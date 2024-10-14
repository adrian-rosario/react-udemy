export default function Error({ title, message, onConfirm }) {
  return (
    <div className='error'>
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div className='confirmation-actions'>
          <button className='button' onClick={onConfirm}>
            OK
          </button>
        </div>
      )}
    </div>
  );
}
