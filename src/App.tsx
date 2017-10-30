import * as React from 'react';
import './index.css';


import { MyMusic } from './MyMusic'
import { Search } from './Search'

import { search, Song, setMusicState } from './QQMusicAPI'

const S = {
    text: 'Search',
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
        if (this.state.text=='MyMusic')
        return <MyMusic/>
        return <Search/>
    }

}