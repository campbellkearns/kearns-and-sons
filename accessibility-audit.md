# Accessibility Audit Report — Kearns & Sons
**Standard:** WCAG 2.1 AAA
**Date:** March 16, 2026
**Scope:** Frontend source code — layout, navigation, pages, components, forms, media

---

## Executive Summary

The application has a solid foundation — semantic HTML is used in many places, Radix UI components provide built-in ARIA behaviors, form labels are properly associated with inputs, and `lang="en"` is declared on the root element. However, a number of issues at Level A, AA, and AAA would need to be resolved before claiming AAA conformance. The most critical gaps are the absence of a skip navigation link, missing `<main>` landmark, video autoplay without a pause mechanism, and form error states that are not surfaced to assistive technology.

---

## Critical Issues (Level A Failures)

### 1. No Skip Navigation Link
**File:** `src/app/(frontend)/layout.tsx`
**WCAG:** 2.4.1 Bypass Blocks (A)

There is no "Skip to main content" link at the top of the page. Keyboard and screen reader users must tab through the entire header navigation on every page load before reaching the main content. This is a fundamental Level A failure.

---

### 2. No `<main>` Landmark
**Files:** `src/app/(frontend)/layout.tsx`, all page components
**WCAG:** 1.3.1 Info and Relationships (A), 2.4.1 Bypass Blocks (A)

The layout renders `<Header />`, `{children}`, and `<Footer />` directly inside `<body>` with no `<main>` wrapper. Page-level content (e.g., the `<article>` in the memorial page) is the outermost element. Without a `<main>` landmark, screen reader users cannot jump directly to the primary content via landmark navigation. ARIA landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) are essential to AAA conformance.

---

### 3. Video Autoplay with No Pause Mechanism
**File:** `src/components/Media/VideoMedia/index.tsx:31–40`
**WCAG:** 2.2.2 Pause, Stop, Hide (A)

Videos render with `autoPlay`, `loop`, `muted`, and explicitly `controls={false}`. There is no mechanism for the user to pause or stop the video. Any auto-playing content that lasts more than 3 seconds must provide a pause/stop control. This is a Level A failure and a barrier for users with vestibular disorders and attention difficulties.

---

### 4. Form Error Messages Not Programmatically Associated
**File:** `src/components/Comments/CommentForm/index.tsx:194–220`
**WCAG:** 1.3.1 Info and Relationships (A), 3.3.1 Error Identification (A)

Inline validation error messages (e.g., "Name is required") are rendered as sibling `<p>` tags below their inputs, but inputs do not have `aria-describedby` pointing to those error messages. Screen reader users will not hear the error text when focusing the field. Additionally, no `aria-invalid="true"` is set on inputs in an error state.

---

### 5. General Error Has No Live Region
**File:** `src/components/Comments/CommentForm/index.tsx:177–181`
**WCAG:** 4.1.3 Status Messages (AA), 3.3.1 Error Identification (A)

The general submission error container (`errors.general`) has no `role="alert"` or `aria-live="assertive"`. When a submission fails, screen readers will not announce the error because focus is not moved to the error and no live region broadcasts it.

---

## Significant Issues (Level AA Failures)

### 6. Multiple Unlabeled `<nav>` Landmarks
**Files:** `src/Header/Nav/index.tsx:14`, `src/Footer/Component.tsx:25`
**WCAG:** 2.4.6 Headings and Labels (AA), best practice per ARIA Landmarks

The page contains two `<nav>` elements — one in the header, one in the footer — with no distinguishing `aria-label`. Screen reader users who navigate by landmarks will encounter two identical "navigation" regions with no way to differentiate them. Each should have a unique label (e.g., `aria-label="Primary"` and `aria-label="Footer"`).

---

### 7. Logo Links Have No Descriptive Accessible Name
**Files:** `src/Header/Component.client.tsx:36–38`, `src/Footer/Component.tsx:19`
**WCAG:** 2.4.4 Link Purpose (In Context) (A), 2.4.9 Link Purpose (Link Only) (AAA)

Both the header and footer logo links wrap the `<Logo>` component but carry no `aria-label`. The Logo image has `alt="Kearns & Sons Logo Marker"` — "Logo Marker" describes the image asset, not the link destination. The accessible name of both links is effectively "Kearns & Sons Logo Marker", not "Kearns & Sons – Home". This fails 2.4.9 (AAA) which requires link purpose to be determinable from the link text alone.

---

### 8. `<section>` Elements Used as Nav Group Wrappers
**File:** `src/Header/Nav/index.tsx:15, 20`
**WCAG:** 1.3.1 Info and Relationships (A)

