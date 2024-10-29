import { useNavigate } from "react-router-dom";

export default function Home() {
  // - example of prgramatic navigating, for an example, do not build navigation this way
  // use for ie. a timer expired, etc.
  const navigate = useNavigate();
  const handleProgramaticNavigation = () => {
    navigate("/products");
  };

  return (
    <div>
      <h1>Hello, home</h1>
      <div>
        <button onClick={handleProgramaticNavigation}>
          Example of programatic navigation
        </button>
      </div>
    </div>
  );
}
