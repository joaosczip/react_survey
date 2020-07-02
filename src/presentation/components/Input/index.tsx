import React, { useCallback, useContext, useMemo } from 'react';

import { Container } from './styles';
import FormContext from '@/presentation/contexts/form/form-context';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props) => {
  const { state, setState } = useContext(FormContext);

  const error = useMemo(() => state[`${props.name}Error`], [state, props]);

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

  const getStatus = useCallback(() => {
    return 'Error';
  }, []);

  const getTitle = useCallback(() => {
    return error;
  }, []);

  return (
    <Container>
      <input
        data-testid={props.name}
        {...props}
        readOnly
        onFocus={handleEnableInput}
        onChange={handleInputChange}
      />
      <span data-testid={`${props.name}-status`} title={getTitle()}>
        {getStatus()}
      </span>
    </Container>
  );
};

export default Input;
