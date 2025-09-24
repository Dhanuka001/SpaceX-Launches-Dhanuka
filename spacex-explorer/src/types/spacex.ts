export type Launch = {
    id: string
    name: string
    date_utc: string
    success: boolean | null
    details?: string | null
    rocket: string
    launchpad: string
    payloads: string[]
}

export type Rocket = { id: string; name: string; description?: string }
export type Launchpad = { id: string; name: string; locality: string; region:string }
export type Payload = { id: string; name: string | null; type: string | null; orbit: string | null }