//
//  VoiceBroadcasManager.swift
//  BlindNavigation
//
//  Created by newland on 2018/4/3.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit
import AVFoundation
import Speech

class VoiceBroadcasManager: NSObject

{
    fileprivate let avSpeech = AVSpeechSynthesizer()
    //语音文件播放
    static func VoiceFilePlayback()
    {
        
    }
    //获取文件地址
    //播放固定语音文字
    //开始转换,不同国家的语言支持
    fileprivate func startTranslattion(message:String,countrylanguage:String){
        //1. 创建需要合成的声音类型
//        let voice = AVSpeechSynthesisVoice(language: countrylanguage)
        let voice = AVSpeechSynthesisVoice(language: "zh-CN")
        //2. 创建合成的语音类
        let utterance = AVSpeechUtterance(string: message)
        utterance.rate = AVSpeechUtteranceDefaultSpeechRate
        utterance.voice = voice
        utterance.volume = 1
        utterance.postUtteranceDelay = 0.1
        utterance.pitchMultiplier = 1
        //开始播放
        avSpeech.speak(utterance)
    }
    
    //暂停播放
    fileprivate func pauseTranslation(){
        avSpeech.pauseSpeaking(at: .immediate)
    }
    
    //继续播放
    fileprivate func continueSpeek(){
        avSpeech.continueSpeaking()
    }
    
    //取消播放
    fileprivate func cancleSpeek(){
        avSpeech.stopSpeaking(at: .immediate)
    }
    

    
    

}
