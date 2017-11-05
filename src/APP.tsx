import * as React from 'react';

import { MyMusic } from './MyMusic'
import { Search } from './Search'

import { search, Song, setMusicState } from './QQMusicAPI'

const S = {
    text: 'Search',
}

export class APP extends React.Component<{}, typeof S>{

    componentWillMount() {
        this.setState(S)
    }
    changePage(v:string){
        this.setState({
            text:v
        })
    }
    render() {
        if (this.state.text=='MyMusic')
        return <MyMusic myMusic={()=>this.changePage('MyMusic')} search={()=>this.changePage('Search')}/>
        return <Search myMusic={()=>this.changePage('MyMusic')} search={()=>this.changePage('Search')}/>
    }

}