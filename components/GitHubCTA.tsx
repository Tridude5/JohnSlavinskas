export default function GitHubCTA() {
  return (
    <a
      href="https://github.com/Tridude5"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-black text-white font-medium shadow-md ring-1 ring-black/10 hover:shadow-lg hover:-translate-y-0.5 transition"
      aria-label="Open my GitHub profile in a new tab"
    >
      <span>See my GitHub activity</span>
      <span aria-hidden>↗</span>
    </a>
  );
}
