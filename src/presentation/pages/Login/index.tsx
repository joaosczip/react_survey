import React from 'react';

import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Spinner from '@/presentation/components/Spinner';
import {
  Container,
  Form,
  InputContainer,
  SubmitButton,
  ErrorContainer,
} from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <LoginHeader />
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
