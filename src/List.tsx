import * as React from 'react';
import './Search.css';

import { ListItem } from './ListItem'

import { search, Song, setMusicState } from './QQMusicAPI'

import { like, store, callAllFunc, pushFunc,removeFunc } from './gobal'

const S = {
  nowPlayID: -1, //当前播放的歌曲id
  nowPlayImgURL: '',
  isPlaying: true,
}

export class List extends React.Component<{ listClassName: string, list: Song[], collect: (v: Song) => void, getCollect: (v: Song) => boolean }, typeof S>{
  f = () => {
    this.setState({
      nowPlayID: store.nowPlayID,
      nowPlayImgURL: store.nowPlayImgURL,
      isPlaying: store.isPlaying
    })
  }
  componentWillMount() {
    this.setState({
      ...S,
      nowPlayID: store.nowPlayID,
      nowPlayImgURL: store.nowPlayImgURL,
      isPlaying: store.isPlaying,
    })
    pushFunc(this.f)
  }

  componentWillUnmount() {
    removeFunc(this.f)
  }

  play(song: Song) {
    this.setState({
      nowPlayID: song.songid,
      nowPlayImgURL: song.albumImageURL,
      isPlaying: song.songid == this.state.nowPlayID && this.state.isPlaying ? false : true
    }, () => {
      setMusicState({ songid: song.songid, playing: this.state.isPlaying, song:store.myCollect })
      store.nowPlayID = song.songid
      store.nowPlayImgURL = song.albumImageURL
      store.isPlaying = this.state.isPlaying
      store.nowPlaySongName = song.songname
      store.nowPlaySong = song
      store.isCollected = store.myCollect.find(v=>v.songid==this.state.nowPlayID)!=null
      callAllFunc()
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