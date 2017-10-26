import * as React from 'react';
import './index.css';

import { Tabbar } from './Tabbar'
import { Search } from './Search'
import { ListItem } from './ListItem'

import { search, Song, setMusicState } from './QQMusicAPI'

export const Button = ()=>{
 return <div className='MusicMuseumTop' >
  <h1>🎵 PFT Music</h1>
  <Tabbar boolean={true} />
  <Search placeholder='周杰伦' />
</div>        
}
