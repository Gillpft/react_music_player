import * as React from 'react';
import './index.css';

import { ListItem } from './ListItem'
import { Tabbar } from './Tabbar'

import { search, Song, setMusicState } from './QQMusicAPI'
import { myCollect } from './gobal'

const S = {
    nowPlayID: -1, //当前播放的歌曲id
    collectIDs: [] as number[],//收藏的歌曲id 数组
    list: [] as Song[]
}

export class MyMusic extends React.Component<{ myMusic: () => void, search: () => void }, typeof S>{

    componentWillMount() {

        this.setState({
            list: myCollect
        })

    }

    play(song: Song) {


        setMusicState({ songid: song.songid, playing: true })
        this.setState({
            nowPlayID: song.songid
        })

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
            myCollect.push(song)
        }
    }

    getCollect(song: Song) {
        return this.state.collectIDs.find(id => song.songid == id) != null
    }

    render() {

        return <div>
            <Tabbar
                changPage1={() => this.props.search()}
                changPage2={() => this.props.myMusic()}
                value={this.state.textSearch}
                backgroundColor1='rgba(128, 128, 128, 0)'
                backgroundColor2='rgba(128, 128, 128, 0.5)' />

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
    }
}