"use client";

import { useEffect, useState } from "react";
import RepoCard from "./repo-card";
import { useSearchContext } from "@/contexts/search-context";
import { Repo } from "@/types/github";
import NotFound from "./not-found";

async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=is:public+stars:>10000&sort=stars&order=desc`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  const data = await res.json();
  return data.items || [];
}

export default function RepoGrid() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const { searchTerm, appliedLanguage, appliedDifficulty } = useSearchContext();

  useEffect(() => {
    fetchRepos().then(setRepos);
  }, []);

  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage =
      !appliedLanguage ||
      repo.language?.toLowerCase() === appliedLanguage.toLowerCase();
    const matchesDifficulty =
      !appliedDifficulty ||
      repo.topics.includes(appliedDifficulty.toLowerCase().replace(" ", "-"));
    return matchesSearch && matchesLanguage && matchesDifficulty;
  });

  if (filteredRepos.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-primary-200 mb-4">
        Trending Open Source Repositories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export function RepoGridSkeleton() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-primary-200 mb-4">
        Trending Open Source Repositories
      </h1>
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
