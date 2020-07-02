import React from 'react';

import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Input from '@/presentation/components/Input';
import FormStatus from '@/presentation/components/FormStatus';
import { Container, Form, SubmitButton } from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <LoginHeader />
      <Form>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Seu email" />
        <Input type="password" name="password" placeholder="Sua senha" />
        <span>Error</span>
        <SubmitButton type="submit">Entrar</SubmitButton>
        <span>Criar conta</span>
        <FormStatus />
      </Form>
      <Footer />
    </Container>
  );
};

export default Login;
