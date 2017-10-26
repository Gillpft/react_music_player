import * as React from 'react'
import './index.css'

import { Button } from './Button'

export const VolumeBar = (p: { volume: number, onclick: () => void }) => {
    return <div className="container" style={{width:'5px'}}>
            <div className="bar">
                <span className="bar-unfill" style={{ height: 60}}>
                    <Button width={6} height={6} onclick={() => alert(123)} margin={p.volume}/>
                </span>
            </div>
        </div>
    
    }