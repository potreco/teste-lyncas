import React from 'react';

import { Container } from './styles';

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

const Alert: React.FC<AlertProps> = ({ type, message }: AlertProps) => {
  return (
    <Container type={type}>
      <span>{message}</span>
    </Container>
  );
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
