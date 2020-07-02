import React, { memo } from 'react';

import logoImg from '@/presentation/assets/logo.svg';
import { Container } from './styles';

const LoginHeader: React.FC = () => {
  return (
    <Container>
      <img src={logoImg} />
      <h1>4Dev - Enquetes para Programadores</h1>
    </Container>
  );
};

export default memo(LoginHeader);
