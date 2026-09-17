# LIFT-115

This project contains two work-in-progress AR billing UI shells built with Aeroflow components and design tokens: a report selection screen (LIFT-115) and an interactive report table (LIFT-2).

## Current status

Both shells are accessible from the shared sidebar under **Applications**:

| Navigation item | Route | Purpose |
| --- | --- | --- |
| Billing Report (Lift 115) | `/` | Select report criteria. |
| Table Shell (Lift-2) | `/lift-2` | Explore the billing table with local mock data. |

The sidebar uses Next.js links, preserving its expanded/collapsed state during navigation between the shells. Each page has a shared header with a sidebar toggle. Settings-NA is a placeholder link (`#`).

### Report selection shell

The home page includes:

- Report type, patient number, and patient name controls.
- Payer representative and payer selectors.
- Search type options for primary AR, second/third AR, Masterlines, and expiring PAs and certifications.
- A Search button and collapsible application navigation.

Dropdowns use hardcoded sample options, including five real payer names with fake IDs. Search is not connected to a handler or backend, and does not populate or navigate to the table shell.

### Table shell

- Fifteen report data columns plus a radio-button selection column.
- Sortable data headers and drag handles for column reordering.
- Single-row selection through radio controls or row clicks, with selection and hover styling.
- A patient-number popover with placeholder explanatory content.
- Link-styled buttons for HCPC, denial codes 1–3, and RM1; null values display as an em dash.
- A full-width action panel with patient number/name inputs on the left and four action buttons on the right. Controls remain on one row and scroll horizontally when needed.
- A scrolling content area and a bottom footer showing the mock-data count and a Show/Hide Columns button.

The table reads its row type and sample records from `app/lift-2/mock-patients.tsx`. Its inputs, action buttons, and Show/Hide Columns button are currently presentation-only.

## Technology

- Next.js 16.3.4 with the App Router and React 19.2.8.
- TypeScript and Tailwind CSS 4.
- `@aeroflow/af-components` and `@aeroflow/design-tokens`, with the `utility` theme.
- Lucide icons.

See [package.json](./package.json) for dependency versions and scripts.

## Prerequisites

- Node.js compatible with Next.js and pnpm. This working environment uses Node.js 24.21.0; the repository does not pin a Node.js version.
- pnpm 11.21.0, as specified in `package.json`.
- AWS CLI and access to the private Aeroflow CodeArtifact repository.
- An authenticated AWS profile named `CodeArtifactRead-996147455950`, as required by the existing login script. Obtain profile setup instructions and repository access from your team before installing dependencies.

## Getting started

From the repository directory:

1. Configure and authenticate the required AWS profile using your team's process.
2. Configure npm registry authentication for the private packages:

   ```bash
   pnpm codeartifact:login
   ```

   This runs the AWS CLI login command defined in `package.json` for the `aeroflow` domain and repository in `us-east-1`, updating your local npm configuration. Repeat it when the registry authentication expires.

3. Install the locked dependencies:

   ```bash
   pnpm install --frozen-lockfile
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [localhost:3000](http://localhost:3000) for report selection, then choose **Table Shell (Lift-2)** in the sidebar or open [localhost:3000/lift-2](http://localhost:3000/lift-2) directly.

Private registry login and installation from a fresh checkout still need to be verified with valid team credentials.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server. |
| `pnpm build` | Create a production build. |
| `pnpm start` | Serve the production build; run `pnpm build` first. |
| `pnpm lint` | Run ESLint. |
| `pnpm codeartifact:login` | Configure registry authentication for Aeroflow packages. |

Run `pnpm lint` and `pnpm build` to check application changes. The repository does not currently define a test script. Deployment instructions are not yet documented for this project.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Report selection screen at `/`. |
| `app/lift-2/page.tsx` | Table shell, column definitions, selection state, popover, and action panel. |
| `app/lift-2/mock-patients.tsx` | Exported `Patient` type and local sample rows. |
| `app/layout.tsx` | Shared layout, metadata, theme provider, and navigation. |
| `app/globals.css` | Tailwind import for application utilities. |
| `components/page-header.tsx` | Shared page title and sidebar toggle. |
| `components/navigation/app-nav.tsx` | Sidebar branding and navigation links. |
| `next.config.ts` | Next.js configuration. |
| `pnpm-workspace.yaml` | pnpm workspace and dependency installation settings. |
| `pnpm-lock.yaml` | Locked dependency versions. |

## Development notes

- Edit mock records in `app/lift-2/mock-patients.tsx`; keep row IDs unique and represent missing values with `null`.
- Keep the Tailwind import in `app/globals.css`: the component stylesheet does not include every utility used by this app. Aeroflow token and component styles are imported in `app/layout.tsx`.
- Prefer theme utilities such as `bg-muted` and `bg-table-row-stripe` when matching component colors. The table's selection colors and footer background currently use fixed Tailwind colors.
- Column dragging previously produced a hydration warning on full browser refreshes (`DndDescribedBy-*` IDs differed between server and client), even while mouse dragging worked. Its resolution after library updates has not been verified; check direct page loads as well as client navigation when validating upgrades.

## Known limitations

- Both shells use local sample data; backend search, report generation, and integration between the screens are not implemented.
- Table action-panel inputs do not filter rows. All Remit, Patient Notes, AR History, Biller Note History, and Show/Hide Columns have no action handlers yet.
- HCPC, denial-code, and RM1 buttons do not open popups yet. The patient popover contains placeholder text, not fetched patient details.
- Dates are stored as display strings, so chronological sorting needs a date comparator or normalized date values.
- Table selection, column order, and visibility state are not persisted across page reloads.
- Settings is not implemented.
- Automated application tests are not configured.

Update this README when features, setup requirements, commands, or deployment procedures change. Keep planned work clearly distinguished from working features.
