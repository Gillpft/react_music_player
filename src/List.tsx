import * as React from 'react';
import './Search.css';

import { ListItem } from './ListItem'

import { search, Song, setMusicState } from './QQMusicAPI'

import { like, dic, publish, subscribe,unsubscribe } from './gobal'

const S = {
  nowPlayID: -1, //当前播放的歌曲id
  nowPlayImgURL: '',
  isPlaying: true,
}

export class List extends React.Component<{ listClassName: string, list: Song[], collect: (v: Song) => void, getCollect: (v: Song) => boolean }, typeof S>{
  f = () => {
    this.setState({
      nowPlayID: dic.nowPlayID,
      nowPlayImgURL: dic.nowPlayImgURL,
      isPlaying: dic.isPlaying
    })
  }
  componentWillMount() {
    this.setState({
      ...S,
      nowPlayID: dic.nowPlayID,
      nowPlayImgURL: dic.nowPlayImgURL,
      isPlaying: dic.isPlaying,
    })
    subscribe(this.f)
  }

  componentWillUnmount() {
    unsubscribe(this.f)
  }

  play(song: Song) {
    this.setState({
      nowPlayID: song.songid,
      nowPlayImgURL: song.albumImageURL,
      isPlaying: song.songid == this.state.nowPlayID && this.state.isPlaying ? false : true
    }, () => {
      setMusicState({ songid: song.songid, playing: this.state.isPlaying, song:dic.myCollect })
      dic.nowPlayID = song.songid
      dic.nowPlayImgURL = song.albumImageURL
      dic.isPlaying = this.state.isPlaying
      dic.nowPlaySongName = song.songname
      dic.nowPlaySong = song
      dic.isCollected = dic.myCollect.find(v=>v.songid==this.state.nowPlayID)!=null
      publish()
    })
  }

  isPlaying(song: Song) {
    return this.state.nowPlayID == song.songid && this.state.isPlaying
  }

  render() {
    return <div className={this.props.listClassName}>
      {this.props.list.map((v, index) =>
        <ListItem
          key={v.songid}
          songName={v.songname}
          singer={v.singerName}
          onClickPlay={() => this.play(v)}
          isPlay={this.isPlaying(v)}
          onClickCollect={() => this.props.collect(v)}
          isCollect={this.props.getCollect(v)}
        />
      )}
    </div>

  }
}