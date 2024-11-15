// import BlogCard from "../components/BlogCard";

export default function Home() {
  return (
    <div className="px-6">
      <img
        src="sp_main.webp"
        alt="thought log"
        className="absolute left-1/2 top-8 h-auto w-4/5 -translate-x-1/2 transform z-[-1]"
      />
      <h1 className="text-center text-4xl font-bold text-cyan-700 mt-32 mb-20">
        ThoughtLog
      </h1>
      <p className="text-center text-slate-700">A simple diary app to record your thoughts. Edit entries easily and choose between public or private settings. <br /><br />Quick, intuitive, and personal.</p>
      <div className="grid gap-6 mt-10">
        {/* <BlogCard />
        <BlogCard />
        <BlogCard /> */}
      </div>
    </div>
  );
}
