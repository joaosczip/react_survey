import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Input from '@/presentation/components/Input';
import FormStatus from '@/presentation/components/FormStatus';
import SubmitButton from '@/presentation/components/SubmitButton';
import FormContext from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication, SaveAccessToken } from '@/domain/usecases';
import { Container, Form } from './styles';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken,
}) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };

    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    });
  }, [state.email, state.password]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      try {
        if (state.isLoading || state.isFormInvalid) {
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

        await saveAccessToken.save(accessToken);

        history.replace('/');
      } catch (error) {
        setState({
          ...state,
          mainError: error.message,
          isLoading: false,
        });
      }
    },
    [state, setState]
  );

  return (
    <Container>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <Form data-testid="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Seu email" />
          <Input type="password" name="password" placeholder="Sua senha" />
          <SubmitButton label="Entrar" />
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
