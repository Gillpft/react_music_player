import * as React from 'react'
import './index.css'

export const Button = (p: { text?: string, textColor?:string,background?:string,img?: string, width?:number, height?:number,margin?:number, onclick: () => void }) => {
  if (p.text != null) {
    return <button className='button' style={{color:p.textColor,backgroundColor:p.background}} onClick={p.onclick}>{p.text}</button>
  }
  if (p.img != null) {
    return <button className='button' onClick={p.onclick}>
    <img className='img' src={p.img} ></img>
    </button>
  }
  if (p.margin != null) {
    return <button className='buttonO' style={{width:p.width,height:p.height,marginTop:p.margin}}></button>
  }
  return <button className='buttonO' style={{width:p.width,height:p.height}}></button>
}