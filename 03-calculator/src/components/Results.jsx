import PropTypes from "prop-types";
import * as util from "../util/investment.js";

Results.propTypes = {
  onChangeInput: PropTypes.any,
};

export default function Results({ onChangeInput }) {
  console.log("results\n" + JSON.stringify(onChangeInput));

  const resultsData = util.calculateInvestmentResults(onChangeInput);
  const initialInvestment =
    resultsData[0].valueEndOfYear -
    resultsData[0].interest -
    resultsData[0].annualInvestment;
  // console.log("Results, data\n" + JSON.stringify(resultsData));
  return (
    <>
      <h3>Results</h3>
      <table className='results'>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest Earned</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {resultsData.map((yearData) => {
            const theTotalInterst =
              yearData.valueEndOfYear -
              yearData.annualInvestment * yearData.year -
              initialInvestment;

            const totalInvestment = yearData.valueEndOfYear - theTotalInterst;

            return (
              <tr key={yearData.year}>
                <td>{yearData.year}</td>
                <td>{util.formatter.format(yearData.valueEndOfYear)}</td>
                <td>{util.formatter.format(yearData.interest)}</td>
                <td>{util.formatter.format(theTotalInterst)}</td>
                <td>{util.formatter.format(totalInvestment)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
