import logoImage from "../assets/investment-calculator-logo.png";

export default function Header() {
  return (
    <>
      <header>
        <div className='header'>
          <div>
            <img src={logoImage} alt='Calculator' />
          </div>
          <div>
            <h1>Investment Calculator</h1>
          </div>
        </div>
      </header>
    </>
  );
}
