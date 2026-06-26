// Paris — the cobblestone grid, a streetlight lighting its four orthogonal spaces,
// and a building scoring size × light.
export function ParisGrid() {
  // 4x4 of spaces; mark colours, one streetlight, one building footprint.
  const cell = 40;
  const ox = 24;
  const oy = 40;
  const kindOf = (r: number, c: number): "light" | "orange" | "blue" | "mixed" => {
    if (r === 1 && c === 1) return "light";
    if ((r + c) % 3 === 0) return "orange";
    if ((r + c) % 3 === 1) return "blue";
    return "mixed";
  };
  const FILL: Record<string, string> = {
    light: "var(--surface)",
    orange: "var(--card-orange)",
    blue: "var(--card-blue)",
    mixed: "var(--surface-sunk)",
  };
  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Paris — place cobblestone tiles, build on your colour, and light buildings with streetlights to score">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">THE COBBLESTONE GRID</text>

      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => {
          const kind = kindOf(r, c);
          const x = ox + c * cell;
          const y = oy + r * cell;
          const fill = FILL[kind];
          const tinted = kind === "orange" || kind === "blue";
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width={cell - 4} height={cell - 4} rx="4" fill={fill} stroke="var(--border)" opacity={tinted ? 0.55 : 1} />
              {kind === "light" && (
                <g transform={`translate(${x + 18},${y + 18})`}>
                  <circle r="7" fill="none" stroke="var(--accent)" strokeWidth="2" />
                  <path d="M 0 -11 L 0 -8 M 0 11 L 0 8 M -11 0 L -8 0 M 11 0 L 8 0" stroke="var(--accent)" strokeWidth="2" />
                </g>
              )}
            </g>
          );
        })
      )}
      {/* building footprint outline (3 cells) */}
      <rect x={ox + cell * 2} y={oy} width={cell * 2 - 4} height={cell - 4} rx="4" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <rect x={ox + cell * 2} y={oy + cell} width={cell - 4} height={cell - 4} rx="4" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <text x={ox + cell * 2 + 30} y={oy + 24} fill="var(--ink)" fontSize="10" fontWeight="700" textAnchor="middle">bldg</text>

      <text x="20" y="212" fill="var(--ink)" fontSize="10.5" fontWeight="600">A streetlight lights the 4 spaces around it (not diagonals).</text>
      <text x="20" y="226" fill="var(--ink-soft)" fontSize="10.5">Each building scores its size × the streetlights shining on it.</text>
    </svg>
  );
}
