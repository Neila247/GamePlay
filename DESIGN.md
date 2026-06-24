# DESIGN.md — Onboard

> **Status: PoC neutral skin. Direction not yet chosen.**
> This file defines the *structure* of the design system and fills it with
> plain, unopinionated defaults so the PoC looks clean without committing to a
> visual identity. When a direction is chosen later, swap the token **values**
> below and update the typefaces — the token **names** and the component code
> never change. That's what makes the re-skin a config edit, not a rewrite.

## How this file is used

Every colour, type size, font, spacing step, radius, and shadow in the app
comes from a named token defined here and wired into the Tailwind theme /
CSS variables. Components reference token names only. See the styling
discipline section in `CLAUDE.md` — inline raw values are treated as bugs.

To re-skin later: edit the values in this file + the Tailwind config, pick real
typefaces, and revisit the "Signature" section. Done.

## Tokens (PoC neutral defaults)

### Colour

Semantic names, not literal ones. A near-greyscale set plus one restrained,
muted accent. Deliberately quiet — this should read as "not styled yet."

| Token            | PoC value   | Role                                  |
|------------------|-------------|---------------------------------------|
| `--bg`           | `#FAFAF9`   | app background                        |
| `--surface`      | `#FFFFFF`   | cards, sheets, raised surfaces        |
| `--surface-sunk` | `#F4F4F3`   | insets, wells, disabled fields        |
| `--border`       | `#E4E4E2`   | hairlines, dividers, input borders    |
| `--ink`          | `#1C1C1A`   | primary text                          |
| `--ink-soft`     | `#6B6B66`   | secondary text, captions              |
| `--accent`       | `#3A3A38`   | primary actions (muted on purpose)    |
| `--accent-ink`   | `#FFFFFF`   | text/icon on accent                   |
| `--warn`         | `#9A6B2F`   | the UNVERIFIED badge / cautions       |

**Card colours** — game content, not brand. Used only in teaching diagrams.
These represent the four Dutch Blitz card colours and stay constant across skins.

| Token            | PoC value   | Role                                  |
|------------------|-------------|---------------------------------------|
| `--card-red`     | `#C0443B`   | Dutch Blitz red card header           |
| `--card-blue`    | `#2F6DB0`   | Dutch Blitz blue card header          |
| `--card-yellow`  | `#D9A521`   | Dutch Blitz yellow card header        |
| `--card-green`   | `#3E8E5A`   | Dutch Blitz green card header         |

> The accent is intentionally a near-charcoal, not a brand colour. When you
> pick a direction, this is the first value to change.

### Type

PoC uses a **system font stack on purpose** — it signals "greybox," costs
nothing, and avoids defaulting to Inter (the classic AI tell). Committing a
direction = replacing these with a real display/body pairing.

| Token            | PoC value                                   | Role        |
|------------------|---------------------------------------------|-------------|
| `--font-display` | system-ui stack (placeholder)               | headings    |
| `--font-body`    | system-ui stack (placeholder)               | body, UI    |
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

| Token            | PoC value | Role                       |
|------------------|-----------|----------------------------|
| `--radius-sm`    | `6px`     | inputs, small controls     |
| `--radius-card`  | `10px`    | cards, sheets              |
| `--radius-pill`  | `999px`   | pills, badges              |

### Elevation / shadow

Keep it minimal in the PoC — one soft shadow, used sparingly.

| Token         | PoC value                          | Role            |
|---------------|------------------------------------|-----------------|
| `--shadow-1`  | `0 1px 2px rgba(0,0,0,.06)`        | raised surfaces |

### Motion

| Token            | PoC value              | Role                     |
|------------------|------------------------|--------------------------|
| `--ease`         | `cubic-bezier(.2,.0,.0,1)` | standard easing      |
| `--dur-fast`     | `120ms`                | taps, toggles            |
| `--dur-base`     | `200ms`                | transitions, reveals     |

Respect `prefers-reduced-motion` everywhere. In the PoC, keep motion functional
only (state changes) — no ambient/decorative animation yet.

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

## Signature (placeholder)

> The one memorable element the app is remembered by. **Deliberately left blank
> for the PoC.** When a direction is chosen, define exactly one signature here
> and keep everything around it quiet. (For Dutch Blitz, the game's own world —
> Pennsylvania-Dutch folk art, the boy/girl card faces, the four pile types as
> a tactile layout — is a strong, non-generic well to draw the signature from.)

## Copy voice (applies even in the PoC)

- Plain verbs, sentence case, no filler. Name things by what the user controls.
- Buttons say what happens: "Start setup", not "Submit". Keep the same word
  through a flow (a "Blitz!" prompt stays "Blitz!", not "Finish").
- Empty states invite action; errors say what went wrong and how to fix it, in
  the interface's voice — never an apology, never vague.
