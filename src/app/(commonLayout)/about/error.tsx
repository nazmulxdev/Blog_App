"use client";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <div>
      <h1>error occurs. please check and debug.</h1>
      <button onClick={() => reset}>Try again</button>
    </div>
  );
}
