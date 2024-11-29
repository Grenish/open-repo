import Image from "next/image";
import { FolderOpenDot } from "lucide-react";
import RepoGrid from "@/components/repo-grid";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-100 px-4 py-6 md:px-6 lg:px-8">
      <span className="inline-flex items-center gap-2">
        <FolderOpenDot className="text-primary-200" size={54} />
        <h2 className="text-primary-200 text-4xl">Open Repo</h2>
      </span>
      <h2 className="text-text-200 text-sm">
        Discover the Open Source Project That Best Matches Your Skills and
        Interests
      </h2>
      <div className="">
        <RepoGrid />
      </div>
    </main>
  );
}
