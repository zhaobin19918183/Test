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
import SwiftyJSON


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
//    let parameters1      = ["username":"newland", "password" :"zb123456789"]
//

    
  
    

}
