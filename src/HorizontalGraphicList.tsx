import * as React from 'react';
import './index.css';

import { Button } from './Button'

export const HorizontalGraphicList = (p: { img: string, songName: string, singer: string }) => {

  return (

    <div className='songList' >
      <img className='songimgList' width="50" height="50" src={p.img} />
      <div className='songTextList'>
        {p.songName}
        <br />
        {p.singer}
      </div>
      <div style={{marginRight:'30'}}>
      <Button img='discollect.png' onclick={()=>{alert(123)}}/>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
