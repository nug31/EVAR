import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center h-64 bg-slate-800 rounded-lg p-6">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
          <p className="text-slate-300 text-center mb-4 max-w-md">
            We encountered an error while loading this component. This might be due to a 3D model loading issue.
          </p>
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 p-4 bg-slate-900 rounded text-xs text-slate-300 max-w-full overflow-auto">
              <summary className="cursor-pointer text-slate-400 mb-2">Error Details</summary>
              <pre>{this.state.error.stack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
