import * as React from 'react';
import './index.css';

import {Button} from './Button'

export  const Search =(p:{placeholder:string })=> {
      
      return (
        <div className='search'>
          <Button text='🔍' className='buttonSearch' onclick={()=>alert(123)}/>
          <input type="text" placeholder={p.placeholder} />
        </div>
      );
    }