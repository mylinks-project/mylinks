import Link from "next/link";
import { AlertCircle } from "lucide-react";

export function UserNotFound() {

  return (
    <div
      className={"flex flex-col items-center justify-start h-screen px-6  dark:text-gray-200 pt-24 text-gray-800"}
    >
      <div className="max-w-lg ">
        <div className="mb-6 ">
          <AlertCircle className="h-20 w-20 text-red-500" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">User Not Found</h1>
        <p className="text-sm sm:text-lg mb-6">
          We couldn&apos;t find the user you&apos;re looking for. The profile might have been removed or doesn&apos;t exist anymore.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href='/'  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-500 transition">
            Go to Home
          </Link>
        </div>
      </div>
    </div >
  );
}
