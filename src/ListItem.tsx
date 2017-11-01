import * as React from 'react';
import './ListItem.css';

import { Button } from './Button'

export const ListItem = (p: { img: string, songName: string, singer: string, onClickPlay: () => void, isPlay: boolean, onClickCollect: () => void, isCollect: boolean, }) => {

  return <div className='song'  >

        <img className='songimg' width="50" height="50" src={p.img} />
        <div className='songText'>
          {p.songName}
        </div>
        <div className='songText'>
          {p.singer}
        </div>

        <Button img={p.isPlay ? 'stop.png' : 'play.png'} className='buttonList' onclick={p.onClickPlay} />

        <Button img={p.isCollect ? 'collect.png' : 'discollect.png'} className='buttonList' onclick={p.onClickCollect} />

      </div>
}
