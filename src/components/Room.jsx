import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useSearchParams } from 'react-router-dom';

const Room=()=>{
    const {id}=useParams()
    const [searchParams]=useSearchParams()
    const role_str=searchParams.get('role')||'audience'
    const containerRef=useRef('')
    const startRef=useRef(false)
    const appId=idnumber
    const serverSecret="serversecret"
    const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appId,serverSecret,id,Date.now().toString(),'/')
    const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

    const sharedLinks = [];
    if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
        sharedLinks.push({
            name: 'Join as co-host',
            url:
                window.location.protocol + '//' + 
                window.location.host + window.location.pathname +
                '?roomID=' +
                id +
                '&role=Cohost',
        });
    }
    sharedLinks.push({
        name: 'Join as audience',
        url:
        window.location.protocol + '//' + 
        window.location.host + window.location.pathname +
        '?roomID=' +
        id +
        '&role=Audience',
    });

    let myMeeting = async (element) => {
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.LiveStreaming,
                config: {
                    role,
                },
            },
            sharedLinks,
        });
    };
    useEffect(()=>{
        if(!id){
            console.log("No Room ID")
            return
        }
        if(startRef.current){
            return
        }
        if(containerRef.current){
            startRef.current=true
            myMeeting(containerRef.current)
        }
    }, [id])
    return(
        <div ref={containerRef} className='flex justify-center items-center h-screen'></div>
    )
}

export default Room