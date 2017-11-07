import * as React from 'react';
import './Search.css';

import { ListItem } from './ListItem'

import { search, Song, setMusicState } from './QQMusicAPI'

import { like, dic, 发送通知 } from './gobal'

const S = {
  nowPlayID: -1, //当前播放的歌曲id
  nowPlayImgURL: '',
  isPlaying: true,
}

export class List extends React.Component<{ listClassName: string, list: Song[], collect: (v: Song) => void, getCollect: (v: Song) => boolean }, typeof S>{

  componentWillMount() {
    this.setState({
      ...S,
      nowPlayID: dic.nowPlayID,
      nowPlayImgURL: dic.nowPlayImgURL,
      isPlaying: dic.isPlaying,
    })
  }

  play(song: Song) {
    this.setState({
      nowPlayID: song.songid,
      nowPlayImgURL: song.albumImageURL,
      isPlaying: song.songid == this.state.nowPlayID && this.state.isPlaying ? false : true
    }, () => {
      setMusicState({ songid: song.songid, playing: this.state.isPlaying })
      dic.nowPlayID = song.songid
      dic.nowPlayImgURL = song.albumImageURL
      dic.isPlaying = this.state.isPlaying
      发送通知()
    })
  }

  isPlaying(song: Song) {
    return this.state.nowPlayID == song.songid && this.state.isPlaying
  }

  render() {
    return <div className={this.props.listClassName}>
      {this.props.list.map((v, index) =>
        <ListItem
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