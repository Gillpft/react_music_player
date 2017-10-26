import * as React from 'react';
import './index.css';

import { Tabbar } from './Tabbar'
import { Search } from './Search'
import { ListItem } from './ListItem'

import { search, Song, setMusicState } from './QQMusicAPI'



export class App extends React.Component<{}, {
    list: Song[]
    text: string
    nowPlay: string
}> {


    componentWillMount() {
        this.state = {
            list: [],
            text: '',
            nowPlay: ''
        }
    }


    componentWillUnmount() {
        //
    }


    change(text: string) {

        this.setState({ text: text })

        search(text, list => {
            this.setState({ list: list })
        })
    }

    render() {
        return (
            <div>
                <input value={this.state.text} onChange={v => this.change(v.target.value)} />
                <h1>当前播放:{this.state.nowPlay}</h1>
                {
                    this.state.list.map(v =>
                        <ListItem
                            img={v.albumImageURL}
                            songName={v.songname}
                            singer={v.singerName}
                            onClick={
                                () => {
                                    setMusicState({
                                        songURL: v.songURL,
                                        playing: true
                                    })
                                    this.setState({nowPlay: v.songname })
                                }
                            }
                        />
                    )
                }

            </div>



        );


    }
}
