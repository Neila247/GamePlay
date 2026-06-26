// Sushi Go! — the draft: pick one card, pass the rest, build a plate of dishes.
export function SushiGoDraft() {
  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Sushi Go — pick one card from your hand, pass the rest to the left, and collect scoring dishes">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">DRAFT: PICK 1, PASS THE REST</text>

      {/* hand fan */}
      <text x="20" y="44" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">YOUR HAND</text>
      {[
        { c: "var(--card-green)" }, { c: "var(--card-red)" }, { c: "var(--card-blue)" }, { c: "var(--card-yellow)" },
      ].map((card, i) => (
        <g key={i} transform={`translate(${20 + i * 40},52) rotate(${(i - 1.5) * 4})`}>
          <rect width="44" height="60" rx="6" fill="var(--surface)" stroke={i === 0 ? "var(--accent)" : "var(--border)"} strokeWidth={i === 0 ? 2 : 1} />
          <circle cx="22" cy="26" r="9" fill={card.c} opacity="0.85" />
          {i === 0 && <text x="22" y="52" fill="var(--accent)" fontSize="8" fontWeight="700" textAnchor="middle">keep</text>}
        </g>
      ))}

      {/* pass arrow */}
      <path d="M 200 80 C 240 70, 270 70, 300 80" stroke="var(--ink-soft)" strokeWidth="1.5" fill="none" />
      <path d="M 300 80 l -8 -3 l 1 8 Z" fill="var(--ink-soft)" />
      <text x="250" y="60" fill="var(--ink)" fontSize="10" fontWeight="600" textAnchor="middle">pass left</text>

      {/* plate of dishes */}
      <text x="20" y="146" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">YOUR PLATE (scores at round end)</text>
      {[
        { l: "maki", c: "var(--card-blue)" }, { l: "nigiri", c: "var(--card-red)" }, { l: "tempura", c: "var(--card-yellow)" }, { l: "wasabi", c: "var(--card-green)" },
      ].map((d, i) => (
        <g key={i} transform={`translate(${20 + i * 84},156)`}>
          <rect width="74" height="40" rx="6" fill="var(--surface-sunk)" stroke="var(--border)" />
          <circle cx="16" cy="20" r="7" fill={d.c} />
          <text x="44" y="24" fill="var(--ink)" fontSize="9" textAnchor="middle">{d.l}</text>
        </g>
      ))}

      <text x="20" y="220" fill="var(--ink-soft)" fontSize="10.5">3 rounds. Sets of dishes score; puddings wait for the end.</text>
    </svg>
  );
}
