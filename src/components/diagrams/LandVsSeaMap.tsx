// Land vs Sea — hex tiles whose edges (land green / sea blue) must match where they meet.
function hexPoints(cx: number, cy: number, r: number): [number, number][] {
  return [0, 60, 120, 180, 240, 300].map((d) => {
    const t = (d * Math.PI) / 180;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)] as [number, number];
  });
}

export function LandVsSeaMap() {
  const r = 38;
  // Three flat-top hexes meeting at edges. edges: 6 per hex, coloured land/sea.
  const tiles: { cx: number; cy: number; edges: ("land" | "sea")[] }[] = [
    { cx: 92, cy: 96, edges: ["sea", "sea", "land", "land", "land", "sea"] },
    { cx: 149, cy: 63, edges: ["land", "land", "land", "sea", "sea", "land"] },
    { cx: 149, cy: 129, edges: ["sea", "sea", "sea", "land", "land", "sea"] },
  ];
  const col = (e: "land" | "sea") => (e === "land" ? "var(--card-green)" : "var(--card-blue)");
  return (
    <svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Land vs Sea — place hex tiles so land edges meet land and sea edges meet sea; complete areas to score">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">MATCH EVERY EDGE</text>

      {tiles.map((tile, ti) => {
        const pts = hexPoints(tile.cx, tile.cy, r);
        return (
          <g key={ti}>
            <polygon points={pts.map((p) => p.join(",")).join(" ")} fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
            {pts.map((p, i) => {
              const q = pts[(i + 1) % 6];
              return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={col(tile.edges[i])} strokeWidth="4" strokeLinecap="round" />;
            })}
          </g>
        );
      })}

      {/* legend */}
      <g transform="translate(250,60)">
        <line x1="0" y1="0" x2="22" y2="0" stroke="var(--card-green)" strokeWidth="4" strokeLinecap="round" />
        <text x="30" y="4" fill="var(--ink)" fontSize="10">land edge</text>
        <line x1="0" y1="22" x2="22" y2="22" stroke="var(--card-blue)" strokeWidth="4" strokeLinecap="round" />
        <text x="30" y="26" fill="var(--ink)" fontSize="10">sea edge</text>
      </g>

      <text x="20" y="196" fill="var(--ink)" fontSize="10.5" fontWeight="600">Land closes land areas, Sea closes sea areas.</text>
      <text x="20" y="211" fill="var(--ink-soft)" fontSize="10.5">Each completed area = 1 point per tile, plus bonus points.</text>
    </svg>
  );
}
