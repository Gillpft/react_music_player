import * as React from 'react';
import './index.css';

import {Button} from './Button'

export  const SearchBox =(p:{placeholder:string,search:()=>void})=> {
      
      return (
        <div className='search'>
          <Button text='🔍' className='buttonSearch' onclick={()=>p.search()}/>
          <input type="text" placeholder={p.placeholder} />
        </div>
      );
    }