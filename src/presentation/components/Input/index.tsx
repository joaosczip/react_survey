import React, { useContext, useRef } from 'react';

import { Container } from './styles';
import FormContext from '@/presentation/contexts/form/form-context';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>();
  const { state, setState } = useContext(FormContext);
  const error = state[`${props.name}Error`];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <input
        ref={inputRef}
        data-testid={props.name}
        {...props}
        placeholder=" "
        readOnly
        onFocus={(event) => (event.target.readOnly = false)}
        onChange={handleInputChange}
      />
      <label onClick={() => inputRef.current.focus()} htmlFor="">
        {props.placeholder}
      </label>
      <span data-testid={`${props.name}-status`} title={error || 'Tudo certo!'}>
        {error ? 'Error' : 'OK'}
      </span>
    </Container>
  );
};

export default Input;
