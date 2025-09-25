export const formatLocalDate = (iso: string) => 
    new Date(iso).toLocaleString(undefined, { dateStyle: 'medium' , timeStyle: 'short'})