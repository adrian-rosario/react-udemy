import { useIsFetching } from "@tanstack/react-query";

export default function Header({ children }) {
  // - if reactQuery is fetching data at any point in time
  const fetchingData = useIsFetching();

  return (
    <>
      <div id='main-header-loading'>{fetchingData > 0 && <progress />}</div>

      <header id='main-header'>
        <div id='header-title'>
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
