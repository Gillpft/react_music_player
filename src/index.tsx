import * as React from 'react';
import * as ReactDOM from 'react-dom';


import { APP } from './APP'
import { Search } from './Search'

import './index.css';

if (location.href.indexOf('y.qq.com') == -1) {
    location.href = '?y.qq.com'
} else {
    ReactDOM.render(<Search />, document.getElementById('root'))
}

