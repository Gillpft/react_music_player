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
    songURL: string
    albumImageURL: string
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
        v.singerName = v.singer[0].name
        v.songURL = `http://ws.stream.qqmusic.qq.com/${v.songid}.m4a?fromtag=46`
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
    node.src = `http://c.y.qq.com/soso/fcgi-bin/search_cp?&p=1&n=15&w=${encodeURI(keyword)}&aggr=1&lossless=1&cr=1&jsonpCallback=${SEARCH_CALLBACK}`
    document.body.appendChild(node)
    node.onload = () => document.body.removeChild(node)
}



let audio = new Audio()
audio.loop = true
let isPlaying = false


export const setMusicState = (s: { songURL: string, playing: boolean }) => {

    if (audio.src != s.songURL) {
        audio.src = s.songURL
        isPlaying = false
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
