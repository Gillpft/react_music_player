import * as React from 'react';
import './Search.css';

import { Tabbar } from './Tabbar'
import { List } from './List'
import { Button } from './Button'

import { search, Song, setMusicState } from './QQMusicAPI'

import { like, store, callAllFunc, pushFunc, removeFunc } from './gobal'

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
            textSearch: store.textSearch,
            listSearch: store.searchList,
            collectIDs: store.myCollect.map(v => v.songid),
            nowPlayID: store.nowPlayID
        })
    }
    componentWillMount() {
        this.setState({
            ...S,
            textSearch: store.textSearch,
            listSearch: store.searchList,
            collectIDs: store.myCollect.map(v => v.songid),
            nowPlayID: store.nowPlayID
        })
        this.change(store.textSearch)
        pushFunc(this.f)
    }

    componentWillUnmount() {
        removeFunc(this.f)
    }

    change(text: string) {
        this.setState({
            textSearch: text
        })

        store.textSearch = text

        search(text, list => {
            this.setState({ listSearch: list })
            store.searchList = list
        })
        callAllFunc()
    }

    collect(song: Song) {
        if (this.getCollect(song)) {
            //取消收藏
            this.setState({
                collectIDs: this.state.collectIDs.filter(id => id != song.songid)
            })
            store.myCollect = store.myCollect.filter(v => v.songid != song.songid)
            store.isCollected = store.myCollect.find(v => v.songid == this.state.nowPlayID) != null
            callAllFunc()
        } else {
            //收藏
            this.setState({
                collectIDs: [...this.state.collectIDs, song.songid]
            })
            like(song)
            store.isCollected = store.myCollect.find(v => v.songid == this.state.nowPlayID) != null
            callAllFunc()
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