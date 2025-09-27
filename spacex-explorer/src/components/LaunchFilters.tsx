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
        <form aria-label="filters" className="flex flex-wrap gap-3 items-center">
            <div className="flex flex-1 min-w-[250px] gap-2">
                <input
                    aria-label="search"
                    className="flex-grow border rounded px-3 py-2"
                    placeholder="Search by mission..."
                    value={filters.query}
                    onChange={(e) => set({query : e.target.value})}
                />
                <button
                    type="submit"
                    className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                Search
                </button>
            </div>
        
            <div className="flex gap-3 text-sm">
                <select
                aria-label="year"
                className="border border-gray-300 rounded-md px-2 py-2 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                value={filters.year}
                onChange={(e) => set({ year: e.target.value as any})}
            >
                <option value="all">All years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}   
            </select>

            <select
                aria-label="status"
                className="border border-gray-300 rounded-md px-2 py-2 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                value={filters.status}
                onChange={(e) => set({ status: e.target.value as any})}
            >
                <option value="all">All results</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
            </select>

            <select
                aria-label="sort"
                className="border border-gray-300 rounded-md px-2 py-2 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                value={filters.sort}
                onChange={(e) => set({ sort: e.target.value as any})}
            >
                <option value="newest">Newest → Oldest</option>
                <option value="oldest">Oldest → Newest</option>
            </select>
                
            </div>
          
        </form>
    )
}