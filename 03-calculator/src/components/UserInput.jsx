import PropTypes from "prop-types";

UserInput.propTypes = {
  onChangeInput: PropTypes.any,
  getFormState: PropTypes.any,
};

export default function UserInput({ onChangeInput, getFormState }) {
  return (
    <>
      <section className='inputGroup'>
        <div>
          <label htmlFor='initialInvestment'>Initial Investment: </label>
          <input
            type='number'
            id='initialInvestment'
            required
            value={getFormState.initialInvestment}
            onChange={(e) => onChangeInput("initialInvestment", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='annualInvestment'>Annual Investment: </label>
          <input
            type='number'
            id='annualInvestment'
            required
            value={getFormState.annualInvestment}
            onChange={(e) => onChangeInput("annualInvestment", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='expectedReturn'>Expected Return: </label>
          <input
            type='number'
            id='expectedReturn'
            required
            value={getFormState.expectedReturn}
            onChange={(e) => onChangeInput("expectedReturn", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='duration'>Duration: </label>
          <input
            type='number'
            id='duration'
            required
            value={getFormState.duration}
            onChange={(e) => onChangeInput("duration", e.target.value)}
          />
        </div>
      </section>
    </>
  );
}
