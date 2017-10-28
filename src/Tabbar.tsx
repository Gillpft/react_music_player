import * as React from 'react';
import './index.css';

import { Button } from './Button'
import { SearchBox } from './SearchBox'

export const Tabbar = (p: { boolean?: boolean, value:string,search: () => void }) => {

  return (
    <div className='tabbar'>
      <div className='PFTMusic'>🎵 PFT Music</div>
      <Button text='音乐馆' className='buttonTabbarTrue' onclick={() => !p.boolean} />
      <Button text='我的音乐' className='buttonTabbarFalse' onclick={() => !p.boolean} />
      <SearchBox placeholder='   周杰伦' value={p.value} marginLeft={200} search={() => p.search()} />
    </div>

  );
}
