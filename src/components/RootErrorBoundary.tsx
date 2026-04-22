import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }

type State = { error: Error | null }

export class RootErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[UnifyTechs]', error, info.componentStack)
  }

  override render(): ReactNode {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            padding: 24,
            fontFamily: 'system-ui, sans-serif',
            background: '#fef2f2',
            color: '#7f1d1d',
          }}
        >
          <h1 style={{ marginTop: 0 }}>Application error</h1>
          <p>The UI failed to render. Details:</p>
          <pre
            style={{
              padding: 16,
              background: '#fff',
              borderRadius: 8,
              overflow: 'auto',
              border: '1px solid #fecaca',
            }}
          >
            {this.state.error.message}
          </pre>
          <p style={{ fontSize: 14, color: '#57534e' }}>
            Open DevTools (F12) → Console for the full stack trace.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
