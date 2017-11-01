import * as React from 'react';
import './MyMusic.css';

import { ListItem } from './ListItem'
import { Tabbar } from './Tabbar'
import { Button } from './Button'
import { SearchBox } from './SearchBox'
import { LrcOneLine, LrcScroll, Lrc3Line } from './Lrc'

import { search, Song, setMusicState } from './QQMusicAPI'
import { like, dic } from './gobal'

const S = {
  nowPlayID: -1, //当前播放的歌曲id
  textSearch: dic.textSearch,
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
    })
  }

  play(song: Song) {
    setMusicState({ songid: song.songid, playing: true })
    this.setState({
      nowPlayID: song.songid
    })
    dic.nowPlayID = song.songid
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

  render() {

    return <div className='myMusic'>
      <div className='myMusicTop'>
        <Tabbar
          changPage1={() => this.props.search()}
          changPage2={() => this.props.myMusic()}
          backgroundColor1='rgba(128, 128, 128, 0)'
          backgroundColor2='rgba(128, 128, 128, 0.5)' />
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
              isPlay={this.state.nowPlayID == v.songid}
              onClickCollect={() => this.collect(v)}
              isCollect={true}
            />
          )}
        </div>
        {/* <LrcOneLine /> */}
        <LrcScroll />
        {/* <Lrc3Line /> */}
      </div>
    </div>
  }
}