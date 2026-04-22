import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { RootErrorBoundary } from './components/RootErrorBoundary'
import { ConsentBanner } from './analytics/ConsentBanner'
import { initTracker } from './analytics/tracker'

initTracker()

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
    <ConsentBanner />
  </RootErrorBoundary>,
)
