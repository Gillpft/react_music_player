import * as React from 'react';
import './index.css';

import {Button} from './Button'

export  const Search =(p:{})=> {
      
      return (
        <div>
          <input ><Button text='🔍' onclick={()=>alert(123)}/></input>

        </div>
      );
    }