import React, { useCallback, useContext } from 'react';

import { Container } from './styles';
import FormContext from '@/presentation/contexts/form/form-context';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props) => {
  const { state, setState } = useContext(FormContext);
  const error = state[`${props.name}Error`];

  const handleEnableInput = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.target.readOnly = false;
    },
    []
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    },
    [setState]
  );

  return (
    <Container>
      <input
        data-testid={props.name}
        {...props}
        readOnly
        onFocus={handleEnableInput}
        onChange={handleInputChange}
      />
      <span data-testid={`${props.name}-status`} title={error || 'Tudo certo!'}>
        {error ? 'Error' : 'OK'}
      </span>
    </Container>
  );
};

export default Input;
