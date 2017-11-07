import * as React from 'react';
import { like, dic, 注册通知, 移除通知 } from './gobal'

export class XXXXXX extends React.Component<{}, { count: number }> {


    f = () => {
        this.setState({
            count: dic.myCollect.length
        })
    }

    componentWillMount() {
        this.setState({ count: dic.myCollect.length })
        注册通知(this.f)
    }

    componentWillUnmount() {
        移除通知(this.f)
    }

    render() {
        return <h1>当前收藏数量 {this.state.count} </h1>
    }
}
