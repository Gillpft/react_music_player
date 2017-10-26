import * as React from 'react';
import * as ReactDOM from 'react-dom';


import {MusicMuseum} from './MusicMuseum'
import {Tabbar} from './Tabbar'

import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <div><MusicMuseum /></div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
