import * as React from 'react';
import './index.css';

import { ListItem } from './ListItem'
import { Tabbar } from './Tabbar'
import { Button } from './Button'

import { search, Song, setMusicState } from './QQMusicAPI'
import { like, changPage1, changPage2, dic } from './gobal'

const S = {
  textSearch: '',
  nowPlayID: -1, //当前播放的歌曲id
  collectIDs: [] as number[],//收藏的歌曲id 数组
  list: [] as Song[],
  backgroundColor1: 'rgba(128, 128, 128, 0.5)',
  backgroundColor2: 'rgba(128, 128, 128, 0)'
}

export class MyMusic extends React.Component<{ myMusic: () => void, search: () => void }, typeof S>{

  componentWillMount() {
    this.setState({
      ...S,
      nowPlayID: dic.nowPlayID,
      list: dic.myCollect
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
    if (this.getCollect(song)) {
      //取消收藏
      this.setState({
        collectIDs: this.state.collectIDs.filter(id => id != song.songid)
      })
    } else {
      //收藏
      this.setState({
        collectIDs: [...this.state.collectIDs, song.songid]
      })
      like(song)
    }
  }

  getCollect(song: Song) {
    return this.state.collectIDs.find(id => song.songid == id) != null
  }

  render() {

    return <div className='myMusic'>
      <Tabbar
        changPage1={() => this.props.search()}
        changPage2={() => this.props.myMusic()}
        value={this.state.textSearch}
        backgroundColor1='rgba(128, 128, 128, 0)'
        backgroundColor2='rgba(128, 128, 128, 0.2)' />

      <div className='myMusicList'>
        <div className='tabbarMyMusic'>
          <Button text='添加' className='buttonMyMusicTrue' backgroundColor={this.state.backgroundColor1} onclick={() => changPage1()} />
          <Button text='收藏' className='buttonMyMusicFalse' backgroundColor={this.state.backgroundColor2} onclick={() => changPage2()} />
        </div>
        {this.state.list.map((v, index) =>
          <ListItem
            img={v.albumImageURL}
            songName={v.songname}
            singer={v.singerName}
            onClickPlay={() => this.play(v)}
            isPlay={this.state.nowPlayID == v.songid}
            onClickCollect={() => this.collect(v)}
            isCollect={this.getCollect(v)}
          />
        )}
      </div>
    </div>
  }
}