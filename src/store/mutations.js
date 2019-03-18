/**
 * Created by went on 2017/07/12.
 */

import axios from 'axios';
// import qiniu from 'qiniu';
const mutations = {
    setMusicList:(state,url)=>{
        state.playIndex=0;
        state.play_url=url;
    },
    chooseMusic:(state,index)=> {
        state.playIndex=index;
        state.play_url=state.musicList[index].url;
    },
    change:(state,index)=> {
        state.playIndex=index;
    }

}

export default mutations