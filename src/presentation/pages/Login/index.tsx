import React, { useState } from 'react';

import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Input from '@/presentation/components/Input';
import FormStatus from '@/presentation/components/FormStatus';
import FormContext from '@/presentation/contexts/form/form-context';
import { Container, Form, SubmitButton } from './styles';

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
  });

  return (
    <Container>
      <LoginHeader />
      <FormContext.Provider value={state}>
        <Form>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Seu email" />
          <Input type="password" name="password" placeholder="Sua senha" />
          <span>Error</span>
          <SubmitButton type="submit">Entrar</SubmitButton>
          <span>Criar conta</span>
          <FormStatus />
        </Form>
      </FormContext.Provider>
      <Footer />
    </Container>
  );
};

export default Login;
