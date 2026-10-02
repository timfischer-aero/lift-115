# AR Billing Report Project Structure Proposal

I recommend a feature-based structure, with Next.js routes kept small and reusable patient functionality separated from the billing report itself.

Your answers are enough for a first proposal. The main detail to confirm later is how your company’s authentication process supplies the session and permissions to your application.

## Proposed frontend structure

Next.js defines conventions for route files such as `page.tsx` and `layout.tsx`, but leaves the rest of your organization flexible. The following is a project convention I recommend for your app. [1](https://nextjs.org/docs/app/getting-started/project-structure)

```text
src/
  app/
    layout.tsx
    providers.tsx
    globals.css

    (auth)/
      login/
        page.tsx

    (protected)/
      layout.tsx
      page.tsx
      search/
        page.tsx
      results/
        page.tsx

  components/
    layout/
      AppShell.tsx
      LeftNavigation.tsx
      PageTitleBar.tsx

  auth/
    AuthProvider.tsx
    useCurrentUser.ts
    permissions.ts
    auth.types.ts

  features/
    billing-report/
      search/
        SearchScreen.tsx
        components/
          SearchMethodOneForm.tsx
          SearchMethodTwoForm.tsx
        search.types.ts

      results/
        ResultsScreen.tsx
        components/
          BillingResultsTable.tsx
          billing-results.columns.tsx
          ResultsActionBar.tsx
          PatientPanelHost.tsx
        usePatientPanel.ts
        results.types.ts

      api/
        billing-report.api.ts
        billing-report.keys.ts
        billing-report.queries.ts

      billing-report.types.ts

    patients/
      demographics/
        DemographicsPanel.tsx
        demographics.api.ts
        demographics.queries.ts
        demographics.types.ts

      contact-preferences/
        ContactPreferencesPanel.tsx
        contact-preferences.api.ts
        contact-preferences.queries.ts

      notes/
        PatientNotesPanel.tsx
        notes.api.ts
        notes.queries.ts
        notes.types.ts

      actions/
        PatientActionsPanel.tsx
        actions.api.ts
        actions.queries.ts

      patient.keys.ts
      patient.types.ts

    doctors/
      search/
        DoctorSearch.tsx
        doctors.api.ts
        doctors.queries.ts
        doctors.types.ts

  lib/
    api/
      api-client.ts
      api-error.ts
      generated/
    query/
      QueryProvider.tsx

  config/
    env.ts
    navigation.ts
```

The search form names are placeholders until we know their business names. Also, this is a placement guide: create files as their functionality is implemented.

## Routes and shared layout

Keep each `page.tsx` focused on connecting a URL to its screen. Most implementation belongs in the corresponding feature.

| File | Responsibility |
| --- | --- |
| `app/layout.tsx` | Root HTML structure, global styling, application providers |
| `app/providers.tsx` | Composes client providers for authentication and TanStack Query |
| `app/(protected)/layout.tsx` | Shared authenticated application layout |
| `app/(protected)/page.tsx` | Redirects the application’s starting route to search |
| `app/(protected)/search/page.tsx` | Renders `SearchScreen` |
| `app/(protected)/results/page.tsx` | Renders `ResultsScreen` |
| `AppShell.tsx` | Positions the shared navigation and main content |
| `PageTitleBar.tsx` | Provides consistent title-bar styling; each screen supplies its title |

The parentheses make `(auth)` and `(protected)` route groups. They organize layouts without appearing in URLs, so your routes remain `/search` and `/results`. The name `(protected)` does not itself enforce authentication. [2](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)

Interactive screens, forms, and providers will be Client Components. You can keep route and layout files as Server Components where appropriate instead of marking the entire app `"use client"`.

## Where your larger components belong

Use the top-level `components/` folder for application-wide presentation, such as navigation and the shared title bar.

Put components with business responsibilities inside their feature:

| Component | Location and reason |
| --- | --- |
| Billing results table | `billing-report/results/` because its columns and behavior belong to this report |
| Floating results action bar | `billing-report/results/` because it coordinates report interactions |
| Demographics editor | `patients/demographics/` because other screens can reuse it |
| Patient notes | `patients/notes/` for the same reason |
| Doctor search | `doctors/search/` because it can serve multiple workflows |
| Drawer and panel switching | `PatientPanelHost.tsx` because the results screen controls which patient and panel are active |

These components import the necessary building blocks from AF-Components. You do not need local copies or wrappers for every button, textbox, or dropdown. Add a wrapper when it introduces meaningful application behavior.

For example, `DemographicsPanel` should receive a `patientId`; it should not need to know the billing table’s row format. That makes it easier to reuse later.

## User context and permissions

The `auth/` folder provides one place for the application to integrate with the company’s authentication process.

I would expose a small interface through `useCurrentUser()`:

- Current user’s ID and display information.
- Authentication status.
- App permissions.
- A helper such as `can("patient.demographics.edit")`.

Those permission names are illustrative; use your company’s actual model.

If the company package already provides a React provider and user hook, adapt or re-export those instead of maintaining a second copy of session state. Keep patient data and search results out of user context.

The frontend uses permissions to show, hide, or disable functionality. NestJS must independently validate authentication and enforce permissions on API requests. A shared layout or a hidden button is not sufficient protection. Next.js also cautions against relying solely on layout checks. [3](https://nextjs.org/docs/app/guides/authentication)

The exact login/callback routes and any server-only session helpers depend on your company’s integration. Treat `login/page.tsx` as provisional—it might simply initiate the existing sign-in flow.

## API functions and TanStack Query

Use a consistent division of responsibilities:

| File pattern | What belongs there |
| --- | --- |
| `api-client.ts` | Shared request handling: base URL, authentication integration, response parsing, common errors |
| `*.api.ts` | Plain async functions that call NestJS endpoints |
| `*.keys.ts` | Consistent TanStack Query cache keys |
| `*.queries.ts` | Query and mutation hooks, cache updates, and invalidation |

For example:

```text
demographics.api.ts
  getDemographics(patientId)
  updateDemographics(patientId, changes)

demographics.queries.ts
  useDemographics(patientId)
  useUpdateDemographics()
```

This gives you predictable places to look: endpoint changes go in `.api.ts`; loading, caching, and save behavior go in `.queries.ts`.

Both search methods should produce an explicit search request containing the method and its criteria. Include those inputs—and pagination, sorting, or filters that affect the response—in the results query key. TanStack Query uses these keys to distinguish cached datasets. [4](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)

For saves, my initial recommendation is:

1. Submit the update immediately.
2. Show the saving state.
3. Apply the successful server response to the relevant patient cache.
4. Invalidate affected report results and other patient queries so they refresh.

TanStack Query supports invalidating related queries when a mutation succeeds. The exact affected queries depend on what changed; editing demographics may affect more views than adding a note. [5](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)

This assumes “immediate” means saving without a later batch submission. Whether saving happens on an explicit Save button or automatically on field changes is a separate interaction decision.

## Selected patient and panel state

Keep this state within the results feature. A small `usePatientPanel` hook can expose shared actions used by the table, dropdown, action bar, and panels:

```typescript
type PatientPanel =
  | "demographics"
  | "contactPreferences"
  | "notes"
  | "actions"
  | "doctorSearch";

type PatientPanelState = {
  selectedPatientId: string | null;
  activePanel: PatientPanel | null;
};
```

A single `activePanel` value naturally ensures that only one panel is open.

`ResultsScreen` owns the state, and `PatientPanelHost` renders the chosen panel. Start by passing state and callbacks through props. If deeply nested components need them, add a results-scoped context.

Store the selected patient’s ID here; keep fetched patient records in TanStack Query. This avoids maintaining competing copies of the same patient.

## TypeScript types

Keep types close to the code that owns them.

| Type | Recommended home |
| --- | --- |
| Component props used by one component | In that component’s file |
| Panel selection and results UI state | `results.types.ts` |
| Search form values | `search.types.ts` |
| Billing report row or shared report model | `billing-report.types.ts` |
| Shared patient model | `patient.types.ts` |
| User and permission types | `auth.types.ts` |
| Generated API request/response types | `lib/api/generated/` |

I recommend eventually generating API types from the NestJS OpenAPI specification. NestJS supports generating that specification through its Swagger module. This helps keep frontend request and response types aligned with the backend contract. [6](https://docs.nestjs.com/openapi/introduction)

UI-specific types should remain frontend-owned. A form’s editable values or a table’s display model may differ from an API response.

## How NestJS fits

The backend can use similar business groupings without matching every frontend folder:

```text
src/
  auth/
  billing-reports/
    dto/
    billing-reports.controller.ts
    billing-reports.service.ts
  patients/
    dto/
    patients.controller.ts
    patients.service.ts
  doctors/
    dto/
    doctors.controller.ts
    doctors.service.ts
```

Controllers expose endpoints; services coordinate backend work, including stored-procedure calls. Your frontend calls those endpoints through its feature API functions. Business endpoints remain in NestJS.

Two follow-up decisions would refine this proposal:

- Should refreshing or bookmarking the results page restore the search? This determines how we preserve the search request. If it contains patient information, I would consider a server-stored search referenced by an opaque ID rather than putting those values directly in the URL.
- Can your team share an example of the existing authentication integration? That will settle the provider arrangement, callback routes, and whether API calls use a browser token or a server-managed session.

## References

1. [Next.js — Project structure and organization](https://nextjs.org/docs/app/getting-started/project-structure)
2. [Next.js — Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)
3. [Next.js — Authentication](https://nextjs.org/docs/app/guides/authentication)
4. [TanStack Query — Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
5. [TanStack Query — Invalidations from Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)
6. [NestJS — OpenAPI Introduction](https://docs.nestjs.com/openapi/introduction)
