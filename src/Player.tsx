import * as React from 'react'
import './index.css'

import { Button } from './Button'
import { ProgressBar } from './ProgressBar'
import { VolumeBar } from './VolumeBar'

export class Player extends React.Component {

    p1 = { x: true }
    p2 = { x: true }

    switch = (p: { x: boolean }) => {
        p.x = !p.x
        this.forceUpdate()
    }

    render() {
        return <div>
            <div style={{ marginLeft: '35%', display: 'flex', flexDirection: 'row' }}>
                <Button text='<<' className='button' onclick={() => alert('123')} />
                {
                    this.p1.x
                        ?
                        <Button img="play.png" className='button' onclick={() => this.switch(this.p1)} />
                        :
                        <Button img="stop.png" className='button' onclick={() => this.switch(this.p1)} />
                }
                <Button text='>>' className='button' onclick={() => alert('123')} />
                <div style={{ marginLeft: '60%' }}>
                    {
                        this.p2.x
                            ?
                            <Button img="collect.png" className='buttonO' onclick={() => this.switch(this.p2)} />
                            :
                            <Button img="discollect.png" className='buttonO' onclick={() => this.switch(this.p2)} />
                    }
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '40' }}>
                <ProgressBar time={60} onclick={() => alert(123)} />
                <VolumeBar volume={20} onclick={() => alert(123)} />
            </div >
        </div>
    }
}             