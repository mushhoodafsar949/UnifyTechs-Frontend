import { type FormEvent, useState } from 'react'
import { Check } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { FormSelect } from '../components/FormSelect'
import { IMAGES, pexelsUrl } from '../constants/images'
import { apiBaseUrl } from '../config'

const VOLUME_OPTIONS = [
  { value: 's', label: '<500' },
  { value: 'm', label: '500–5K' },
  { value: 'l', label: '5K–50K' },
  { value: 'xl', label: '50K+' },
]

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

/** Shape of the 201 body from POST /api/contact on the backend. */
interface ContactSuccessResponse {
  correlationId: string
  createdAtUtc: string
  emailSent: boolean
}

/** Shape of the 503 body the backend returns when SMTP delivery fails. */
interface ContactErrorResponse {
  message?: string
  correlationId?: string
}

async function parseErrorResponse(res: Response): Promise<string> {
  const fallback = `Request failed (${res.status})`
  try {
    const ct = res.headers.get('content-type') ?? ''
    if (ct.includes('application/json')) {
      const body = (await res.json()) as ContactErrorResponse & { title?: string; errors?: Record<string, string[]> }

      // ASP.NET ValidationProblemDetails shape (400)
      if (body.errors) {
        const first = Object.values(body.errors).flat()[0]
        if (first) return first
      }
      if (body.message) {
        return body.correlationId ? `${body.message} (ref ${body.correlationId.slice(0, 8)})` : body.message
      }
      if (body.title) return body.title
    } else {
      const text = await res.text()
      if (text.trim()) return text.trim()
    }
  } catch {
    /* swallow — fall through to generic message */
  }
  return fallback
}

export function Contact() {
  const [state, setState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      first: String(fd.get('first') ?? '').trim(),
      last: String(fd.get('last') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      org: String(fd.get('org') ?? '').trim(),
      volume: String(fd.get('volume') ?? '').trim(),
      challenge: String(fd.get('challenge') ?? '').trim(),
    }

    setErrorMessage(null)
    setState('submitting')

    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(await parseErrorResponse(res))
      }

      // Consume the 201 body so callers of this component could log/telemetry the correlationId later.
      await res.json().catch(() => ({}) as ContactSuccessResponse)

      setState('success')
      form.reset()
      window.setTimeout(() => setState('idle'), 4500)
    } catch (err) {
      setState('error')
      const networkHint =
        err instanceof TypeError
          ? 'Could not reach the server. Please check your connection and try again.'
          : null
      setErrorMessage(networkHint ?? (err instanceof Error ? err.message : 'Something went wrong. Please try again.'))
    }
  }

  const buttonLabel =
    state === 'success'
      ? 'Thank you — we will be in touch.'
      : state === 'submitting'
        ? 'Sending…'
        : 'Book My Free Demo →'

  return (
    <section id="contact" className="contact section-pad">
      <div
        className="contact__bg"
        style={{ backgroundImage: `url(${pexelsUrl(IMAGES.contactBg, 1600)})` }}
        aria-hidden
      />
      <div className="container contact__grid">
        <Reveal>
          <div className="contact__copy">
            <h2>Ready to Eliminate Claim Denials?</h2>
            <p>
              Book a personalized 30-minute demo. See how UnifyTechs processes your specific claim types, payers, and
              workflows — live.
            </p>
            <ul className="contact__bullets">
              <li>
                <Check aria-hidden /> No credit card required
              </li>
              <li>
                <Check aria-hidden /> White-glove onboarding
              </li>
              <li>
                <Check aria-hidden /> ROI guaranteed or money back
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="contact-form__row">
              <div>
                <label htmlFor="first">First Name</label>
                <input id="first" name="first" type="text" autoComplete="given-name" placeholder="Jordan" />
              </div>
              <div>
                <label htmlFor="last">Last Name</label>
                <input id="last" name="last" type="text" autoComplete="family-name" placeholder="Lee" />
              </div>
            </div>
            <div>
              <label htmlFor="email">Work Email</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@health.org" required />
            </div>
            <div>
              <label htmlFor="org">Organization Name</label>
              <input id="org" name="org" type="text" autoComplete="organization" placeholder="Organization" />
            </div>
            <div>
              <label htmlFor="volume">Monthly Claim Volume</label>
              <FormSelect id="volume" name="volume" options={VOLUME_OPTIONS} placeholder="Select range" />
            </div>
            <div>
              <label htmlFor="challenge">What&apos;s your biggest challenge?</label>
              <textarea id="challenge" name="challenge" placeholder="Denials, staffing, integrations…" rows={4} />
            </div>
            {errorMessage && (
              <p className="contact-form__error" role="alert">
                {errorMessage}
              </p>
            )}
            <button type="submit" className="btn btn--primary btn--block" disabled={state === 'submitting'}>
              {buttonLabel}
            </button>
            <p className="contact-form__note">
              🔒 Your data is encrypted and never shared. HIPAA-compliant inquiry form.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
