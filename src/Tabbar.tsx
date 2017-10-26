import * as React from 'react';
import './index.css';

import {Button} from './Button'

export  const Tabbar =(p:{boolean:boolean})=> {
      
      return (
        <div className='tabbar'>
        <Button text='音乐馆' textColor={ p.boolean?'white':'black'} background={p.boolean?'rgba(0, 0, 0)':'rgba(0, 0, 0, 0)'} onclick={()=>!p.boolean}/>
        <Button text='我的音乐' textColor={ p.boolean?'black':'white'} background={p.boolean?'rgba(0, 0, 0, 0)':'rgba(0, 0, 0)'} onclick={()=>!p.boolean}/>
        </div>
      
      );
    }
  