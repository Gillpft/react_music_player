import * as React from 'react';
import './index.css';

import { Tabbar } from './Tabbar'
import { ListItem } from './ListItem'



export const MusicMuseum = (p: { search: () => void }) => {
  return <div className='MusicMuseumTop' >
    <Tabbar boolean={true} search={() => p.search()} />
  </div>
}
