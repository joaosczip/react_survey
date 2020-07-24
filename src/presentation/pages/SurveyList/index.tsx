import React, { useEffect } from 'react';

import Footer from '@/presentation/components/Footer';
import Header from '@/presentation/components/Header';
import { LoadSurveyList } from '@/domain/usecases';
import { Container, MainContent } from './styles';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  useEffect(() => {
    (async () => {
      await loadSurveyList.loadAll();
    })();
  }, []);

  return (
    <Container>
      <Header />
      <MainContent>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </MainContent>
      <Footer />
    </Container>
  );
};

export default SurveyList;
