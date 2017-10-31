import * as React from 'react'


import { Button } from './Button'

export const ProgressBar = (p: { time: number, onclick: () => void }) => {
    return <div className="container" style={{ width: '70%'}}>
        <div className="bar" >
            <span className="bar-unfill" style={{ height: 10}}>
                <span className="bar-fill" style={{ width: p.time,height: 8 }}>
                </span>
            </span>
        </div>
    </div>

}