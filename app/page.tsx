import { Suspense } from "react";
import { FolderOpenDot } from "lucide-react";
import RepoGrid, { RepoGridSkeleton } from "@/components/repo-grid";
import SearchBox from "@/components/search-box";
import { SearchProvider } from "@/contexts/search-context";

export default function Home() {
  return (
    <SearchProvider>
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
          <SearchBox />
          <Suspense fallback={<RepoGridSkeleton />}>
            <RepoGrid />
          </Suspense>
        </div>
      </main>
    </SearchProvider>
  );
}
