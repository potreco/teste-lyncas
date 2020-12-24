import React from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import { Box } from './styles';

export const Loading: React.FC = () => {
  return (
    <Box>
      <FiRefreshCcw size={16} />
      Carregando...
    </Box>
  );
};
