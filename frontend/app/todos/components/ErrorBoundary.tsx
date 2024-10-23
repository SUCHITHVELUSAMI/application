import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  errorMessage?: React.ReactNode; // Allow custom messages as React nodes
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught in error boundary:', error, errorInfo);
    // Optionally, log the error to an external service here
    // e.g., logErrorToMyService(error, errorInfo);
  }

  handleResetError = () => {
    this.setState({ hasError: false });
    // Optionally reset relevant state in child components if needed
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          <h1 role="alert">{this.props.errorMessage || 'Something went wrong.'}</h1>
          <button onClick={this.handleResetError} aria-label="Try again" style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