Navigation items are wrapped in `<section>` elements rather than `<ul>/<li>` lists or semantically neutral `<div>` wrappers. `<section>` implies a standalone thematic region and should have an accessible name (per HTML spec). Using sections without names creates implicit, unnamed landmark regions that clutter screen reader landmark menus. Navigation link groups should use `<ul>/<li>` or plain `<div>`.

---

### 9. Video Missing Captions and Text Alternative
**File:** `src/components/Media/VideoMedia/index.tsx`
**WCAG:** 1.2.2 Captions (Prerecorded) (A), 1.2.3 Audio Description (A), 1.2.8 Media Alternative (AAA)

The `<video>` element has no `<track>` element for captions or descriptions. There is also no `title` or `aria-label` to identify what the video contains. For AAA, WCAG 1.2.8 requires a full text alternative (media alternative) for all prerecorded synchronized media, and 1.2.6 requires sign language interpretation.

---

### 10. Form Success State Has No Focus Management
**File:** `src/components/Comments/CommentForm/index.tsx:156–167`
**WCAG:** 4.1.3 Status Messages (AA)

When the form submits successfully, the form is replaced by a success `<div>`. No focus is programmatically moved to the confirmation message and there is no `role="status"` or `aria-live` on the success container. Screen reader users will not be informed that submission succeeded. The 5-second auto-dismiss of the success state compounds this by silently removing content.

---

### 11. Character Counter Has No Live Region
**File:** `src/components/Comments/CommentForm/index.tsx:255–257`
**WCAG:** 4.1.3 Status Messages (AA)

The `{formData.content.length}/500 characters` counter updates dynamically but has no `aria-live` region. Screen reader users typing in the textarea receive no feedback about how much of the limit they have used.

---

### 12. Pagination Uses Click Handlers Without Verifying Keyboard/Href Support
**File:** `src/components/Pagination/index.tsx`
**WCAG:** 2.1.1 Keyboard (A), 2.4.3 Focus Order (A)

All pagination navigation uses `onClick` with `router.push()`. If the underlying `PaginationLink`, `PaginationPrevious`, or `PaginationNext` components from `src/components/ui/pagination.tsx` render as `<span>` or `<div>` rather than `<a>` or `<button>`, they would not be keyboard focusable. Additionally, the `disabled` prop passed to `PaginationPrevious`/`PaginationNext` may not map to a proper `disabled` or `aria-disabled` attribute on the rendered element.

---

## AAA-Specific Issues

### 13. Links Opening in New Tab Without Warning
**File:** `src/components/Link/index.tsx:46`
**WCAG:** 3.2.5 Change on Request (AAA)

When `newTab` is true, links open in a new window with no textual or icon-based warning to the user. At AAA level, changes of context (including opening a new window) must be initiated only by user request, and users must be informed before the change occurs. A visually hidden "(opens in new tab)" span or an icon with equivalent screen reader text is needed.

---

### 14. `text-muted-foreground` on Functional Headings May Fail 7:1 Contrast
**Files:** `src/components/ServiceDetails/index.tsx:44, 53, 63`
**WCAG:** 1.4.6 Contrast (Enhanced) (AAA)

The `<h3>` labels for Service, Viewing, and Internment sections use `text-muted-foreground` styling to appear subdued. At AAA level, all normal-sized text requires a 7:1 contrast ratio against its background. Depending on the resolved CSS variable value for `--muted-foreground`, these headings may fail. This also requires testing across both light and dark themes.

Similarly, category labels in `PostHero` (`uppercase text-sm`) rendered in white over a gradient-to-transparent overlay on a variable hero image background could fail in some hero image configurations.

---

### 15. Touch Target Sizes
**Files:** `src/components/ui/button.tsx`, nav link items
**WCAG:** 2.5.5 Target Size (AAA)

AAA requires interactive touch targets to be at least 44×44 CSS pixels. The `size="sm"` button variant (`h-9 = 36px`) and navigation links (no explicit height set, relying on `py-8` container padding) may fall short. Nav links rendered via `<CMSLink appearance="link">` resolve to `size="clear"` buttons with no height constraints.

---

### 16. No Extended Audio Description for Video (AAA)
**File:** `src/components/Media/VideoMedia/index.tsx`
**WCAG:** 1.2.7 Extended Audio Description (AAA)

Where pauses in audio are insufficient for audio descriptions, extended audio descriptions are required at AAA. No mechanism exists in the current video component to support this.

---

### 17. Heading Semantics for Sub-Labels
**File:** `src/components/ServiceDetails/index.tsx:44, 53, 63`
**WCAG:** 1.3.1 Info and Relationships (A)

