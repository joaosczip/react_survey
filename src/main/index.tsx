import React from 'react';
import ReactDOM from 'react-dom';

import Router from '@/presentation/routes/route';
import { makeLogin } from './factories/pages/login/login-factory';

ReactDOM.render(
  <Router makeLogin={makeLogin} />,
  document.getElementById('main')
);
