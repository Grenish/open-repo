"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Search, ChevronsUpDown } from "lucide-react";
import { useSearchContext } from "@/contexts/search-context";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchBox() {
  const {
    searchTerm,
    setSearchTerm,
    language,
    setLanguage,
    difficulty,
    setDifficulty,
    applyFilters,
    fetchRepos,
  } = useSearchContext();

  const [languageDropdownOpen, setLanguageDropdownOpen] =
    useState<boolean>(false);
  const [difficultyDropdownOpen, setDifficultyDropdownOpen] =
    useState<boolean>(false);
  const [isCustomLanguage, setIsCustomLanguage] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState("");

  const languages: string[] = [
    "JavaScript",
    "TypeScript",
    "Rust",
    "C++",
    "C#",
    "Python",
    "Ruby",
  ];

  const difficulties: string[] = [
    "None",
    "Good first issue",
    "Intermediate",
    "Advanced",
  ];

  const debouncedSearchTerm = useDebounce(searchInput, 300);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
    if (debouncedSearchTerm) {
      fetchRepos();
    }
  }, [debouncedSearchTerm, setSearchTerm, fetchRepos]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsCustomLanguage(false);
    setLanguageDropdownOpen(false);
  };

  const handleCustomLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
    setIsCustomLanguage(true);
  };

  const handleApplyFilters = () => {
    applyFilters();
    fetchRepos();
  };

  return (
    <div className="mt-5 flex gap-2">
      <div className="w-1/2 overflow-hidden rounded-xl flex items-center gap-2 bg-gray-300 p-1 px-2">
        <input
          type="text"
          placeholder="Search Repository"
          value={searchInput}
          onChange={handleSearchChange}
          className="outline-none p-1 w-full bg-transparent text-sm"
        />
        <Search className="text-bg-100 mr-2" size={20} />
      </div>

      <div className="relative w-1/5">
        <div
          onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
          className="cursor-pointer w-full overflow-hidden rounded-xl flex items-center gap-2 bg-gray-300 p-1 px-2"
        >
          <input
            type="text"
            value={language}
            placeholder="Language"
            onChange={handleCustomLanguageChange}
            className="outline-none p-1 w-full bg-transparent text-sm cursor-pointer"
          />
          <ChevronsUpDown className="text-bg-100" size={20} />
        </div>
        {languageDropdownOpen && (
          <div className="absolute z-[999] bg-bg-200 p-2 rounded-xl left-0 w-full top-10 text-text-200">
            <ul>
              {languages.map((lang) => (
                <li
                  key={lang}
                  className="p-2 hover:bg-bg-300 rounded-lg cursor-pointer"
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang}
                </li>
              ))}
              <li
                key="custom"
                className="p-2 hover:bg-bg-300 rounded-lg cursor-pointer"
                onClick={() => {
                  setIsCustomLanguage(true);
                  setLanguageDropdownOpen(false);
                }}
              >
                Custom Language
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="relative w-1/5">
        <div
          onClick={() => setDifficultyDropdownOpen(!difficultyDropdownOpen)}
          className="cursor-pointer w-full overflow-hidden rounded-xl flex items-center gap-2 bg-gray-300 p-1 px-2"
        >
          <input
            type="text"
            value={difficulty}
            placeholder="Difficulty"
            readOnly
            className="outline-none p-1 w-full bg-transparent text-sm cursor-pointer"
          />
          <ChevronsUpDown className="text-bg-100" size={20} />
        </div>
        {difficultyDropdownOpen && (
          <div className="absolute z-[999] bg-bg-200 p-2 rounded-xl left-0 w-full top-10 text-text-200">
            <ul>
              {difficulties.map((diff) => (
                <li
                  key={diff}
                  className="p-2 hover:bg-bg-300 rounded-lg cursor-pointer"
                  onClick={() => {
                    setDifficulty(diff);
                    setDifficultyDropdownOpen(false);
                  }}
                >
                  {diff}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="">
        <button
          className="bg-accent-200 p-2 rounded-xl text-sm w-full"
          onClick={handleApplyFilters}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
