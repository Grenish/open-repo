import Image from "next/image";
import { Star, GitFork, CircleDot, Github } from "lucide-react";

export default function RepoCard({ repo }: { repo: any }) {
  return (
    <div className="p-4 border-2 rounded-xl relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            width={200}
            height={200}
            className="absolute -top-2 -right-2 object-cover opacity-70"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-100 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-primary-300 text-sm">{repo.owner.login}</h2>
        <h2 className="text-primary-200 text-xl">{repo.name}</h2>

        <p className="text-text-200 text-sm mt-2">
          {repo.description || "No description available."}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <div className="inline-flex items-center gap-1">
            <Star className="text-accent-200" size={16} />
            <span className="text-text-200 text-xs">
              {repo.stargazers_count}
            </span>
          </div>
          <div className="inline-flex items-center gap-1">
            <GitFork className="text-accent-200" size={16} />
            <span className="text-text-200 text-xs">{repo.forks_count}</span>
          </div>
          <div className="inline-flex items-center gap-1">
            <CircleDot className="text-accent-200" size={16} />
            <span className="text-text-200 text-xs">
              {repo.open_issues_count}
            </span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            className="bg-bg-200 inline-flex items-center gap-2 text-text-200 text-xs p-2 px-4 rounded-lg"
            onClick={() => window.open(repo.html_url, "_blank")}
          >
            <Github className="text-text-200" size={15} />
            Open in GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
