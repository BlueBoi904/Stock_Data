import React from 'react';
import { ErrorScreen } from './ErrorScreen';

class ErrorBoundary extends React.Component<
  { children: JSX.Element | JSX.Element[] },
  { hasError: boolean; error: unknown }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const error = (this.state.error as unknown) as Error;
      return (
        <ErrorScreen
          error={error}
          onReset={() => {
            this.setState({ hasError: false, error: null });
          }}
        />
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
