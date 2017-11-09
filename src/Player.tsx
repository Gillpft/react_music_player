import * as React from 'react'
import './Player.css'

import { Button } from './Button'
import { ProgressBar } from './ProgressBar'
import { VolumeBar } from './VolumeBar'
import { search, Song, setMusicState } from './QQMusicAPI'

import { like, dic, subscribe, unsubscribe, publish, save, changeSong } from './gobal'

const S = {
    isPlaying: false,
    nowPlaySongName: '',
    nowPlayID: -1,
    isCollected: true,
}

export class Player extends React.Component<{}, typeof S>{
    f = () => {
        this.setState({
            isPlaying: dic.isPlaying,
            nowPlaySongName: dic.nowPlaySongName,
            nowPlayID: dic.nowPlayID,
            isCollected: dic.isCollected
        })
    }

    componentWillMount() {
        this.setState({
            ...S,
            nowPlaySongName: dic.nowPlaySongName,
            nowPlayID: dic.nowPlayID,
            isPlaying: dic.isPlaying,
            isCollected: dic.isCollected
        })
        subscribe(this.f)
    }

    componentWillUnmount() {
        unsubscribe(this.f)
    }

    play() {
        dic.isPlaying = !dic.isPlaying
        this.setState({
            isPlaying: dic.isPlaying,
        }, () => {
            setMusicState({ songid: dic.nowPlayID, playing: this.state.isPlaying,song:dic.myCollect })
            publish()
        })
    }
    collect(songid: number) {
        
        if (this.state.isCollected) {
            //取消收藏
            this.setState({
                isCollected:dic.isCollected
            })
            dic.myCollect = dic.myCollect.filter(v => v.songid != songid)
            dic.isCollected=!dic.isCollected
            publish()
        } else {
            //收藏
            this.setState({
                isCollected:dic.isCollected
            })
            like(dic.nowPlaySong)
            dic.isCollected=!dic.isCollected
            publish()
        }
    }

    
    render() {
        return <div className='PlayerButton'>
                <Button text='|<<' className='button1' onclick={() => changeSong(this.state.nowPlayID,-1)} />
                <Button img={this.state.isPlaying ? 'stop.png' : 'play.png'} className='button2' onclick={() => this.play()} />
                <Button text='>>|' className='button1' onclick={() => changeSong(this.state.nowPlayID,1)} />
                <Button img={this.state.isCollected ? 'collect.png' : 'discollect.png'} className='buttonList' onclick={() => this.collect(this.state.nowPlayID)} />

            </div>

    }
}             