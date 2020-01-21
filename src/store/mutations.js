/**
 * Created by went on 2017/07/12.
 */

import axios from 'axios';
// import qiniu from 'qiniu';
const mutations = {
    setUserInfo:(state,info)=>{
        state.user_name=info.username;
        state.user_id=info.user_id;
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
    },
    setSocket(state){
        // state.ws = io.connect("ws://localhost:3001");
        // state.ws.on("connected",(data)=>{
        //     console.log('连接成功');
        //
        //
        // });
        state.ws = io.connect(window.socket_url);
        state.ws.on("connecting",function(data){
            // console.log('连接中...');
        });
        state.ws.on("connected",(data)=>{
            console.log('连接成功');

            let res = {};
            res.user_id = state.user_id;
            res.user_name = state.user_name;
            state.ws.emit('setList', res);

        });
        state.ws.on("sendList",(data)=>{
//                console.log('接受List');
            console.log(data);
            state.onlineList = data;
            state.onlineArray  = Object.keys(data)
        });
        state.ws.on("receive_message",(data)=>{
            console.log(data);
        });
        state.ws.on("leave",(data)=>{
            console.log(data);
            state.onlineList = data;
        });




        state.ws.on('disconnect', function() {
            console.log("与服务其断开");
        });
        state.ws.on("connect_failed",function(data){
            console.log('连接失败');
        });
    }

}

export default mutations