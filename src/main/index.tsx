import React from 'react';
import ReactDOM from 'react-dom';

import Router from '@/presentation/routes/route';
import { makeLogin } from './factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';

ReactDOM.render(
  <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />,
  document.getElementById('main')
);
