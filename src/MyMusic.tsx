import * as React from 'react';
import './MyMusic.css';

import { List } from './List'
import { Tabbar } from './Tabbar'
import { Button } from './Button'
import { SearchBox } from './SearchBox'
import { LrcOneLine, LrcScroll, Lrc5Line } from './Lrc'
import { ImgRotate } from './ImgRotate'

import { search, Song, setMusicState } from './QQMusicAPI'
import { like, dic, 注册通知, 撤销通知,save } from './gobal'

const S = {
  textSearch: '',
  collectList: [] as Song[],
  nowPlayImgURL: ''
}

export class MyMusic extends React.Component<{ myMusic: () => void, search: () => void }, typeof S>{

  f = () => {
    this.setState({
      nowPlayImgURL: dic.nowPlayImgURL
    })
  }

  componentWillMount() {
    this.setState({
      ...S,
      textSearch: dic.textSearch,
      collectList: dic.myCollect,
      nowPlayImgURL: dic.nowPlayImgURL
    })
    注册通知(this.f)
  }

  componentWillUnmount() {
    撤销通知(this.f)
  }

  collect(song: Song) {
    //取消收藏
    dic.myCollect = dic.myCollect.filter(v => v.songid != song.songid)
    this.setState({
      collectList: dic.myCollect
    })
    save()
  }

  getcollect(song: Song) {
    return true
  }

  onChange(text: string) {
    dic.textSearch = text
    this.setState({
      textSearch: dic.textSearch
    })
  }

  render() {

    return <div className='MyMusic'>
      <div className='MyMusicTop'>
        <Tabbar
          changPage1={() => this.props.search()}
          changPage2={() => this.props.myMusic()}
          backgroundColor1='rgba(128, 128, 128, 0)'
          backgroundColor2='rgba(255, 192, 204, 0.7)' />
        <SearchBox
          placeholder='想听什么歌'
          value={this.state.textSearch}
          marginLeft={900}
          marginTop={30}
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
        </div>
      </div>
    </div>
  }
}