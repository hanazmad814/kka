'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean };

export class RendererErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // keep UI stable in public/editor renderer paths
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div className="rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">Renderer error.</div>;
    }
    return this.props.children;
  }
}
