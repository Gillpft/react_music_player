import * as React from 'react'
import './VolumeBar.css'

import { Button } from './Button'

export const VolumeBar = (p: {onclick: () => void }) => {
    return <div className="container" style={{width:'5px'}}>
            <div className="bar">
                <span className="bar-unfill" style={{ height: 60}}>
                    <Button className='button' onclick={() => alert(123)}/>
                </span>
            </div>
        </div>
    
    }