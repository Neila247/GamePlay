export function CardSequence() {
  return (
    <svg
      viewBox="0 0 380 470"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      width="100%"
      style={{ display: "block" }}
      role="img"
      aria-label="Card anatomy and the two sequence rules: centre piles build up same colour; Post Piles build down alternating boy and girl"
    >
      <defs>
        <g id="cs-figure" fill="var(--ink)">
          <circle cx="0" cy="0" r="4.2" />
          <path d="M -6 10 a 6 6 0 0 1 12 0 Z" />
        </g>
        <marker id="cs-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1 L 6 5 L 0 9 Z" fill="var(--ink-soft)" />
        </marker>
      </defs>

      {/* CARD ANATOMY */}
      <text x="20" y="30" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">A CARD</text>

      {/* Enlarged card */}
      <g transform="translate(24,44)">
        <rect width="92" height="124" rx="10" fill="var(--surface)" stroke="var(--border)" />
        <rect width="92" height="22" rx="10" fill="var(--card-blue)" />
        <rect y="11" width="92" height="11" fill="var(--card-blue)" />
        <text x="12" y="62" fill="var(--ink)" fontSize="34" fontWeight="700">5</text>
        <use href="#cs-figure" x="66" y="98" />
      </g>

      {/* Callouts */}
      <line x1="120" y1="56" x2="150" y2="50" stroke="var(--border)" strokeWidth="1.5" />
      <text x="156" y="48" fill="var(--ink)" fontSize="11.5" fontWeight="600">Colour</text>
      <text x="156" y="63" fill="var(--ink-soft)" fontSize="10.5">red · blue · yellow · green</text>

      <line x1="84" y1="104" x2="150" y2="104" stroke="var(--border)" strokeWidth="1.5" />
      <text x="156" y="100" fill="var(--ink)" fontSize="11.5" fontWeight="600">Number 1–10</text>
      <text x="156" y="115" fill="var(--ink-soft)" fontSize="10.5">tells you where it can go</text>

      <line x1="100" y1="142" x2="150" y2="150" stroke="var(--border)" strokeWidth="1.5" />
      <text x="156" y="148" fill="var(--ink)" fontSize="11.5" fontWeight="600">Boy or girl</text>
      <text x="156" y="163" fill="var(--ink-soft)" fontSize="10.5">red/blue = boy, yellow/green = girl</text>

      <line x1="20" y1="196" x2="360" y2="196" stroke="var(--border)" strokeWidth="1" />

      {/* CENTRE PILE: ASCENDING */}
      <text x="20" y="224" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">CENTRE PILE — BUILD UP, SAME COLOUR</text>

      {/* 1 → 2 → 3, all blue */}
      <g transform="translate(28,236)">
        <rect width="50" height="68" rx="7" fill="var(--surface)" stroke="var(--border)" />
        <rect width="50" height="13" rx="7" fill="var(--card-blue)" />
        <rect y="6" width="50" height="7" fill="var(--card-blue)" />
        <text x="7" y="40" fill="var(--ink)" fontSize="20" fontWeight="700">1</text>
      </g>
      <line x1="86" y1="270" x2="108" y2="270" stroke="var(--ink-soft)" strokeWidth="1.5" markerEnd="url(#cs-arr)" />
      <g transform="translate(112,236)">
        <rect width="50" height="68" rx="7" fill="var(--surface)" stroke="var(--border)" />
        <rect width="50" height="13" rx="7" fill="var(--card-blue)" />
        <rect y="6" width="50" height="7" fill="var(--card-blue)" />
        <text x="7" y="40" fill="var(--ink)" fontSize="20" fontWeight="700">2</text>
      </g>
      <line x1="170" y1="270" x2="192" y2="270" stroke="var(--ink-soft)" strokeWidth="1.5" markerEnd="url(#cs-arr)" />
      <g transform="translate(196,236)">
        <rect width="50" height="68" rx="7" fill="var(--surface)" stroke="var(--border)" />
        <rect width="50" height="13" rx="7" fill="var(--card-blue)" />
        <rect y="6" width="50" height="7" fill="var(--card-blue)" />
        <text x="7" y="40" fill="var(--ink)" fontSize="20" fontWeight="700">3</text>
      </g>
      <text x="262" y="266" fill="var(--ink-soft)" fontSize="11">colour stays</text>
      <text x="262" y="281" fill="var(--ink-soft)" fontSize="11">the same,</text>
      <text x="262" y="296" fill="var(--ink-soft)" fontSize="11">number goes up</text>

      <line x1="20" y1="328" x2="360" y2="328" stroke="var(--border)" strokeWidth="1" />

      {/* POST PILE: DESCENDING + ALTERNATE */}
      <text x="20" y="356" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">POST PILE — BUILD DOWN, ALTERNATE</text>

      {/* 8 red(boy) → 7 yellow(girl) → 6 blue(boy) */}
      <g transform="translate(28,368)">
        <rect width="50" height="68" rx="7" fill="var(--surface)" stroke="var(--border)" />
        <rect width="50" height="13" rx="7" fill="var(--card-red)" />
        <rect y="6" width="50" height="7" fill="var(--card-red)" />
        <text x="7" y="40" fill="var(--ink)" fontSize="20" fontWeight="700">8</text>
        <use href="#cs-figure" x="38" y="56" />
      </g>
      <line x1="86" y1="402" x2="108" y2="402" stroke="var(--ink-soft)" strokeWidth="1.5" markerEnd="url(#cs-arr)" />
      <g transform="translate(112,368)">
        <rect width="50" height="68" rx="7" fill="var(--surface)" stroke="var(--border)" />
        <rect width="50" height="13" rx="7" fill="var(--card-yellow)" />
        <rect y="6" width="50" height="7" fill="var(--card-yellow)" />
        <text x="7" y="40" fill="var(--ink)" fontSize="20" fontWeight="700">7</text>
        <use href="#cs-figure" x="38" y="56" />
      </g>
      <line x1="170" y1="402" x2="192" y2="402" stroke="var(--ink-soft)" strokeWidth="1.5" markerEnd="url(#cs-arr)" />
      <g transform="translate(196,368)">
        <rect width="50" height="68" rx="7" fill="var(--surface)" stroke="var(--border)" />
        <rect width="50" height="13" rx="7" fill="var(--card-blue)" />
        <rect y="6" width="50" height="7" fill="var(--card-blue)" />
        <text x="7" y="40" fill="var(--ink)" fontSize="20" fontWeight="700">6</text>
        <use href="#cs-figure" x="38" y="56" />
      </g>
      <text x="262" y="392" fill="var(--ink-soft)" fontSize="11">number goes</text>
      <text x="262" y="407" fill="var(--ink-soft)" fontSize="11">down, and</text>
      <text x="262" y="422" fill="var(--ink-soft)" fontSize="11">boy/girl flips</text>
    </svg>
  );
}
