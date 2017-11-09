import * as React from 'react';
import './SearchBox.css';

import { Button } from './Button'

export const SearchBox = (p: { placeholder: string, value: string, onChange: (v: string) => void, search?: () => void }) => {

  return<div className='searchBox' >
      <input type="text" className='searchBoxInput' value={p.value} 
      placeholder={p.placeholder} onChange={v => p.onChange(v.target.value)} />
      <Button text='🔍' className='SearchBoxbutton' onclick={() => p.search()} />
    </div>
}