import { search, Song, setMusicState } from './QQMusicAPI'


export const dic = {
    searchList: [] as Song[],
    myCollect: [] as Song[],
    nowPlayID: -1,
    nowSearch: '',
    textSearch: '',
    nowPlayImgURL: 'noImg.jpg',
    isPlaying: true,
}

let funcArr = [] as (() => void)[]

export const 注册通知 = (f: () => void) => {
    funcArr = [...funcArr, f]
}

export const 移除通知 = (f: () => void) => {
    funcArr = funcArr.filter(v => v != f)
}

export const 发送通知 = () => {
    funcArr.forEach(f => f())
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

