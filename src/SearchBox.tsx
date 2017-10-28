import * as React from 'react';
import './index.css';

import {Button} from './Button'

export  const SearchBox =(p:{placeholder:string,value:string,marginLeft:number,search:()=>void})=> {
      
      return (
        <div className='searchBox' style={{marginLeft:p.marginLeft}}>
          <input type="text" className='searchInput' value={p.value} placeholder={p.placeholder} />
          <Button text='🔍' className='buttonSearch' onclick={()=>p.search()}/>
        </div>
      );
    }