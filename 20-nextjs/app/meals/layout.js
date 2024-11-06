export default function MealsLayout({ children }) {
  return (
    // - example for adding a nested layout
    <>
      <div>
        <h2 style={{ color: "white", textAlign: "center" }}>Meals</h2>
      </div>
      {children}
    </>
  );
}
