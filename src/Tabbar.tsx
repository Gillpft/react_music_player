import * as React from 'react';
import './index.css';

import {Button} from './Button'

export  const Tabbar =(p:{boolean:boolean})=> {
      
      return (
        <div className='tabbar'>
        <Button text='音乐馆' className='buttonTabbarTrue'  onclick={()=>!p.boolean}/>
        <Button text='我的音乐' className='buttonTabbarFalse' onclick={()=>!p.boolean}/>
        </div>
      
      );
    }
  