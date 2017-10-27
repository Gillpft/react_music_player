import * as React from 'react';
import './index.css';

import { Tabbar } from './Tabbar'
import { Search } from './Search'
import { ListItem } from './ListItem'

import { search, Song, setMusicState } from './QQMusicAPI'

export class App extends React.Component<{},{text:string,list:object}>{
    state={
        text:''
        list:[]
    }
    componentWillMountP{
        
        search(){

        }
    }
    componentWillUnmount{
        //
    }
    render() {
        return this.state.list.map(v=>{
            <img src='v.albumImageURL'
        })


    }
}
