import * as React from 'react';
import './Search.css';

import { Tabbar } from './Tabbar'
import { List } from './List'
import { Button } from './Button'

import { search, Song, setMusicState } from './QQMusicAPI'

import { like, dic, publish, subscribe, unsubscribe } from './gobal'

const S = {
    textSearch: '',
    listSearch: [] as Song[],
    collectIDs: [] as number[],//收藏的歌曲id 数组
    nowPlayID: -1
}

export class Search extends React.Component<{ myMusic: () => void, search: () => void }, typeof S>{
    f = () => {
        this.setState({
            ...S,
            textSearch: dic.textSearch,
            listSearch: dic.searchList,
            collectIDs: dic.myCollect.map(v => v.songid),
            nowPlayID: dic.nowPlayID
        })
    }
    componentWillMount() {
        this.setState({
            ...S,
            textSearch: dic.textSearch,
            listSearch: dic.searchList,
            collectIDs: dic.myCollect.map(v => v.songid),
            nowPlayID: dic.nowPlayID
        })
        this.change(dic.textSearch)
        subscribe(this.f)
    }

    componentWillUnmount() {
        unsubscribe(this.f)
    }

    change(text: string) {
        this.setState({
            textSearch: text
        })

        dic.textSearch = text

        search(text, list => {
            this.setState({ listSearch: list })
            dic.searchList = list
        })
        publish()
    }

    collect(song: Song) {
        if (this.getCollect(song)) {
            //取消收藏
            this.setState({
                collectIDs: this.state.collectIDs.filter(id => id != song.songid)
            })
            dic.myCollect = dic.myCollect.filter(v => v.songid != song.songid)
            dic.isCollected = dic.myCollect.find(v => v.songid == this.state.nowPlayID) != null
            publish()
        } else {
            //收藏
            this.setState({
                collectIDs: [...this.state.collectIDs, song.songid]
            })
            like(song)
            dic.isCollected = dic.myCollect.find(v => v.songid == this.state.nowPlayID) != null
            publish()
        }
    }

    getCollect(song: Song) {
        return this.state.collectIDs.find(id => song.songid == id) != null
    }

    render() {
        return <div className='Search'>

            <div className='SearchTabbar'>
                <Tabbar
                    changPage1={() => this.props.search()}
                    changPage2={() => this.props.myMusic()}
                    backgroundColor1='rgba(255, 192, 204, 0.7)'
                    backgroundColor2='rgba(255, 192, 204, 0)' />
            </div>
            <div className='SearchTopBox'>
                <div className='SearchInputBox'>
                    <input
                        className='SearchTopInput'
                        placeholder='想听什么歌'
                        type="text" value={this.state.textSearch}
                        onChange={v => this.change(v.target.value)} />
                </div>
            </div>
            <List
                listClassName='SearchList'
                list={this.state.listSearch}
                collect={(v) => this.collect(v)}
                getCollect={(v) => this.getCollect(v)} />
        </div>
    }
}