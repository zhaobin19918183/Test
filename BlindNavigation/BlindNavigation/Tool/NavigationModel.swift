//
//  NavigationModel.swift
//  BlindNavigation
//
//  Created by newland on 2018/4/2.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit
import Foundation


class NavigationModel: NSObject
{
    var coordinates                   : Data?
    var lcoaitonMessage               : Data?
    var locaitonName                  : String?
    var locationSoundName              : Data?
    static func convertFrom(_ dictionary :LocationEntity) -> NavigationModel
    {
        let model = NavigationModel()
        model.coordinates      = dictionary.coordinates
        model.lcoaitonMessage  = dictionary.locationMessage
        model.locationSoundName     = dictionary.locationSoundName
        model.locaitonName     = dictionary.locaitonName
        
        return model
    }
    
    static func searchForm(_ dictionary :NSMutableDictionary) -> NavigationModel
    {
        let model = NavigationModel()
        model.coordinates       = dictionary["coordinates"] as? Data
        model.lcoaitonMessage   = dictionary["lcoaitonMessage"] as? Data
        model.locaitonName      = dictionary["locaitonName"] as? String
        model.locationSoundName   = dictionary["locationSoundName"] as? Data
        return model
    }
    

}
