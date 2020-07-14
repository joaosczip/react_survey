import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';

import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Input from '@/presentation/components/Input';
import FormStatus from '@/presentation/components/FormStatus';
import SubmitButton from '@/presentation/components/SubmitButton';
import FormContext from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Container, Form } from './styles';
import { AddAccount, SaveAccessToken } from '@/domain/usecases';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken;
};

const SignUp: React.FC<Props> = ({
  validation,
  addAccount,
  saveAccessToken,
}) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
  });
  const history = useHistory();

  useEffect(() => {
    const nameError = validation.validate('name', state.name);
    const emailError = validation.validate('email', state.email);
    const passwordError = validation.validate('password', state.password);
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      state.passwordConfirmation
    );

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!nameError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError,
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        if (state.isLoading || state.isFormInvalid) {
          return;
        }

        setState({
          ...state,
          isLoading: true,
        });

        const account = await addAccount.add({
          name: state.name,
          email: state.email,
          password: state.password,
          passwordConfirmation: state.passwordConfirmation,
        });

        await saveAccessToken.save(account.accessToken);
        history.replace('/');
      } catch (error) {
        setState({
          ...state,
          mainError: error.message,
          isLoading: false,
        });
      }
    },
    [state, setState, addAccount, saveAccessToken, history]
  );

  return (
    <Container>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <Form data-testid="form" onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Seu nome" />
          <Input type="email" name="email" placeholder="Seu email" />
          <Input type="password" name="password" placeholder="Sua senha" />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
          />
          <SubmitButton label="Confirmar" />
          <Link to="/login" replace data-testid="login-link">
            Voltar para Login
          </Link>
          <FormStatus />
        </Form>
      </FormContext.Provider>
      <Footer />
    </Container>
  );
};

export default SignUp;
