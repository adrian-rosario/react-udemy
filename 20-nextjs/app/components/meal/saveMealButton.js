"use client";
import { useFormStatus } from "react-dom";

export default function SaveMealButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Sending data..." : "Share Meal!"}
    </button>
  );
}
