import * as React from 'react'

import { getCurrentTime, getDuration, getLrc } from './QQMusicAPI'

export class Lrc extends React.Component<{}, { lrc: string }> {

    cancel: boolean

    onFrame() {

        let n = Math.floor(getCurrentTime() * 100)
        let arr = getLrc()
        let lrc = ''
        let index = -1

        for (let i = 0; i < arr.length; i++) {

            if (arr[i].time <= n && (i == arr.length - 1 || arr[i + 1].time > n)) {
                index = i
                break
            }

        }

        if (index != -1) {
            lrc = arr[index].lrc
        } else {
            lrc = '--'
        }

        if (lrc != this.state.lrc) {
            this.setState({ lrc })
        }

        if (this.cancel == false) {
            requestAnimationFrame(() => this.onFrame())
        }
    }

    componentWillMount() {
        this.cancel = false
        this.state = { lrc: '' }
        this.onFrame()
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
        this.cancel = true
    }


    render() {
        return <h1 style={{color:'#cc66ff'}}>{this.state.lrc}</h1>
    }

}