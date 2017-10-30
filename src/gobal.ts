import { search, Song, setMusicState } from './QQMusicAPI'


export const dic = {
    searchList: [] as Song[],
    myCollect: [] as Song[]
}



export const like = (song: Song) => {
    if (dic.myCollect.find(v => v.songid == song.songid) == null) {
        dic.myCollect.push(song)
    }
}