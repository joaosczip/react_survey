import React from 'react';

import Icon, { IconName } from '@/presentation/components/Icon';
import { SurveyModel } from '@/domain/models';
import { Container, BoxContent, Day, Month, Year, BoxFooter } from './styles';

type Props = {
  survey: SurveyModel;
};

const SurveyItem: React.FC<Props> = ({ survey }) => {
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
          <Day data-testid="day">{survey.date.getDate()}</Day>
          <Month data-testid="month">
            {survey.date
              .toLocaleString('pt-BR', { month: 'short' })
              .replace('.', '')}
          </Month>
          <Year data-testid="year">{survey.date.getFullYear()}</Year>
        </time>
        <p data-testid="question">{survey.question}</p>
      </BoxContent>
      <BoxFooter>Ver resultado</BoxFooter>
    </Container>
  );
};

export default SurveyItem;
