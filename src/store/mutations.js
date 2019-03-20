/**
 * Created by went on 2017/07/12.
 */

import axios from 'axios';
// import qiniu from 'qiniu';
const mutations = {
    setUserName:(state,name)=>{
        state.username=name;
    },

    setMusicList:(state,list)=>{

        state.musicList=list;
    },

    setMusic:(state,id)=>{
        state.playIndex=0;
        let src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        state.play_url=src;
    },
    chooseMusic:(state,index)=> {
        state.playIndex=index;

        state.play_url=`https://music.163.com/song/media/outer/url?id=${state.musicList[index].id}.mp3`;
    },
    change:(state,index)=> {
        state.playIndex=index;
    }

}

export default mutations