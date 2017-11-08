import * as React from 'react'
import './Player.css'

import { Button } from './Button'
import { ProgressBar } from './ProgressBar'
import { VolumeBar } from './VolumeBar'
import { search, Song, setMusicState } from './QQMusicAPI'

import { like, dic, 注册通知, 撤销通知, 发送通知, save, changeSong } from './gobal'

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
        注册通知(this.f)
    }

    componentWillUnmount() {
        撤销通知(this.f)
    }

    play() {
        dic.isPlaying = !dic.isPlaying
        this.setState({
            isPlaying: dic.isPlaying,
        }, () => {
            setMusicState({ songid: dic.nowPlayID, playing: this.state.isPlaying })
            发送通知()
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
            发送通知()
        } else {
            //收藏
            this.setState({
                isCollected:dic.isCollected
            })
            like(dic.nowPlaySong)
            dic.isCollected=!dic.isCollected
            发送通知()
        }
    }

    
    render() {
        return <div className='Player'>
            <div className='PlayerButton'>
                <Button text='|<<' className='button1' onclick={() => changeSong(this.state.nowPlayID,-1)} />
                <Button img={this.state.isPlaying ? 'stop.png' : 'play.png'} className='button2' onclick={() => this.play()} />
                <Button text='>>|' className='button1' onclick={() => changeSong(this.state.nowPlayID,1)} />
            </div>
            <div className='PlayerBar' >
                <ProgressBar time={60} onclick={() => alert(123)} />
                <VolumeBar onclick={() => alert(123)} />
            </div >
            <div className='Playerset'>
                <Button img={this.state.isCollected ? 'collect.png' : 'discollect.png'} className='buttonList' onclick={() => this.collect(this.state.nowPlayID)} />
            </div>
        </div>
    }
}             