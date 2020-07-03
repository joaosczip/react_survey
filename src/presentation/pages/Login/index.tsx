import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Input from '@/presentation/components/Input';
import FormStatus from '@/presentation/components/FormStatus';
import FormContext from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';
import { Container, Form, SubmitButton } from './styles';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      try {
        if (state.isLoading || state.emailError || state.passwordError) {
          return;
        }

        setState({
          ...state,
          isLoading: true,
        });

        const { accessToken } = await authentication.auth({
          email: state.email,
          password: state.password,
        });

        localStorage.setItem('accessToken', accessToken);
        history.replace('/');
      } catch (error) {
        setState({
          ...state,
          mainError: error.message,
          isLoading: false,
        });
      }
    },
    [state, setState, authentication, localStorage]
  );

  return (
    <Container>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <Form data-testid="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Seu email" />
          <Input type="password" name="password" placeholder="Sua senha" />
          <SubmitButton
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            type="submit"
          >
            Entrar
          </SubmitButton>
          <Link data-testid="signup" to="/signup">
            Criar conta
          </Link>
          <FormStatus />
        </Form>
      </FormContext.Provider>
      <Footer />
    </Container>
  );
};

export default Login;
