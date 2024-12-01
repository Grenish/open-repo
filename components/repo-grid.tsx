"use client";

import { useEffect } from "react";
import RepoCard from "./repo-card";
import { useSearchContext } from "@/contexts/search-context";
import NotFound from "./not-found";

export default function RepoGrid() {
  const { repos, fetchRepos, isLoading } = useSearchContext();

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  if (isLoading) {
    return <RepoGridSkeleton />;
  }

  if (repos.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export function RepoGridSkeleton() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-4 border-2 rounded-xl h-48 animate-pulse bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
