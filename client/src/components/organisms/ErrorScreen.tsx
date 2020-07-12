import React from 'react';
import { useHistory } from 'react-router';
import { Button, TextBody, TextSubTitleSmall } from '../atoms';
import './styles/ErrorScreen.scss';

export function ErrorScreen({
  onReset,
  error,
}: {
  onReset: () => void;
  error: Error;
}) {
  const history = useHistory();

  function handleReset() {
    history.push('/');
    if (onReset) {
      onReset();
    }
  }

  return (
    <div className="ErrorScreen">
      <div className="text-container">
        <TextSubTitleSmall>{error.message}</TextSubTitleSmall>
        <TextBody>Return to homepage or search for another ticker</TextBody>
      </div>
      <Button onClick={handleReset} type={Button.Type.Primary}>
        <TextBody>Return to Homepage</TextBody>
      </Button>
    </div>
  );
}
