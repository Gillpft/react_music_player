import * as React from 'react';
import './index.css';

import { Button } from './Button'
import { SearchBox } from './SearchBox'

export const Tabbar = (p: { boolean?: boolean, search?: () => void }) => {

  return (
    <div className='tabbar'>
      <h1>🎵 PFT Music</h1>
      <SearchBox placeholder='周杰伦' search={() => p.search()} />
      <Button text='音乐馆' className='buttonTabbarTrue' onclick={() => !p.boolean} />
      <Button text='我的音乐' className='buttonTabbarFalse' onclick={() => !p.boolean} />
    </div>

  );
}
