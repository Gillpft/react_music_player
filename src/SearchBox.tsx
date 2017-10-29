import * as React from 'react';
import './index.css';

import { Button } from './Button'

export const SearchBox = (p: { placeholder: string, value: string, marginLeft: number, onChange: (v: string) => void, search?: () => void }) => {

  return (
    <div className='searchBox' style={{ marginLeft: p.marginLeft }}>
      <input type="text" className='searchInput' value={p.value} placeholder={p.placeholder} onChange={v => p.onChange(v.target.value)} />
      <Button text='🔍' className='buttonSearch' onclick={() => p.search()} />
    </div>
  );
}