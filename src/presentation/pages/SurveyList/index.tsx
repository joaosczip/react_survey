import React from 'react';

import Footer from '@/presentation/components/Footer';
import Header from '@/presentation/components/Header';
import SurveyItem from './components/SurveyItem';
import { Container, MainContent } from './styles';

const SurveyList: React.FC = () => {
  return (
    <Container>
      <Header />
      <MainContent>
        <h2>Enquetes</h2>
        <ul>
          <SurveyItem />
        </ul>
      </MainContent>
      <Footer />
    </Container>
  );
};

export default SurveyList;
