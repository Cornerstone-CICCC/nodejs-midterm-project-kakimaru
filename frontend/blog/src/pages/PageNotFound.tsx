import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <>
      <div className="flex min-h-screen flex-col place-content-center items-center gap-10 px-6">
        <img
          src="sp_main.webp"
          alt="thought log"
          className="absolute left-1/2 top-8 z-[-1] h-auto w-4/5 -translate-x-1/2 transform max-h-screen object-contain"
        />
        <h1 className="mb-20 mt-32 text-center text-4xl font-bold text-cyan-700">
          PageNotFound
        </h1>
        <Link
          to="/"
          className="w-full rounded-md bg-cyan-700 px-6 py-4 text-center text-white sm:max-w-sm"
        >
          Go back to Home
        </Link>
      </div>
    </>
  );
}
