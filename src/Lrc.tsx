import * as React from 'react'
import './Lrc.css'

import { createLRC } from './QQMusicAPI'


/*
生命周期
高阶组件
this
全局状态改变通知
不可变数据
函数式编程
flux
setState
key
*/

export const LrcScroll = createLRC(p => <div className="Lrc">
    {
        p.lrc.map((v, index) =>
            <div key={index} className={p.index == index ? 'Lrc-2' : 'Lrc-1'}>{v}</div>
        )
    }
</div>)


export const LrcOneLine = createLRC(p => <div>{p.lrc[p.index]}</div>)


export const Lrc5Line = createLRC(p => {
    return <div className="Lrc">
        <div className="Lrc-1">{p.index > 1 ? p.lrc[p.index - 2] : '--'}</div>
        <div className="Lrc-1">{p.index > 0 ? p.lrc[p.index - 1] : '--'}</div>
        <div className="Lrc-2">{p.lrc[p.index]}</div>
        <div className="Lrc-1">{p.index < p.lrc.length - 1 ? p.lrc[p.index + 1] : '--'}</div>
        <div className="Lrc-1">{p.index < p.lrc.length - 2 ? p.lrc[p.index + 2] : '--'}</div>
    </div>
})