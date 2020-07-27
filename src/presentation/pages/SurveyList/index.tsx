import React, { useEffect, useState } from 'react';

import { LoadSurveyList } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';
import Footer from '@/presentation/components/Footer';
import Header from '@/presentation/components/Header';
import Error from './components/Error';
import List from './components/List';
import SurveyContext from './components/context';
import { Container, MainContent } from './styles';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });
  const handleError = useErrorHandler((error: Error) =>
    setState({ ...state, error: error.message })
  );

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch(handleError);
  }, [state.reload]);

  return (
    <Container>
      <Header />
      <MainContent>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <List />}
        </SurveyContext.Provider>
      </MainContent>
      <Footer />
    </Container>
  );
};

export default SurveyList;
