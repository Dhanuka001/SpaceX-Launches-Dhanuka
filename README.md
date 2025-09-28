# 🚀 SpaceX Launch Explorer

A React + TypeScript app that lists SpaceX launches with **search, filters, sort, pagination, launch details, and favorites persisted to localStorage**.  
This project demonstrates **clean architecture, readable code, state management via hooks, and pragmatic testing**.

---

## 1. Features

### Launch List
- Search by mission name (debounced 300 ms)  
- Filter by year and success/failed  
- Sort by date (newest → oldest / oldest → newest)  
- Client-side pagination  
- Loading skeletons and clear error state with retry  

### Launch Details
- Mission name, local date/time, details  
- Related Rocket, Launchpad, and Payloads (table)  

### Favorites
- Star/unstar launches; persisted in `localStorage`  
- Separate Favorites page  

### URL-Synced Filters & Pagination
- Filters and page encoded in the query string  
- Shareable links and improved back/forward navigation  

### Custom Hooks
- `useFetch` → request cancellation (`AbortController`) + in-memory cache  
- `useLaunches` → derived list state (search/filter/sort/pagination)  
- `useLocalStorage` → simple persistence 
- `usePayloads` → handles fetching multiple payloads by IDs with aggregated loading/error states

---

## 2. Tech Stack

- Vite + React 18 + TypeScript  
- Tailwind CSS for styling  
- React Router for routing  
- Vitest + Testing Library + MSW for tests and HTTP mocking

---

## 3. How to Run / Build

# 0) (optional) ensure Node >= 18
node -v

# 1) install dependencies
npm install

# 2) run dev server
npm run dev
# open the URL Vite prints (e.g., http://localhost:5173)

# 3) run tests
npm test

# 4) production build & local preview
npm run build
npm run preview

---

## 4. Architecture Decisions

### State Management
- Kept simple with local state + custom hooks (`useLaunches`, `useLocalStorage`) — no external state library needed for this scope.  
- Heavy UI derivations (search, filters, sort, pagination) live inside `useLaunches` to keep components small.  
- Memoization (`useMemo`) prevents unnecessary recomputation when inputs haven’t changed.  

### Data Fetching
- Reusable `useFetch` hook handles:
  - Data / loading / error state  
  - `AbortController` to cancel stale requests  
  - In-memory cache keyed by URL for instant back/forward and repeat queries  
- List page fetches `/launches` once and does client-side filtering/sorting/pagination for clarity and responsiveness.  
- Details page fetches `/launches/:id` and then fetches related rocket, launchpad, and payloads on demand.  

### Trade-offs
- Client-side filtering/sorting avoids coupling to server query params and keeps the exercise focused on UI/UX.  
- No global store (Redux/Zustand) to reduce complexity — custom hooks are sufficient here.  
- Payloads fetched individually in the Details view for code simplicity; batching could be added later for optimization.  

---

## 5. Testing

### Frameworks
- **Vitest**  
- **@testing-library/react**  
- **@testing-library/user-event**  

### Network Mocking
- **MSW (Mock Service Worker)** is used to stub SpaceX endpoints for fast, deterministic tests.  

### Coverage Focus
- `useFetch` behavior: caching and cancellation  
- Launch list rendering with search, status, and year filters  
- Error state handling (including retry button)  

### How to Run
```bash
npm test

---

## 6. Project Structure

src/
  api/            # base endpoints (SpaceX v4 URLs)
  components/     # LaunchList, LaunchCard, LaunchFilters, LaunchSkeleton, PayloadTable
  hooks/          # useFetch (cancel+cache), useLaunches (derived list state), useLocalStorage
  pages/          # HomePage (list), LaunchDetailsPage, FavoritesPage
  routes/         # App router + Shell layout
  test/           # Vitest setup, MSW handlers/server, hook & UI tests
  types/          # SpaceX types (Launch, Rocket, Launchpad, Payload)
  utils/          # format helpers (e.g., date formatting)
  main.tsx        # app entry
  index.css       # Tailwind entry


---

## 7. What I’d Do Next (With More Time)

- **Batch payload fetching**: Replace many `/payloads/:id` calls with one `/payloads/query`.  
  → Fewer requests, faster details page.

- **Virtualized list**: Use `react-virtual` for long lists.  
  → Better performance and smooth scrolling.

- **More tests**: Cover URL sync, details page, and accessibility.  
  → More reliable and user-friendly.

- **CI pipeline**: Add GitHub Actions for tests and type checks.  
  → Prevents broken code from merging.

