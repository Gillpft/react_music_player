import * as React from 'react';
import './index.css';

import { Tabbar } from './Tabbar'
import { Search } from './Search'
import { ListItem } from './ListItem'

import { search, Song, setMusicState } from './QQMusicAPI'

const S = {
    textSearch: '',
    listSearch: [] as Song[],

    //
    nowPlayID: -1, //当前播放的歌曲id
    collectIDs: [] as number[],//收藏的歌曲id 数组
}

export class APP extends React.Component<{}, typeof S>{

    change(text: string) {
        this.setState({
            textSearch: text
        })

        search(text, list => {
            // console.log(list)
            this.setState({ listSearch: list })

        })
    }

    play(song: Song) {
        setMusicState({ songURL: song.songURL, playing: true })
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
        }


    }

    componentWillMount() {
        this.state = S
    }


    getCollect(song: Song) {
        return this.state.collectIDs.find(id => song.songid == id) != null
    }


    render() {

        return <div className='songList'>
            <input type="text" value={this.state.textSearch}
                onChange={v => this.change(v.target.value)} />

            {this.state.listSearch.map((v, index) =>

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