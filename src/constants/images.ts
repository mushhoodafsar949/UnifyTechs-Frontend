/** Pexels CDN — append size params at usage site. Contact backdrop unchanged per product preference. */
export const IMAGES = {
  /** Abstract data / connectivity — technology section */
  techBg: 'https://images.pexels.com/photos/3862137/pexels-photo-3862137.jpeg',
  /** Contact section — unchanged */
  contactBg: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
} as const

export function pexelsUrl(url: string, width = 1200) {
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}auto=compress&cs=tinysrgb&w=${width}`
}
