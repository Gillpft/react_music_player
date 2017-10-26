import * as React from 'react';
import './index.css';

import { Button } from './Button'

export const ListItem = (p: { img: string, songName: string, singer: string, onClick: () => void }) => {

  return (
    <div>
      <div className='songList' onClick={p.onClick} >

        <img className='songimgList' width="50" height="50" src={p.img} />
        <div className='songTextList'>
          {p.songName}
          <br />
          {p.singer}
        </div>

        <Button img='discollect.png' className='buttonList' onclick={() => { alert(123) }} />

        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
