import * as React from 'react'
import './ProgressBar.css'

import { Button } from './Button'

export const ProgressBar = (p: { time: number, onclick: () => void }) => {
    return <div className="ProgressBar">
        <div className="ProgressBarAll" style={{ width: '100%' }}>
            <div className="ProgressBarFill" style={{ width: p.time }}>
                <Button className='ProgressBarButton' onclick={() => alert(123)} />
            </div>
        </div>
    </div>

}