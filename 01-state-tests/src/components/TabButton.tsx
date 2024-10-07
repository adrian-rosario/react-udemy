import { ReactNode } from "react";

function TabButton({
  children,
  onSelect, // method to call from the instance when onclick,
  isSelected,
}: {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: any;
  isSelected: boolean;
}) {
  return (
    <>
      <li>
        <button className={isSelected ? "active" : ""} onClick={onSelect}>
          {children}
        </button>
      </li>
    </>
  );
}

export default TabButton;
