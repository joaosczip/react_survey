import React from 'react';

import Icon, { IconName } from '@/presentation/components/Icon';
import { Container, BoxContent, Day, Month, Year, BoxFooter } from './styles';

const SurveyItem: React.FC = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default SurveyItem;
