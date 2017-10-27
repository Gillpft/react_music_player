import * as React from 'react';
import './index.css';

import { Tabbar } from './Tabbar'
import { Search } from './Search'
import { ListItem } from './ListItem'

import { search, Song, setMusicState } from './QQMusicAPI'

export class App extends React.Component<{}, 
{textSearch: string,listSearch:[],change:()=>void}>{
    state = {
        textSearch: '',
        listSearch:[],
    }
    change(text:string){
        this.setState({testSearch:text})
        search(test,list=>{
            this.setState(listSearch:list)
        })
    }
    componentWillMount(){
        
    }
    componentWillUnmount(){
        //
    }
    render() {

        return <div className='songList'>
            <input type="text" value={this.state.textSearch} 
            onChange={v=>this.state.change(v.target.value)}/>
    </div>
    }
}
