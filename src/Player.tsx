import * as React from 'react'
import './Player.css'

import { Button } from './Button'

import { search, Song, setMusicState } from './QQMusicAPI'

import { like, store, pushFunc, removeFunc, callAllFunc, save, changeSong } from './gobal'

const S = {
    isPlaying: false,
    nowPlaySongName: '',
    nowPlayID: -1,
    isCollected: true,
}

export class Player extends React.Component<{}, typeof S>{
    f = () => {
        this.setState({
            isPlaying: store.isPlaying,
            nowPlaySongName: store.nowPlaySongName,
            nowPlayID: store.nowPlayID,
            isCollected: store.isCollected
        })
    }

    componentWillMount() {
        this.setState({
            ...S,
            nowPlaySongName: store.nowPlaySongName,
            nowPlayID: store.nowPlayID,
            isPlaying: store.isPlaying,
            isCollected: store.isCollected
        })
        pushFunc(this.f)
    }

    componentWillUnmount() {
        removeFunc(this.f)
    }

    play() {
        store.isPlaying = !store.isPlaying
        this.setState({
            isPlaying: store.isPlaying,
        }, () => {
            setMusicState({ songid: store.nowPlayID, playing: this.state.isPlaying,song:store.myCollect })
            callAllFunc()
        })
    }
    collect(songid: number) {
        
        if (this.state.isCollected) {
            //取消收藏
            this.setState({
                isCollected:store.isCollected
            })
            store.myCollect = store.myCollect.filter(v => v.songid != songid)
            store.isCollected=!store.isCollected
            callAllFunc()
        } else {
            //收藏
            this.setState({
                isCollected:store.isCollected
            })
            like(store.nowPlaySong)
            store.isCollected=!store.isCollected
            callAllFunc()
        }
    }

    
    render() {
        return <div className='PlayerButton'>
                <Button text='|<<' className='button1' onclick={() => changeSong(this.state.nowPlayID,-1)} />
                <Button img={this.state.isPlaying ? 'stop.png' : 'play.png'} className='button2' onclick={() => this.play()} />
                <Button text='>>|' className='button1' onclick={() => changeSong(this.state.nowPlayID,1)} />
                {this.state.nowPlayID==-1?   <h6></h6>:
                <Button img={this.state.isCollected ? 'collect.png' : 'discollect.png'} className='buttonList' onclick={() => this.collect(this.state.nowPlayID)} />}
            </div>

    }
}             