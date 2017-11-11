import { search, Song, setMusicState, audio } from './QQMusicAPI'


export const store = {
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
    if (store.myCollect.find(v => v.songid == song.songid) == null) {
        store.myCollect = [song, ...store.myCollect]
    }
    save()
}



export const changeSong = (songid: number, pos: number) => {
    const song = store.myCollect.find(v => v.songid == songid)
    if (song != null) {
        const index = store.myCollect.indexOf(song) + pos
        if (index < store.myCollect.length && index >= 0) {
            const nowPlaySong = store.myCollect.find((v, i) => i == (store.myCollect.indexOf(song) + pos))
            store.nowPlaySong = nowPlaySong
            store.nowPlayID = nowPlaySong.songid
            store.nowPlayImgURL = nowPlaySong.albumImageURL
            store.nowPlaySongName = nowPlaySong.songname
            setMusicState({ songid: store.nowPlayID, playing: store.isPlaying, song: store.myCollect })
        } else { setMusicState({ songid: store.nowPlayID, playing: store.isPlaying, song: store.myCollect }) }
    } else { setMusicState({ songid: store.nowPlayID, playing: store.isPlaying, song: store.myCollect }) }
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
    localStorage.setItem('myCollect', JSON.stringify(store.myCollect))

export const load = () => {
    let arr = JSON.parse(localStorage.getItem('myCollect'))
    store.myCollect = arr ? arr : []
}

load()


audio.onended = () => {
    //播放完成
    changeSong(store.nowPlayID, 1)

}

