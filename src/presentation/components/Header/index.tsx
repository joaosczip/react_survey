import React, { memo } from 'react';

import logoImg from '@/presentation/assets/logo.svg';
import { Container, HeaderContent, Logout } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <HeaderContent>
        <img src={logoImg} alt="log" />
        <Logout>
          <span>João</span>
          <a href="#">Sair</a>
        </Logout>
      </HeaderContent>
    </Container>
  );
};

export default memo(Header);
