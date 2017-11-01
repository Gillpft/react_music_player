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


export const Lrc3Line = createLRC(p => {
    return <div>
        <div>{p.index > 0 ? p.lrc[p.index - 1] : '---'}</div>
        <div style={{ color: 'red' }}>{p.lrc[p.index]}</div>
        <div>{p.index < p.lrc.length - 1 ? p.lrc[p.index + 1] : '---'}</div>
    </div>
})