import React from 'react';
import { MainContent } from './MainContent';
import { TextTitle } from 'components/atoms';

class ErrorBoundary extends React.Component<
  { children: JSX.Element },
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
        <MainContent>
          <TextTitle>{error.message}</TextTitle>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
            }}>
            Clear
          </button>
        </MainContent>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
