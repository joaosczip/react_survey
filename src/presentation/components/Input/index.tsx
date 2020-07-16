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
    <Container
      data-testid={`${props.name}-container`}
      isValid={error ? false : true}
    >
      <input
        ref={inputRef}
        title={error}
        data-testid={props.name}
        {...props}
        placeholder=" "
        readOnly
        onFocus={(event) => (event.target.readOnly = false)}
        onChange={handleInputChange}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        onClick={() => inputRef.current.focus()}
        htmlFor=""
      >
        {props.placeholder}
      </label>
    </Container>
  );
};

export default Input;
