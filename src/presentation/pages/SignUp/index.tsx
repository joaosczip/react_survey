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

const SignUp: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    name: '',
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
    });
  }, [state.name]);

  return (
    <Container>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <Form onSubmit={() => {}}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Seu nome" />
          <Input type="email" name="email" placeholder="Seu email" />
          <Input type="password" name="password" placeholder="Sua senha" />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
          />
          <SubmitButton disabled data-testid="submit" type="submit">
            Confirmar
          </SubmitButton>
          <span>Voltar para Login</span>
          <FormStatus />
        </Form>
      </FormContext.Provider>
      <Footer />
    </Container>
  );
};

export default SignUp;
