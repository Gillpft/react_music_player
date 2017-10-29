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


export const search = (keyword: string, callback: (songList: Song[]) => void) => {
    dic[keyword] = callback
    const node = document.createElement('script')
    node.src = `http://c.y.qq.com/soso/fcgi-bin/search_cp?&p=1&n=50&w=${encodeURI(keyword)}&aggr=1&lossless=1&cr=1&jsonpCallback=${SEARCH_CALLBACK}`
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




let audio = new Audio()
audio.loop = true
let isPlaying = false

export const getCurrentTime = () => audio.currentTime
export const getDuration = () => audio.duration
export const getLrc = () => lrcArr.xxx

export const setMusicState = (s: { songid: number, playing: boolean }) => {

    if (audio.src != `http://ws.stream.qqmusic.qq.com/${s.songid}.m4a?fromtag=46`) {
        audio.src = `http://ws.stream.qqmusic.qq.com/${s.songid}.m4a?fromtag=46`
        isPlaying = false
        searchLRC(s.songid)
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