export type Song = {
    albumid: number
    albumname: string
    singer: {
        id: number
        name: string
    }[]
    singerName: string
    songid: number
    songname: string

    //ext
    albumImageURL: string
}

let lrcArr = { xxx: [] as { time: number, lrc: string }[] }


let div = document.createElement('div')

const html = (str: string) => {
    div.innerHTML = str
    return div.innerText
}


type SearchCallback = {
    code: number
    data: {
        keyword: string
        song: {
            list: Song[]
        }
    }
}

const SEARCH_CALLBACK = '___SEARCH_CALLBACK___'

const dic: { [index: string]: (songList: Song[]) => void } = Object.create(null)

window[SEARCH_CALLBACK] = (d: SearchCallback) => {
    const keyword = d.data.keyword
    if (searchKeyword != keyword) {
        return
    }
    const f = dic[keyword]
    const list = d.data.song.list

    list.forEach(v => {
        v.songname = html(v.songname)
        v.singerName = html(v.singer.map(v => v.name).join(' '))
        v.albumname = html(v.albumname)
        v.albumImageURL = `http://imgcache.qq.com/music/photo/album_300/${v.albumid % 100}/300_albumpic_${v.albumid}_0.jpg`
    })

    if (f != null) {
        f(list)
        delete dic[keyword]
    }
}


let searchKeyword = ''
export const search = (keyword: string, callback: (songList: Song[]) => void) => {
    dic[keyword] = callback
    searchKeyword = keyword
    const node = document.createElement('script')
    node.src = `https://c.y.qq.com/soso/fcgi-bin/search_cp?&p=1&n=50&w=${encodeURI(keyword)}&aggr=1&lossless=1&cr=1&jsonpCallback=${SEARCH_CALLBACK}`
    document.body.appendChild(node)
    node.onload = () => document.body.removeChild(node)
}



//!!!!!!!!!!!!!!!
const LRC_CALLBACK = '___LRC_CALLBACK___'
let lrcCALLBACK = (f: any) => { }

window[LRC_CALLBACK] = (d: any) => {
    try {
        let lrc = html(d.lyric)
        let arr = lrc.match(/\[\d\d:\d\d.\d\d\].+/g)
        let objArr = arr.map(v => {
            let a = Number(v.slice(1, 3))
            let b = Number(v.slice(4, 6))
            let c = Number(v.slice(7, 9))
            let time = a * 60 * 100 + b * 100 + c
            let lrc = v.slice(10)
            return { time, lrc }
        })
        lrcArr.xxx = objArr
    } catch (e) {

    }
}

const searchLRC = (songid: number) => {
    const node = document.createElement('script')
    node.src = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=${songid}&callback=jsonp1&g_tk=5381&jsonpCallback=${LRC_CALLBACK}&loginUin=0&hostUin=0&format=jsonp1&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
    document.body.appendChild(node)
    node.onload = () => document.body.removeChild(node)
    lrcArr.xxx = []
}




export const audio = new Audio()
let isPlaying = false



const getCurrentTime = () => audio.currentTime
const getDuration = () => audio.duration
const getLrc = () => lrcArr.xxx

let aaa: any = null

export const setMusicState = (s: { songid: number, playing: boolean, song: Song[] }) => {

    if (audio.src != `http://ws.stream.qqmusic.qq.com/${s.songid}.m4a?fromtag=46`) {
        audio.src = `http://ws.stream.qqmusic.qq.com/${s.songid}.m4a?fromtag=46`
        isPlaying = false
        searchLRC(s.songid)

        //!!!!!!!!
        // if (aaa != null) {
        //     clearTimeout(aaa)
        //     aaa = null
        // }
        // aaa = setTimeout(() => {
        //     aaa = null
        //     audio.onended({} as any)
        // }, 3000);
        //!!!!!!!!

    }

    if (s.playing) {
        if (!isPlaying) {
            isPlaying = true
            audio.play()
        }
    } else {
        if (isPlaying) {
            isPlaying = false
            audio.pause()
        }
    }
}


import * as React from 'react'
export const createLRC = (func: (p: { index: number, lrc: string[] }) => JSX.Element) => class Lrc extends React.Component<{}, { index: number, lrc: string[] }> {

    n = -1

    onFrame() {

        let n = Math.floor(getCurrentTime() * 100)
        let arr = getLrc()
        let lrc = ''
        let index = -1

        for (let i = 0; i < arr.length; i++) {

            if (arr[i].time <= n && (i == arr.length - 1 || arr[i + 1].time > n)) {
                index = i
                break
            }

        }

        this.setState({
            index: index,
            lrc: arr.map(v => v.lrc)
        })


        this.n = requestAnimationFrame(() => this.onFrame())

    }

    componentWillMount() {
        this.setState({ index: -1, lrc: ['', '', ''] }, () => this.onFrame())
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.n)
    }

    render() {
        return func(this.state)
    }

}