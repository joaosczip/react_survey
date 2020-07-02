import React, { useState, useEffect } from 'react';

import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Input from '@/presentation/components/Input';
import FormStatus from '@/presentation/components/FormStatus';
import FormContext from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Container, Form, SubmitButton } from './styles';

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
    });
  }, [state.email]);

  useEffect(() => {
    validation.validate('password', state.password);
  }, [state.password]);

  return (
    <Container>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <Form>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Seu email" />
          <Input type="password" name="password" placeholder="Sua senha" />
          <SubmitButton data-testid="submit" disabled type="submit">
            Entrar
          </SubmitButton>
          <span>Criar conta</span>
          <FormStatus />
        </Form>
      </FormContext.Provider>
      <Footer />
    </Container>
  );
};

export default Login;
