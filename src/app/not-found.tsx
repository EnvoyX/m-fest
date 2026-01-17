import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[url("/eventslice.png")] px-6`}
    >
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-green-600/30 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-glass-xl shadow-2xl">
        <h1 className="mb-2 text-8xl font-bold tracking-tighter text-white/20">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>

        <p className="mt-4 text-gray-400">
          The page you're looking for has vanished into the void. Don't worry,
          we can get you back to safety.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
          >
            Return Home
          </Link>
        </div>
      </div>

      <p className="absolute bottom-8 text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Mechanical Festival 2026, All rights
        reserved.
      </p>
    </main>
  );
}
