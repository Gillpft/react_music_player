# react music player
###### [预览](https://gillpft.github.io/)
### 功能介绍
1. 实时搜索:每输入一个字符列表刷新搜索结果
- 遇到问题:回删,搜索结果变化异常
- 解决方法:最终保留最后一个字符的搜索结果

```
export const search = (keyword: string, callback: (songList: Song[]) => void) => {
    dic[keyword] = callback
    searchKeyword = keyword
    const node = document.createElement('script')
    node.src = `https://c.y.qq.com/soso/fcgi-bin/search_cp?&p=1&n=50&w=${encodeURI(keyword)}&aggr=1&lossless=1&cr=1&jsonpCallback=${SEARCH_CALLBACK}`
    document.body.appendChild(node)
    node.onload = () => document.body.removeChild(node)
}

```

2. 播放音乐:可以播放列表任意歌曲,可以暂停歌曲,我的音乐可显示图片和歌词
- 遇到问题:播放列表第3行的歌曲改变搜索结果,第三行仍显示播放中
- 解决方法:以歌曲id做精准判断
 
```
isPlaying: song.songid == this.state.nowPlayID && this.state.isPlaying ? false : true
```

3.音乐库和我的音乐切换
- 遇到问题:历史记录无保存
- 解决方法:数据全局化

```
export const dic = {
    searchList: [] as Song[],
    myCollect: [] as Song[],
    nowPlayID: -1,
    nowSearch: '',
    textSearch: '',
    nowPlayImgURL: 'noImg.jpg',
    isPlaying: true
}

export const like = (song: Song) => {
    if (dic.myCollect.find(v => v.songid == song.songid) == null) {
        dic.myCollect.push(song)
    }
    save()
}
```


4. 收藏音乐
- 遇到问题:刷新页面,收藏列表清空
- 解决方法:本地存储
```
export const save = () =>
    localStorage.setItem('myCollect', JSON.stringify(dic.myCollect))

export const load = () => {
    let arr = JSON.parse(localStorage.getItem('myCollect'))
    dic.myCollect = arr ? arr : []
}
```



