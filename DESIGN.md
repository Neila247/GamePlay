# DESIGN.md — Onboard

> **Status: direction chosen — "The Manual".**
> The PoC greybox has been replaced by a committed identity: an editorial
> *instruction-manual* aesthetic — ink on warm paper, a real display/body type
> pairing (Outfit + Public Sans), and a four-colour signature drawn from the
> game world. The token **names** and component code are unchanged from the
> greybox; only the token **values**, the typefaces, and the Signature section
> moved. That separation is what made adopting a direction a config edit, not a
> rewrite — and a future re-skin works the same way.

## How this file is used

Every colour, type size, font, spacing step, radius, and shadow in the app
comes from a named token defined here and wired into the Tailwind theme /
CSS variables. Components reference token names only. See the styling
discipline section in `CLAUDE.md` — inline raw values are treated as bugs.

To re-skin later: edit the values in this file + the Tailwind config, pick real
typefaces, and revisit the "Signature" section. Done.

## Tokens

### Colour

Semantic names, not literal ones. A warm near-greyscale (paper + ink) carries
the whole UI; colour enters only through the signature spectrum (below). The
accent is **ink**, not a brand hue — in "The Manual", emphasis is weight and
contrast, the way a printed page works, not a coloured button.

| Token            | Value       | Role                                  |
|------------------|-------------|---------------------------------------|
| `--bg`           | `#FAFAF9`   | app background (warm paper)           |
| `--surface`      | `#FFFFFF`   | cards, sheets, raised surfaces        |
| `--surface-sunk` | `#F4F4F3`   | insets, wells, disabled fields        |
| `--border`       | `#E4E4E2`   | hairlines, dividers, input borders    |
| `--ink`          | `#1C1C1A`   | primary text                          |
| `--ink-soft`     | `#6B6B66`   | secondary text, captions              |
| `--accent`       | `#23211D`   | ink — primary actions, progress, focus|
| `--accent-ink`   | `#FFFFFF`   | text/icon on accent                   |
| `--warn`         | `#9A6B2F`   | the UNVERIFIED badge / cautions       |

**Card colours / signature spectrum.** These four are the app's signature (see
Signature, below) *and* the Dutch Blitz card colours — one set serving both. As
the signature they appear as the four-tab `Spine` mark; as game content they
colour the teaching diagrams. Constant across skins.

| Token            | Value       | Role                                  |
|------------------|-------------|---------------------------------------|
| `--card-red`     | `#C0443B`   | signature tab 1 · Dutch Blitz red     |
| `--card-blue`    | `#2F6DB0`   | signature tab 2 · Dutch Blitz blue    |
| `--card-yellow`  | `#D9A521`   | signature tab 3 · Dutch Blitz yellow  |
| `--card-green`   | `#3E8E5A`   | signature tab 4 · Dutch Blitz green   |
| `--card-orange`  | `#CF7A33`   | diagrams only (Kites/Paris) — not signature |
| `--card-purple`  | `#7A4F9E`   | diagrams only (Kites) — not signature |

> The accent stays ink on purpose. Colour belongs to the signature spectrum,
> not to controls — keep buttons, progress, and focus in ink so the four
> colours stay special wherever they appear.

### Type

A real display/body pairing, loaded from Google Fonts in `index.css`. **Outfit**
(geometric, confident) sets headings and the signature; **Public Sans** (a US
government typeface — literally the voice of official manuals and forms) carries
body and UI. The pairing is deliberately un-Inter: it reads as printed
documentation, not as a generic SaaS dashboard.

| Token            | Value                                       | Role        |
|------------------|---------------------------------------------|-------------|
| `--font-display` | `'Outfit'`, system-ui fallback              | headings    |
| `--font-body`    | `'Public Sans'`, system-ui fallback         | body, UI    |
| `--font-mono`    | ui-monospace stack                          | data, codes |

Type scale (rem), with intentional steps — don't invent sizes outside it:

`--text-xs .75` · `--text-sm .875` · `--text-base 1` · `--text-lg 1.25`
· `--text-xl 1.5` · `--text-2xl 2` · `--text-3xl 2.5`

Weights: `--weight-normal 400`, `--weight-medium 500`, `--weight-bold 700`.

### Spacing

One rhythm, multiples of 4px. Use steps, never arbitrary px.

