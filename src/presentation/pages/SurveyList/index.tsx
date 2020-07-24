import React, { useEffect, useState } from 'react';

import Footer from '@/presentation/components/Footer';
import Header from '@/presentation/components/Header';
import SurveyItem from './components/SurveyItem';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';
import { Container, MainContent } from './styles';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
  });

  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => setState({ surveys }));
  }, []);

  return (
    <Container>
      <Header />
      <MainContent>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
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
        </ul>
      </MainContent>
      <Footer />
    </Container>
  );
};

export default SurveyList;
