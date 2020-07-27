import React, { memo } from 'react';

import logoImg from '@/presentation/assets/logo.svg';
import { useApi } from '@/presentation/contexts/api/api-context';
import { useLogout } from '@/presentation/hooks';
import { Container, HeaderContent, Logout } from './styles';

const Header: React.FC = () => {
  const { getCurrentAccount } = useApi();
  const handleLogout = useLogout();

  const logout = (event: React.MouseEvent): void => {
    event.preventDefault();
    handleLogout();
  };

  return (
    <Container>
      <HeaderContent>
        <img src={logoImg} alt="logo" />
        <Logout>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={logout} href="#">
            Sair
          </a>
        </Logout>
      </HeaderContent>
    </Container>
  );
};

export default memo(Header);
