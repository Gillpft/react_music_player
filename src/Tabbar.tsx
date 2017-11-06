import * as React from 'react'
import './Tabbar.css'

import { Button } from './Button'
import { SearchBox } from './SearchBox'

export const Tabbar = (p: {
  changPage1?: () => void,
  changPage2?: () => void,
  backgroundColor1: string,
  backgroundColor2: string
}) => {

  return (
    <div className='tabbar'>
      <div className='PFTMusic'>Personal Music</div>
      <Button text='音乐馆' className='buttonTabbarTrue' backgroundColor={p.backgroundColor1} onclick={() => p.changPage1()} />
      <Button text='我的音乐' className='buttonTabbarFalse' backgroundColor={p.backgroundColor2} onclick={() => p.changPage2()} />
    </div>

  );
}
