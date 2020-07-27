import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import logoImg from '@/presentation/assets/logo.svg';
import { useApi } from '@/presentation/contexts/api/api-context';
import { Container, HeaderContent, Logout } from './styles';

const Header: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useApi();
  const history = useHistory();

  const logout = (event: React.MouseEvent): void => {
    event.preventDefault();
    setCurrentAccount(null);
    history.replace('/login');
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
