import * as React from 'react';
import { like, dic, 注册通知, 移除通知 } from './gobal'

export class XXXXXX extends React.Component<{}, { nowPlay: number }> {


    f = () => {
        this.setState({
            nowPlay: dic.nowPlayID
        })
    }

    componentWillMount() {
        this.setState({ nowPlay: dic.nowPlayID })
        注册通知(this.f)
    }

    componentWillUnmount() {
        移除通知(this.f)
    }

    render() {
        return <h1>当前播放的是 {this.state.nowPlay} </h1>
    }
}
