import * as React from 'react';
import './MyMusic.css';

import { List } from './List'
import { Tabbar } from './Tabbar'
import { Button } from './Button'
import { SearchBox } from './SearchBox'
import { LrcOneLine, LrcScroll, Lrc5Line } from './Lrc'
import { ImgRotate } from './ImgRotate'
import { Player } from './Player'

import { search, Song, setMusicState } from './QQMusicAPI'
import { like, store, publish, subscribe, unsubscribe, save } from './gobal'

const S = {
  textSearch: '',
  collectList: [] as Song[],
  nowPlayImgURL: ''
}

export class MyMusic extends React.Component<{ myMusic: () => void, search: () => void }, typeof S>{

  f = () => {
    this.setState({
      textSearch: store.textSearch,
      collectList: store.myCollect,
      nowPlayImgURL: store.nowPlayImgURL
    })
  }

  componentWillMount() {
    this.setState({
      ...S,
      textSearch: store.textSearch,
      collectList: store.myCollect,
      nowPlayImgURL: store.nowPlayImgURL
    })
    subscribe(this.f)
  }

  componentWillUnmount() {
    unsubscribe(this.f)
  }

  collect(song: Song) {
    //取消收藏
    store.myCollect = store.myCollect.filter(v => v.songid != song.songid)
    this.setState({
      collectList: store.myCollect
    })
    store.isCollected = store.myCollect.find(v => v.songid == store.nowPlayID) != null
    save()
    publish()
  }

  getcollect(song: Song) {
    return true
  }

  onChange(text: string) {
    store.textSearch = text
    this.setState({
      textSearch: store.textSearch
    })
    publish()
  }

  render() {

    return <div className='MyMusic'>
      <div className='MyMusicTop'>
        <div className='MyMusicTabbar'>
          <Tabbar
            changPage1={() => this.props.search()}
            changPage2={() => this.props.myMusic()}
            backgroundColor1='rgba(128, 128, 128, 0)'
            backgroundColor2='rgba(255, 192, 204, 0.7)' />
        </div>
        <SearchBox
          placeholder='想听什么歌'
          value={this.state.textSearch}
          onChange={v => this.onChange(v)}
          search={() => this.props.search()} />
      </div>
      <div className='MyMusicBody'>
        <List
          listClassName='MyMusicList'
          list={this.state.collectList}
          collect={(v) => this.collect(v)}
          getCollect={(v) => this.getcollect(v)} />
        <div className='player' >
          <ImgRotate songImg={this.state.nowPlayImgURL} />
          <Lrc5Line />
          <Player />
        </div>
      </div>
    </div>
  }
}