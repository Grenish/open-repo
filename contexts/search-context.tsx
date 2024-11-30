"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { Repo } from "@/types/github";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  difficulty: string;
  setDifficulty: (diff: string) => void;
  appliedLanguage: string;
  appliedDifficulty: string;
  applyFilters: () => void;
  repos: Repo[];
  setRepos: (repos: Repo[]) => void;
  fetchRepos: () => Promise<void>;
  isLoading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [appliedLanguage, setAppliedLanguage] = useState("");
  const [appliedDifficulty, setAppliedDifficulty] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const applyFilters = useCallback(() => {
    setAppliedLanguage(language);
    setAppliedDifficulty(difficulty);
  }, [language, difficulty]);

  const fetchRepos = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = searchTerm
        ? `${searchTerm} in:name,description`
        : "stars:>1000";
      if (appliedLanguage) {
        query += ` language:${appliedLanguage}`;
      }
      if (appliedDifficulty && appliedDifficulty !== "None") {
        query += ` topic:${appliedDifficulty.toLowerCase().replace(" ", "-")}`;
      }
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          query
        )}&sort=stars&order=desc&per_page=30`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      const data = await res.json();
      setRepos(data.items || []);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, appliedLanguage, appliedDifficulty]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        language,
        setLanguage,
        difficulty,
        setDifficulty,
        appliedLanguage,
        appliedDifficulty,
        applyFilters,
        repos,
        setRepos,
        fetchRepos,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
