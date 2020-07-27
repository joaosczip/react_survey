import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { LoadSurveyList } from '@/domain/usecases';
import { AccessDeniedError } from '@/domain/errors';
import { useApi } from '@/presentation/contexts/api/api-context';
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
  const { setCurrentAccount } = useApi();
  const history = useHistory();

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(null);
          history.replace('/login');
        }
        setState({ ...state, error: error.message });
      });
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
