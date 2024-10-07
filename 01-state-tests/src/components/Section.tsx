import { ReactNode } from "react";

export default function Section({
  title,
  children,
  ...props
}: {
  title: ReactNode;
  children: ReactNode;
  props: ReactNode;
}) {
  return (
    <>
      <section {...props}>
        <h3>{title}</h3>
        {children}
      </section>
    </>
  );
}
