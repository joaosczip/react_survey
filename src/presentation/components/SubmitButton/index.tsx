import React, { useContext } from 'react';

import FormContext from '@/presentation/contexts/form/form-context';
import { Button } from './styles';

type Props = {
  label: string;
};

const SubmitButton: React.FC<Props> = ({ label }) => {
  const { state } = useContext(FormContext);

  return (
    <Button disabled={state.isFormInvalid} data-testid="submit" type="submit">
      {label}
    </Button>
  );
};

export default SubmitButton;
