import * as React from 'react';
import './Search.css';

import { Tabbar } from './Tabbar'
import { List } from './List'
import { Button } from './Button'

import { search, Song, setMusicState } from './QQMusicAPI'

import { like, dic } from './gobal'

const S = {
    textSearch: '',
    listSearch: [] as Song[],
    collectIDs: [] as number[],//收藏的歌曲id 数组
}

export class Search extends React.Component<{ myMusic: () => void, search: () => void }, typeof S>{

    componentWillMount() {
        this.setState({
            ...S,
            textSearch: dic.textSearch,
            listSearch: dic.searchList,
            collectIDs: dic.myCollect.map(v => v.songid),
        })
        this.change(dic.textSearch)
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
    }

    collect(song: Song) {
        if (this.getCollect(song)) {
            //取消收藏
            this.setState({
                collectIDs: this.state.collectIDs.filter(id => id != song.songid)
            })
            dic.myCollect = dic.myCollect.filter(v => v.songid != song.songid)
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
        return <div className='Search'>
            <div className='SearchTop'>
                <Tabbar
                    changPage1={() => this.props.search()}
                    changPage2={() => this.props.myMusic()}
                    backgroundColor1='rgba(255, 192, 204, 0.7)'
                    backgroundColor2='rgba(255, 192, 204, 0)' />
                <div className='SearchTopBox'>
                    <div className='SearchInputBox'>
                        <input
                            className='SearchTopInput'
                            placeholder='请输入搜索内容'
                            type="text" value={this.state.textSearch}
                            onChange={v => this.change(v.target.value)} />
                    </div>
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