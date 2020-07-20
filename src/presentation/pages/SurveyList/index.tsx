import React from 'react';

import Footer from '@/presentation/components/Footer';
import Header from '@/presentation/components/Header';
import Icon, { IconName } from '@/presentation/components/Icon';
import {
  Container,
  MainContent,
  BoxContent,
  BoxFooter,
  Day,
  Month,
  Year,
} from './styles';

const SurveyList: React.FC = () => {
  return (
    <Container>
      <Header />
      <MainContent>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <BoxContent>
              <Icon
                styles={{
                  top: '-10px',
                  right: '-10px',
                  position: 'absolute',
                  backgroundColor: 'green',
                }}
                iconName={IconName.thumbUp}
              />
              <time>
                <Day>22</Day>
                <Month>03</Month>
                <Year>2020</Year>
              </time>
              <p>Qual é seu framework preferido?</p>
            </BoxContent>
            <BoxFooter>Ver resultado</BoxFooter>
          </li>
        </ul>
      </MainContent>
      <Footer />
    </Container>
  );
};

export default SurveyList;
