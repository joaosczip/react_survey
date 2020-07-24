import React, { useContext } from 'react';

import SurveyContext from '../context';
import SurveyItem from '../SurveyItem';
import { Container } from './styles';

const List: React.FC = () => {
  const { state } = useContext(SurveyContext);
  return (
    <Container data-testid="survey-list">
      {state.surveys.length ? (
        state.surveys.map((survey) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </>
      )}
    </Container>
  );
};

export default List;