"Service", "Viewing", and "Internment" are rendered as `<h3>` elements styled to look like muted category labels. These are not conceptually section headings — they're label/value pairs. Using heading elements for labels that visually resemble captions creates a misleading document outline. These would be better expressed as `<dt>/<dd>` in a `<dl>` (definition list), which semantically conveys label-value relationships without polluting the heading hierarchy.

---

## Minor / Advisory Notes

- **`sr-only` End-of-comment marker** (`Comment/index.tsx:46–48`): The `sr-only` "End of condolence from..." text is thoughtful but the pattern is unusual and may confuse screen reader users expecting to navigate by items, not by explicit "end of" markers. ARIA list semantics (already used via `role="list"`) are sufficient.

- **Metadata twitter handle** (`layout.tsx:50`): `creator: '@payloadcms'` is a Payload CMS template default and should be updated to the actual site's Twitter/X handle.

- **`PostHero` used for Memorials**: `PostHero` references "Author" and "Date Published" labels, which are semantically mismatched for memorial pages. "Date Published" is inherited from the Post hero and does not reflect "Date of Passing" or "Date of Service", which could be confusing.

---

## Summary Table

| # | Issue | Component | WCAG Level | Criteria |
|---|-------|-----------|------------|----------|
| 1 | No skip navigation link | layout.tsx | A | 2.4.1 |
| 2 | No `<main>` landmark | layout.tsx | A | 2.4.1 |
| 3 | Video autoplay, no pause control | VideoMedia | A | 2.2.2 |
| 4 | Error messages not linked to inputs | CommentForm | A | 1.3.1, 3.3.1 |
| 5 | General error not announced | CommentForm | A | 4.1.3 |
| 6 | Multiple unlabeled `<nav>` elements | Header/Nav, Footer | AA | 2.4.6 |
| 7 | Logo links lack descriptive names | Header, Footer | AAA | 2.4.9 |
| 8 | `<section>` misused in nav | HeaderNav | A | 1.3.1 |
| 9 | Video missing captions/tracks | VideoMedia | A–AAA | 1.2.2, 1.2.6–1.2.8 |
| 10 | Success state not announced | CommentForm | AA | 4.1.3 |
| 11 | Character counter not live | CommentForm | AA | 4.1.3 |
| 12 | Pagination keyboard support unverified | Pagination | A | 2.1.1 |
| 13 | New tab links no warning | CMSLink | AAA | 3.2.5 |
| 14 | Muted text may fail 7:1 contrast | ServiceDetails | AAA | 1.4.6 |
| 15 | Touch targets may be under 44px | Button, nav links | AAA | 2.5.5 |
| 16 | No extended audio description | VideoMedia | AAA | 1.2.7 |
| 17 | Sub-labels use heading elements | ServiceDetails | A | 1.3.1 |

---

The most impactful remediation path toward AAA would be: skip link + `<main>` landmark first (structural foundation), then form error/live region announcements, then video controls, and finally the AAA-specific items around contrast, link naming, and new-tab warnings.

---

## Automated Scan Results (2026-03-23)

**Tools:** axe-core 4.8.4 (runtime) + eslint-plugin-jsx-a11y (static)
**Standards:** WCAG 2.1 Level AA + Best Practices
**Pages scanned:** `/`, `/posts`, `/memorials`, `/search`

### Runtime Violations (axe-core)

| Page       | Violations | Passes | Worst Impact |
|------------|-----------|--------|--------------|
| /          | 1         | 29     | serious      |
| /posts     | 1         | 28     | serious      |
| /memorials | 1         | 28     | serious      |
| /search    | 1         | 28     | serious      |

#### `link-name` — Serious — All pages
Confirms issue #7 above. The header logo `<Link href="/">` renders as `<a href="/"></a>` with no accessible name — the Logo image `alt` text is not exposed to the link's accessible name calculation.

**Affected element:** `<a href="/"></a>` (`src/Header/Component.client.tsx:36`)

**Fix:**
```tsx
<Link href="/" aria-label="Kearns and Sons — home">
  <Logo loading="eager" priority="high" className="dark:invert-25" />
</Link>
```

### Static Violations (eslint-plugin-jsx-a11y)

#### `heading-has-content` — `src/components/ui/card.tsx:23`
The `CardTitle` component renders an `<h3>` that passes `{...props}` through with no enforcement that `children` is provided. Static analysis flags this as a potential empty heading. In practice it appears to always receive content, but the component has no TypeScript guard against accidental empty use.

**Assessment:** Likely a false positive in the current codebase, but consider adding `children: React.ReactNode` as a required prop type to prevent future regressions.
