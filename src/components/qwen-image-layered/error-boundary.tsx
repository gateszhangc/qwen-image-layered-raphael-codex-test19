"use client";

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Qwen Image Layered Error:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} retry={this.retry} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; retry: () => void }> = ({ error, retry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-card border border-border rounded-lg">
      <div className="mb-4">
        <AlertTriangle className="text-destructive" size={48} />
      </div>
      <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        {error?.message || 'Component failed to load. Please try refreshing the page or try again later.'}
      </p>
      <Button onClick={retry} variant="outline">
        <RefreshCw className="mr-2" size={16} />
        Retry
      </Button>
    </div>
  );
};

export default ErrorBoundary;
