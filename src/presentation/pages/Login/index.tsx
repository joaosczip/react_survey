import React from 'react';

import logoImg from '@/presentation/assets/logo.svg';
import Spinner from '@/presentation/components/Spinner';
import {
  Container,
  Header,
  Form,
  InputContainer,
  SubmitButton,
  ErrorContainer,
  Footer,
} from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <Header>
        <img src={logoImg} />
        <h1>4Dev - Enquetes para Programadores</h1>
      </Header>
      <Form>
        <h2>Login</h2>
        <InputContainer>
          <input type="email" name="email" placeholder="Seu email" />
          <span>Error</span>
        </InputContainer>
        <InputContainer>
          <input type="password" name="password" placeholder="Sua senha" />
          <span>Error</span>
        </InputContainer>
        <SubmitButton type="submit">Entrar</SubmitButton>
        <span>Criar conta</span>
        <ErrorContainer>
          <Spinner />
          <span>Erro</span>
        </ErrorContainer>
      </Form>
      <Footer />
    </Container>
  );
};

export default Login;
