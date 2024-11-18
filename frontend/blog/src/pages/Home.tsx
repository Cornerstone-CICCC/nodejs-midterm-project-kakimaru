
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="px-6 flex flex-col gap-6 items-center">
      <img
        src="sp_main.webp"
        alt="thought log"
        className="absolute left-1/2 top-8 h-auto w-4/5 -translate-x-1/2 transform z-[-1] max-h-screen object-contain"
      />
      <h1 className="text-center text-4xl font-bold text-cyan-700 mt-32">
        ThoughtLog
      </h1>
      <p className="text-center text-slate-700 sm:max-w-sm">A simple diary app to record your thoughts. Edit entries easily and choose between public or private settings. <br /><br />Quick, intuitive, and personal.</p>
      <div className="grid gap-6 mt-10">
      </div>
      <Link to="/signup" className="w-full rounded-md bg-cyan-700 px-6 py-4 text-center text-white sm:max-w-sm">Create an account</Link>
    </div>
  );
}
