import React, { useState } from 'react';

import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Input from '@/presentation/components/Input';
import FormStatus from '@/presentation/components/FormStatus';
import FormContext from '@/presentation/contexts/form/form-context';
import { Container, Form, SubmitButton } from './styles';

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    mainError: '',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
  });

  return (
    <Container>
      <LoginHeader />
      <FormContext.Provider value={{ state }}>
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
