# LIFT-115

LIFT-115 is a work-in-progress AR billing report interface. It provides controls for selecting reports by patient, payer representative, or payer, using Aeroflow UI components and design tokens.

## Current status

The home page includes:

- Report type, patient number, and patient name controls.
- Payer representative and payer selectors.
- Search type options for primary AR, second/third AR, Masterlines, and expiring PAs and certifications.
- A Search button and collapsible application navigation.

The interface is currently a UI prototype. Dropdown options are placeholders, and the Search button is not connected to a search handler or report backend. Claims and Settings navigation links point to `/1` and `/2`, which do not have implemented pages.

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

5. Open [localhost:3000](http://localhost:3000). Edit `app/page.tsx` to update the report selection screen.

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
| `app/layout.tsx` | Shared layout, metadata, theme provider, and navigation. |
| `app/globals.css` | Global styles. |
| `components/navigation/app-nav.tsx` | Sidebar branding and navigation links. |
| `next.config.ts` | Next.js configuration. |
| `pnpm-workspace.yaml` | pnpm workspace and dependency installation settings. |
| `pnpm-lock.yaml` | Locked dependency versions. |

## Known limitations

- Patient, payer, and report dropdowns use placeholder data.
- Search, report generation, and results display are not implemented.
- Claims and Settings pages are not implemented.
- Automated application tests are not configured.

Update this README when features, setup requirements, commands, or deployment procedures change. Keep planned work clearly distinguished from working features.
