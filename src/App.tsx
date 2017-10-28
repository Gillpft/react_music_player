import * as React from 'react';
import './index.css';

import { Tabbar } from './Tabbar'
import { SearchBox } from './SearchBox'
import { ListItem } from './ListItem'
import { MusicMuseum } from './MusicMuseum'
import { Search } from './Search'

import { search, Song, setMusicState } from './QQMusicAPI'

const S = {
    text: 'MusicMuseum',
}

export class APP extends React.Component<{}, typeof S>{

    componentWillMount() {
        this.state = S
    }
    changePage(v:string){
        this.setState({
            text:v
        })
    }
    render() {
        if (this.state.text == 'MusicMuseum')
            return <MusicMuseum search={() => this.changePage('Search')}/>
            if (this.state.text == 'Search')
            return <Search />
        return <MusicMuseum search={() => this.changePage('Search')}/>
    }

}