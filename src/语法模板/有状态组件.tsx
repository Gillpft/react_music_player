import * as React from 'react'

type P = {
    text: string
    a: number
    b: number
    c: number
}

const S = {
    text: 'hello',
    p: {
        x: 0,
        y: 0
    },
    arr: [1, 2, 3]
}

export class HelloWorld extends React.Component<P, typeof S> {


    componentWillMount() {
        this.state = S
    }


    //
    render() {
        return <h1>hello world</h1>
    }


    //数组 map
    render2() {
        return <div>
            {
                this.state.arr.map(
                    v =>
                        <h1>hello {v}</h1>
                )
            }
        </div>
    }



}