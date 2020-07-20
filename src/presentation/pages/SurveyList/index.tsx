import React from 'react';

import logoImg from '@/presentation/assets/logo.svg';
import Footer from '@/presentation/components/Footer';
import {
  Container,
  Header,
  HeaderContent,
  Logout,
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
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="log" />
          <Logout>
            <span>João</span>
            <a href="#">Sair</a>
          </Logout>
        </HeaderContent>
      </Header>
      <MainContent>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <BoxContent>
              <time>
                <Day>22</Day>
                <Month>03</Month>
                <Year>2020</Year>
              </time>
              <p>Qual é seu framework preferido?</p>
            </BoxContent>
            <BoxFooter>Ver resultado</BoxFooter>
          </li>
          <li>
            <BoxContent>
              <time>
                <Day>22</Day>
                <Month>03</Month>
                <Year>2020</Year>
              </time>
              <p>Qual é seu framework preferido?</p>
            </BoxContent>
            <BoxFooter>Ver resultado</BoxFooter>
          </li>
          <li>
            <BoxContent>
              <time>
                <Day>22</Day>
                <Month>03</Month>
                <Year>2020</Year>
              </time>
              <p>Qual é seu framework preferido?</p>
            </BoxContent>
            <BoxFooter>Ver resultado</BoxFooter>
          </li>
          <li>
            <BoxContent>
              <time>
                <Day>22</Day>
                <Month>03</Month>
                <Year>2020</Year>
              </time>
              <p>Qual é seu framework preferido?</p>
            </BoxContent>
            <BoxFooter>Ver resultado</BoxFooter>
          </li>
          <li>
            <BoxContent>
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
