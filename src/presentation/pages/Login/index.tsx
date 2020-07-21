import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Input from '@/presentation/components/Input';
import FormStatus from '@/presentation/components/FormStatus';
import SubmitButton from '@/presentation/components/SubmitButton';
import FormContext from '@/presentation/contexts/form/form-context';
import { useApi } from '@/presentation/contexts/api/api-context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';
import { Container, Form } from './styles';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const history = useHistory();
  const { setCurrentAccount } = useApi();
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }

      setState({
        ...state,
        isLoading: true,
      });

      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      setCurrentAccount(account);

      history.replace('/');
    } catch (error) {
      setState({
        ...state,
        mainError: error.message,
        isLoading: false,
      });
    }
  };

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
