import { LinkedInLogo } from './SocialBrandIcons'
import { legalHash, marketingHash, solutionHash } from '../legal/routes'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__col">
          <div className="site-footer__brand">
            <div className="site-footer__brand-lockup">
              <img
                className="site-nav__logo-img site-nav__logo-img--footer"
                src="/brand/unifytechs-mark.svg"
                alt=""
                width={34}
                height={34}
              />
              <strong>UnifyTechs</strong>
            </div>
          </div>
          <p className="site-footer__tag">Unified intelligence. Seamless outcomes.</p>
          <div className="site-footer__social" aria-label="Social links">
            <a
              href="https://www.linkedin.com/company/unifytechs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UnifyTechs on LinkedIn"
            >
              <LinkedInLogo size={20} />
            </a>
          </div>
        </div>

        <div className="site-footer__col">
          <span className="site-footer__heading">Solutions</span>
          <ul>
            <li>
              <a href={solutionHash('ocr')}>Form OCR &amp; Extraction</a>
            </li>
            <li>
              <a href={solutionHash('eligibility')}>Eligibility Verification</a>
            </li>
            <li>
              <a href={solutionHash('codes')}>Code Validation</a>
            </li>
            <li>
              <a href={solutionHash('denials')}>Denial Management</a>
            </li>
            <li>
              <a href={solutionHash('integrations')}>Payer Integration Hub</a>
            </li>
          </ul>
        </div>

        <div className="site-footer__col">
          <span className="site-footer__heading">Company</span>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#claims-expertise">Claims expertise</a>
            </li>
            <li>
              <a href="#contact">Careers</a>
            </li>
            <li>
              <a href={marketingHash('blog')}>Blog</a>
            </li>
            <li>
              <a href={marketingHash('press')}>Press</a>
            </li>
            <li>
              <a href="#contact">Partners</a>
            </li>
          </ul>
        </div>

        <div className="site-footer__col">
          <span className="site-footer__heading">Legal &amp; Compliance</span>
          <ul>
            <li>
              <a href={legalHash('privacy')}>Privacy Policy</a>
            </li>
            <li>
              <a href={legalHash('terms')}>Terms</a>
            </li>
            <li>
              <a href={legalHash('hipaa-notice')}>HIPAA Notice</a>
            </li>
            <li>
              <a href={legalHash('soc2')}>SOC2 Report</a>
            </li>
            <li>
              <a href={legalHash('cookies')}>Cookie Settings</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bar">
        <div className="container">
          © {YEAR} UnifyTechs · All rights reserved · Built for Healthcare, by Healthcare.
          <span className="site-footer__fine">
            {' '}
            Industry references on this site are for context only and do not imply partnership or endorsement.
          </span>
        </div>
      </div>
    </footer>
  )
}
