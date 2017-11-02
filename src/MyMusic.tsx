import * as React from 'react';
import './MyMusic.css';

import { ListItem } from './ListItem'
import { Tabbar } from './Tabbar'
import { Button } from './Button'
import { SearchBox } from './SearchBox'
import { LrcOneLine, LrcScroll, Lrc5Line } from './Lrc'
import { ImgRotate } from './ImgRotate'

import { search, Song, setMusicState } from './QQMusicAPI'
import { like, dic } from './gobal'

const S = {
  nowPlayID: -1, //当前播放的歌曲id
  nowPlayImgURL: '',
  textSearch: dic.textSearch,
  isPlaying: true,
  list: [] as Song[],
  backgroundColor1: 'rgba(128, 128, 128, 0.5)',
  backgroundColor2: 'rgba(128, 128, 128, 0)'
}

export class MyMusic extends React.Component<{ myMusic: () => void, search: () => void }, typeof S>{

  componentWillMount() {
    this.setState({
      ...S,
      textSearch: dic.textSearch,
      nowPlayID: dic.nowPlayID,
      list: dic.myCollect,
      nowPlayImgURL: dic.nowPlayImgURL,
      isPlaying: dic.isPlaying
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
    })
  }

  collect(song: Song) {
    //取消收藏
    dic.myCollect = dic.myCollect.filter(v => v.songid != song.songid)
    this.setState({
      list: dic.myCollect
    })
  }

  onChange(text: string) {
    dic.textSearch = text
    this.setState({
      textSearch: dic.textSearch
    })
  }

  isPlaying(song: Song) {
    return this.state.nowPlayID == song.songid && this.state.isPlaying
  }

  render() {

    return <div className='myMusic'>
      <div className='myMusicTop'>
        <Tabbar
          changPage1={() => this.props.search()}
          changPage2={() => this.props.myMusic()}
          backgroundColor1='rgba(128, 128, 128, 0)'
          backgroundColor2='rgba(255, 192, 204, 0.7)' />
        <SearchBox
          placeholder='请输入搜索内容'
          value={this.state.textSearch}
          marginLeft={900}
          marginTop={30}
          onChange={v => this.onChange(v)}
          search={() => this.props.search()} />
      </div>
      <div className='myMusicBody'>
        <div className='myMusicList'>
          {this.state.list.map((v, index) =>
            <ListItem
              img={v.albumImageURL}
              songName={v.songname}
              singer={v.singerName}
              onClickPlay={() => this.play(v)}
              isPlay={this.isPlaying(v)}
              onClickCollect={() => this.collect(v)}
              isCollect={true}
            />
          )}
        </div>
        <div className='player'>
          <ImgRotate songImg={this.state.nowPlayImgURL} />
          <Lrc5Line />
        </div>
      </div>
    </div>
  }
}