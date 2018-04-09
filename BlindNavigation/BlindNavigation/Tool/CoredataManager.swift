//
//  CoredataManager.swift
//  BlindNavigation
//
//  Created by newland on 2018/4/9.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit
import CoreData

class CoredataManager: NSObject
{
    //TODO:数据库表关联
    static func coredataManagerLocation(LocationDic:NSMutableDictionary,coordinatesArray:NSMutableArray)
    {
        var locatiobEntity = Location()
        let success = WeatherDAO.createLocationEntityWith { ( newEntity:Location) -> () in
            newEntity.locationDate = (LocationDic.value(forKey: "locationDate") as! String)
            newEntity.locationName  = (LocationDic.value(forKey: "locationName") as! String)
            newEntity.locationID   = (Int16(LocationDic.value(forKey: "locationID") as! Int))
            locatiobEntity = newEntity
  
        }
        if success == true
        {
            print(" Location 保存成功")
            for i in 0...coordinatesArray.count - 1 {
                
                let   LocationDic:NSMutableDictionary =
                    coordinatesArray[i] as! NSMutableDictionary
                let success = WeatherDAO.createCoordinatesEntityWith { (coorEntity:Coordinates) -> () in
                    coorEntity.locationX = LocationDic.value(forKey: "locationlat") as! Double
                    coorEntity.locationY = LocationDic.value(forKey: "locationlon") as! Double
                    coorEntity.heading   = LocationDic.value(forKey: "headering") as! Double
                    coorEntity.relationship = locatiobEntity
                    
                }
                if success == true
                {
                    print(" CoordinatesToLocation 保存成功")
                    // self.navigationController?.popToRootViewControllerAnimated(true)
                }
                else
                {
                    print("CoordinatesToLocation 保存失败")
                }
                
                
            }
            
            
            
        }
        else
        {
            print("Location 保存失败")
        }
        
    }
    //MARK: - 全部数据
    static func SearchAllDataEntity()->NSArray
    {
        let managedContext  = BaseDAO.mainMOC
        let fetchRqeust     = NSFetchRequest<NSFetchRequestResult>(entityName: "Location")
        let weatherArray    = try!managedContext.fetch(fetchRqeust) as AnyObject as! NSArray
        return weatherArray
    }
    //MARK: - Retrive 按条件搜索数据
    static func retriveEntityWith(identification : Location) -> [Coordinates]
    {
        let request         = NSFetchRequest<NSFetchRequestResult>(entityName: self.CoordinatesName())
        let searchEntity    = NSEntityDescription.entity(forEntityName: self.CoordinatesName(), in: BaseDAO.mainMOC)
        request.entity      = searchEntity
        let predicate       = NSPredicate(format: "relationship == %@", identification)
        request.predicate   = predicate
        do
        {
            let resultArray = try BaseDAO.mainMOC.fetch(request)
            return resultArray as! [Coordinates]
        }catch
        {
            return [Coordinates]()
        }
    }
//    static func entityName() -> String
//    {
//        return "LocationEntity"
//    }
//    static func Location() -> String
//    {
//        return "Location"
//    }
    
    
    static func CoordinatesName() -> String
    {
        return "Coordinates"
    }
  

}
