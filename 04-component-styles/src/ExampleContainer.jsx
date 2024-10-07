import "./exampleContainer.module.css";

export default function DxampleContainer() {
  return (
    <>
      <div className='exampleContainer'>
        <h2>Container Heading</h2>
        <p>This component has isolated/scoped CSS.</p>
        <div>
          <button>Some Button</button>
        </div>
      </div>
    </>
  );
}
