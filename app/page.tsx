import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5">
      <h1 className="py-5">Hello from Home page</h1>

      <Link href="/Users" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Users</Link>
    </div>
  );
}
