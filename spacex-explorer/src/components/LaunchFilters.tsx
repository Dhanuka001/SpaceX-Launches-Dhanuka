import { useCallback } from "react";
import type { Filters } from "../hooks/useLaunches";

type Props = {
    years: string[];
    filters:Filters;
    onChange: (patch: Partial<Filters>) => void
}


export default function LaunchFilters( { years , filters , onChange}: Props) {

    const set = useCallback((patch: Partial<Filters>) => onChange(patch), [onChange])

    return (
        <form aria-label="filters">
            <input
                aria-label="search"
                placeholder="Search by mission..."
                value={filters.query}
                onChange={(e) => set({query : e.target.value})}
            />

            <select
                aria-label="year"
                value={filters.year}
                onChange={(e) => set({ year: e.target.value as any})}
            >
                <option value="all">All years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}   
            </select>

            <select
                aria-label="status"
                value={filters.status}
                onChange={(e) => set({ status: e.target.value as any})}
            >
                <option value="all">All results</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
            </select>

            <select
                aria-label="sort"
                value={filters.sort}
                onChange={(e) => set({ sort: e.target.value as any})}
            >
                <option value="newest">Newest → Oldest</option>
                <option value="oldest">Oldest → Newest</option>
            </select>
                
        </form>
    )
}