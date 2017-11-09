import * as React from 'react'
import './VolumeBar.css'

import { Button } from './Button'

export const VolumeBar = (p: { onclick: () => void }) => {
    return <div className="VolumeBar">
        <div className="VolumeBarAll" style={{ height: 60 }}>
            <div className="VolumeBarFill" style={{ height: 20 }}>
                <Button className='VolumeBarButton' onclick={() => alert(123)} />
            </div>
        </div>
    </div>
}