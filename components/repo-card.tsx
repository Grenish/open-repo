import Image from "next/image";
import { Star, GitFork, CircleDot, Github } from "lucide-react";
import { Repo } from "@/types/github";
import Link from "next/link";

function FormatNumber({ number }: { number: number }) {
  return number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number.toString();
}

function ShortDescription({ description }: { description: string }) {
  return description.length > 100
    ? `${description.slice(0, 100)}...`
    : description;
}

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="p-4 border-2 rounded-xl relative overflow-hidden flex flex-col">
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
      <div className="relative z-10 flex flex-col flex-1">
        <div>
          <h2 className="text-primary-300 text-sm">{repo.owner.login}</h2>
          <h2 className="text-primary-200 text-xl">{repo.name}</h2>

          <p className="text-text-200 text-sm mt-2">
            <ShortDescription description={repo.description || ""} />
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="inline-flex items-center gap-1">
              <Star className="text-accent-200" size={16} />
              <span className="text-text-200 text-xs">
                <FormatNumber number={repo.stargazers_count} />
              </span>
            </div>
            <div className="inline-flex items-center gap-1">
              <GitFork className="text-accent-200" size={16} />
              <span className="text-text-200 text-xs">
                <FormatNumber number={repo.forks_count} />
              </span>
            </div>
            <div className="inline-flex items-center gap-1">
              <CircleDot className="text-accent-200" size={16} />
              <span className="text-text-200 text-xs">
                <FormatNumber number={repo.open_issues_count} />
              </span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-auto flex items-center justify-end gap-2">
          <Link href={repo.html_url} target="_blank">
            <button className="bg-bg-200 inline-flex items-center gap-2 text-text-200 text-xs p-2 px-4 rounded-lg">
              <Github className="text-text-200" size={15} />
              Open in GitHub
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
