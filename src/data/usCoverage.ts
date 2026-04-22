/** US focus metros — lat/lng for COBE markers; `id` pairs with CSS anchor `--cobe-{id}` from cobe. */

export const US_GLOBE_MARKERS = [
  { id: 'ny', code: 'NY', name: 'New York', lat: 40.7128, lng: -74.006 },
  { id: 'ca', code: 'CA', name: 'California', lat: 34.0522, lng: -118.2437 },
  { id: 'il', code: 'IL', name: 'Illinois', lat: 41.8781, lng: -87.6298 },
  { id: 'tx', code: 'TX', name: 'Texas', lat: 29.7604, lng: -95.3698 },
  { id: 'az', code: 'AZ', name: 'Arizona', lat: 33.4484, lng: -112.074 },
] as const
