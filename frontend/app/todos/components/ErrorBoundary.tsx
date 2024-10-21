// /frontend/components/ErrorBoundary.tsx
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode; // Define the children prop as React nodes
}

interface ErrorBoundaryState {
  hasError: boolean; // Define state shape
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true }; // Update state to indicate an error has occurred
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught in error boundary:', error, errorInfo); // Log the error
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>; // Fallback UI for errors
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
