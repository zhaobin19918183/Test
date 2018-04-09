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
    //Location
    var locationID                    : Int16?
    var locationName                  : String?
    var locationDate                  : String?
    //Coordinates
    var locationX                     : Double?
    var locationY                     : Double?
    var relationship                  : Location?
    var heading                       : Double?
    var soundName                     : String?

    static func convertLocation(_ dictionary :Location) -> NavigationModel
    {
        let model = NavigationModel()
        model.locationID      = dictionary.locationID
        model.locationDate    = dictionary.locationDate
        model.locationName    = dictionary.locationName
       
        return model
    }
    static func convertCoordinates(_ dictionary :Coordinates) -> NavigationModel
    {
        let model = NavigationModel()
        model.locationX        = dictionary.locationX
        model.locationY        = dictionary.locationY
        model.heading          = dictionary.heading
        model.relationship     = dictionary.relationship
        model.soundName        = dictionary.soundName
        return model
    }
    
    
    
    static func convertFrom(_ dictionary :LocationEntity) -> NavigationModel
    {
        let model = NavigationModel()
        model.coordinates           = dictionary.coordinates
        model.lcoaitonMessage       = dictionary.locationMessage
        model.locationSoundName     = dictionary.locationSoundName
        model.locaitonName          = dictionary.locaitonName
        
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
