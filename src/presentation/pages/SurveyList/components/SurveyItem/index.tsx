import React from 'react';

import { LoadSurveyList } from '@/domain/usecases';
import Icon, { IconName } from '@/presentation/components/Icon';
import { Container, BoxContent, Day, Month, Year, BoxFooter } from './styles';

type Props = {
  survey: LoadSurveyList.Model;
};

const SurveyItem: React.FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;
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
          iconName={iconName}
        />
        <time>
          <Day data-testid="day">
            {survey.date.getDate().toString().padStart(2, '0')}
          </Day>
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
