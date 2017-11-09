import { search, Song, setMusicState } from './QQMusicAPI'


export const dic = {
    searchList: [] as Song[],
    myCollect: [] as Song[],
    nowPlayID: -1,
    nowSearch: '',
    textSearch: '',
    nowPlayImgURL: 'noImg.jpg',
    isPlaying: false,
    isCollected: false,
    nowPlaySong: {} as Song,
    nowPlaySongName: ''
}



export const like = (song: Song) => {
    if (dic.myCollect.find(v => v.songid == song.songid) == null) {
        dic.myCollect.push(song)
    }
    save()
}



export const changeSong = (songid: number, a: number) => {
    const song = dic.myCollect.find(v => v.songid == songid)
    if (song != null) {
        const index = dic.myCollect.indexOf(song) + a
        if (index < dic.myCollect.length && index >= 0) {
            const nowPlaySong = dic.myCollect.find((v, i) => i == (dic.myCollect.indexOf(song) + a))
            dic.nowPlaySong = nowPlaySong
            dic.nowPlayID = nowPlaySong.songid
            dic.nowPlayImgURL = nowPlaySong.albumImageURL
            dic.nowPlaySongName = nowPlaySong.songname
            setMusicState({ songid: dic.nowPlayID, playing: dic.isPlaying, song: dic.myCollect })
        } else { setMusicState({ songid: dic.nowPlayID, playing: dic.isPlaying, song: dic.myCollect }) }
    } else { setMusicState({ songid: dic.nowPlayID, playing: dic.isPlaying, song: dic.myCollect }) }
    publish()
}

let fArr = [] as (() => void)[]

export const subscribe = (f: () => void) => {
    fArr.push(f)
}

export const unsubscribe = (f: () => void) => {
    fArr = fArr.filter(v => v != f)
}

export const publish = () => {
    fArr.forEach(v => v())
}

export const save = () =>
    localStorage.setItem('myCollect', JSON.stringify(dic.myCollect))

export const load = () => {
    let arr = JSON.parse(localStorage.getItem('myCollect'))
    dic.myCollect = arr ? arr : []
}

load()

