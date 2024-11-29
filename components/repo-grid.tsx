import RepoCard from "./repo-card";

export default function RepoGrid({ repos = [] }: { repos?: any[] }) {
  if (repos.length === 0) {
    return <div>No repositories found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-primary-200 mb-4">
        Trending Open Source Repositories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}  

export async function getServerSideProps() {
  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=is:public+stars:>10000&sort=stars&order=desc`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    return {
      props: { repos: data.items || [] },
    };
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return { props: { repos: [] } }; // Provide an empty array as fallback
  }
}
