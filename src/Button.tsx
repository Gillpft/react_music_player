import * as React from 'react'
import './Button.css'

export const Button = (p: { text?: string, img?: string, backgroundColor?:string, className?:string, onclick?: () => void }) => {
  if (p.text != null) {
    return <button className={p.className} style={{backgroundColor:p.backgroundColor}} onClick={p.onclick}>{p.text}</button>
  }
  if (p.img != null) {
    return <button className={p.className} onClick={p.onclick}>
      <img className='buttonImg' src={p.img} ></img>
    </button>
  }
  return <button></button>
}