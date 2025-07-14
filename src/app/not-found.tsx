import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-mono font-semibold tracking-tighter text-blue-900 mb-2">
        404: Page Not Found
      </h1>
      <p className="mt-2 text-lg text-center font-sans max-w-lg text-gray-700">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
        Please check the URL or return to the homepage.
      </p>
      <hr className="mt-6 mb-4 w-full max-w-xl border-blue-300/30" />
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-700 text-white rounded font-mono hover:bg-blue-900 transition"
      >
        Go back to shopping
      </Link>
    </main>
  );
}