`--space-1 4px` · `--space-2 8px` · `--space-3 12px` · `--space-4 16px`
· `--space-6 24px` · `--space-8 32px` · `--space-12 48px` · `--space-16 64px`

### Radius

| Token            | Value     | Role                       |
|------------------|-----------|----------------------------|
| `--radius-sm`    | `6px`     | inputs, small controls     |
| `--radius-card`  | `10px`    | cards, sheets              |
| `--radius-pill`  | `999px`   | pills, badges, the Spine tabs |

### Elevation / shadow

Minimal — one soft shadow, used sparingly. Depth comes from hairline borders on
paper, not from glow.

| Token         | Value                              | Role            |
|---------------|------------------------------------|-----------------|
| `--shadow-1`  | `0 1px 2px rgba(0,0,0,.06)`        | raised surfaces |

### Motion

| Token            | Value                  | Role                     |
|------------------|------------------------|--------------------------|
| `--ease`         | `cubic-bezier(.2,.0,.0,1)` | standard easing      |
| `--dur-fast`     | `120ms`                | taps, toggles            |
| `--dur-base`     | `200ms`                | transitions, reveals     |

Respect `prefers-reduced-motion` everywhere. Keep motion functional only (state
changes) — no ambient/decorative animation.

## Tailwind wiring (sketch)

Map tokens into the theme so components use class names, not values:

```js
// tailwind.config.js (sketch)
theme: {
  extend: {
    colors: {
      bg: 'var(--bg)', surface: 'var(--surface)', 'surface-sunk': 'var(--surface-sunk)',
      border: 'var(--border)', ink: 'var(--ink)', 'ink-soft': 'var(--ink-soft)',
      accent: 'var(--accent)', 'accent-ink': 'var(--accent-ink)', warn: 'var(--warn)',
    },
    borderRadius: { sm: 'var(--radius-sm)', card: 'var(--radius-card)', pill: 'var(--radius-pill)' },
    fontFamily: { display: 'var(--font-display)', body: 'var(--font-body)', mono: 'var(--font-mono)' },
    boxShadow: { 1: 'var(--shadow-1)' },
  }
}
```

Define the `--*` variables in a single `:root` block (e.g. `tokens.css`). That
one file is the re-skin surface.

## Avoid list (the AI tells)

These survive the re-skin — keep steering away from them regardless of
direction. AI-generated UI clusters here:

- Violet/indigo→pink gradients; gradient "blob" backgrounds.
- Glassmorphism / heavy blur / frosted cards.
- Inter (or Geist) as the default everything-font.
- Everything at the same big border-radius; pill-shaped everything.
- Emoji used as interface icons.
- Centered hero with a gradient headline and three feature cards below.
- Drop shadows on every element; uniform glow.
- Decorative numbered markers (01 / 02 / 03) where nothing is actually a sequence.
- Copy that sells instead of guiding ("Unlock the magic of…").

## Signature — the four-colour Spine

The one memorable element: a **four-tab colour mark** in red / blue / yellow /
green — the Dutch Blitz card spectrum, reused as the app's brand. It reads like
the colour-coded tabs down the edge of a printed manual, tying "The Manual"
concept to the game world it teaches. Implemented once as `src/components/Spine.tsx`
and used in two forms:

- **`bar`** — four short tabs under a top-level title (Home, Rules header).
- **`rule`** — four equal segments spanning a width, as a coloured divider or a
  figure-plate header in the guided session.

Rules for keeping it special:

- **One signature, kept quiet around it.** The Spine appears at page titles,
  on figure plates, and on the "you've learned it" finish — not on every
  section. Everywhere else stays ink-on-paper.
- **Controls never borrow the colours.** Buttons, progress, and focus stay ink
  (see Colour). The four colours mean "this is the game world," nothing else.
- The colours are fixed game content, so the Spine survives a re-skin even as
  the paper/ink tokens change around it.

## Copy voice

- Plain verbs, sentence case, no filler. Name things by what the user controls.
- Buttons say what happens: "Start setup", not "Submit". Keep the same word
  through a flow (a "Blitz!" prompt stays "Blitz!", not "Finish").
- Empty states invite action; errors say what went wrong and how to fix it, in
  the interface's voice — never an apology, never vague.
