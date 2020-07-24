import React from 'react';

import Footer from '@/presentation/components/Footer';
import Header from '@/presentation/components/Header';
import { Container, MainContent } from './styles';

const SurveyList: React.FC = () => {
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
