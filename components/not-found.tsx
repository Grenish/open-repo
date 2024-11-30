import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">

        <h1 className="text-6xl font-bold">😢</h1>
        <h1 className="text-primary-200 text-6xl font-bold">404</h1>
        <h2 className="text-text-200 text-2xl font-semibold mt-4">
          Repo Not Found
        </h2>
        <p className="text-text-200 mt-2">
          The repository you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
