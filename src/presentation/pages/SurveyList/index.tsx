import React from 'react';

import Footer from '@/presentation/components/Footer';
import Header from '@/presentation/components/Header';
import {
  Container,
  MainContent,
  BoxContent,
  IconContainer,
  Icon,
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
              <IconContainer valid={true}>
                <Icon src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA0klEQVQ4EWNgIAH8//+/AYhLSNCCWynUMCD1/zcQG+BWSYQMkmEgA0Egjght2JUANYO8iQ4MsasmIAo0BZthP4DirAS0YkrjMAzk0tOYqgmIADUVgnTiADPxakfStAWmECj2DkmcWOYjoEJPRpBqmEGMQABiI4vB5IikH1PbQAYmIm0mVtlLahu4nJpe/gf0hho1XbgVGKd3qWngRFBA4/LyX6AcKZZdBbpOB2QgLk1nQJIkgElwtaBEDAXIOUULKHYSiP/CJHHQX4Hic4CYBWYgADx8PyqFiuhJAAAAAElFTkSuQmCC" />
              </IconContainer>
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
