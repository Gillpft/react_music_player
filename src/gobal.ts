import { search, Song, setMusicState } from './QQMusicAPI'


export const dic = {
    searchList: [] as Song[],
    myCollect: [] as Song[],
    nowPlayID: -1,
    nowSearch: '',
    textSearch: '',
    nowPlayImgURL: ''
}

export const like = (song: Song) => {
    if (dic.myCollect.find(v => v.songid == song.songid) == null) {
        dic.myCollect.push(song)
    }
    save()
}


export const save = () =>
    localStorage.setItem('myCollect', JSON.stringify(dic.myCollect))

export const load = () => {
    let arr = JSON.parse(localStorage.getItem('myCollect'))
    dic.myCollect = arr ? arr : []
}

load()

