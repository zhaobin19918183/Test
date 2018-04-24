//
//  NetWorkManager.swift
//  FamilyShop
//
//  Created by Zhao.bin on 16/9/26.
//  Copyright © 2016年 Zhao.bin. All rights reserved.
//

import Foundation

import UIKit
import SystemConfiguration
import Alamofire


class NetWorkManager: NSObject
{
    
 

    static func networkStateJudgement()->(type:NetworkReachabilityManager,SuccessOrError:String)
    {
        var manager: NetworkReachabilityManager?
        manager = NetworkReachabilityManager(host: "www.apple.com")
        manager?.startListening()
        if (manager?.isReachable)!
        {
              return (manager!,"success")
        }
        else
        {
              return (manager!,"offline")
        }

    }


    
    static  func alamofireUploadFile(url:String,parameters:[String:String])
    {
        //
        Alamofire.upload(multipartFormData: { (multipartFormData) in
       
            for (key, value) in parameters
            {
                multipartFormData.append(value.data(using: String.Encoding.utf8)!, withName: key)
            }
            
            
        }, to: url) { (encodingResult) in
                switch encodingResult
                {
                case .success(let upload, _, _):
                upload.responseJSON
                {
                response in
                debugPrint(response)
                let string : String = String(data: response.data!, encoding: String.Encoding.utf8)!
                if string == "success"
                {
                print("成功")
                }
                else
                {
                print("失败")
                }

                }
                case .failure(let encodingError):
                print(encodingError)
                print("error")
                }
            
        }
    
    }
    

}
