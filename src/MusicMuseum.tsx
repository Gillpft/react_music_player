import * as React from 'react';
import './index.css';

import {Tabbar} from './Tabbar'
import {Search} from './Search'

export  class MusicMuseum extends React.Component {
  render() {
    return (
      <div className='MusicMuseumTop' >
      <h1>🎵 PFT Music</h1>
      <Tabbar boolean={true}/>
      <Search />
      </div>
    );
  }
}
