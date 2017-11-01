import * as React from 'react';
import './SearchBox.css';

import { Button } from './Button'

export const SearchBox = (p: { placeholder: string, value: string, marginLeft: number, marginTop:number, onChange: (v: string) => void, search?: () => void }) => {

  return<div className='searchBox' style={{ marginLeft: p.marginLeft, marginTop: p.marginTop}}>
      <input type="text" className='searchBoxInput' value={p.value} 
      placeholder={p.placeholder} onChange={v => p.onChange(v.target.value)} />
      <Button text='🔍' className='SearchBoxbutton' onclick={() => p.search()} />
    </div>
}