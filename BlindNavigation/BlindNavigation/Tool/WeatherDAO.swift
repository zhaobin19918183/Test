//
//  WeatherDAO.swift
//  HTK
//
//  Created by Zhao.bin on 16/5/18.
//  Copyright © 2016年 赵斌. All rights reserved.
//

import UIKit
import CoreData

class WeatherDAO: BaseDAO {

    //MARK: - Create
    static func createEntityWith(InitialClosure closure : (_ newEntity : LocationEntity )->() ) -> Bool
    {
        let entity = NSEntityDescription.insertNewObject(forEntityName: self.entityName(), into: BaseDAO.mainMOC) as! LocationEntity
        closure(entity)
        return self.save()
    }
    
    //MARK: - Update
    static func updateEntityWith(Entity entity : LocationEntity) -> Bool
    {
        var  model =  NavigationModel.convertFrom(entity)
       
        return self.save()
    }
    
    //MARK: - Delete
    static func deleteEntityWith(Entity entity : LocationEntity) -> Bool
    {
        BaseDAO.mainMOC.delete(entity)
        return self.save()
    }
    //MARK: - Retrive 按条件搜索数据
    static func retriveEntityWith(ID identification : String) -> [LocationEntity]
    {
        let request         = NSFetchRequest<NSFetchRequestResult>(entityName: self.entityName())
        let searchEntity    = NSEntityDescription.entity(forEntityName: self.entityName(), in: BaseDAO.mainMOC)
        request.entity      = searchEntity
        let predicate       = NSPredicate(format: "identification == %@", identification)
        request.predicate   = predicate
        do
        {
            let resultArray = try BaseDAO.mainMOC.fetch(request)
            return resultArray as! [LocationEntity]
        }catch
        {
            return [LocationEntity]()
        }
    }
    
    static  func createWeatherEntity(_ dicData:NSMutableDictionary)
    {

        let success = WeatherDAO.createEntityWith { (newEntity:LocationEntity) -> () in
//
//            let realtimedata : Data  = NSKeyedArchiver.archivedData(withRootObject: dicData.value(forKey: "realtime")!)
//            let lifedata : Data      = NSKeyedArchiver.archivedData(withRootObject: dicData.value(forKey: "life")!)
//            let weatherdata : Data   = NSKeyedArchiver.archivedData(withRootObject: dicData.value(forKey: "weather")!)
//            let pmdata : Data        = NSKeyedArchiver.archivedData(withRootObject: dicData.value(forKey: "pm25")!)
//
//            newEntity.realtime         = realtimedata
//            newEntity.life             = lifedata
//            newEntity.weather          = weatherdata
//            newEntity.pm25             = pmdata
          //  WeatherModel.convertFrom(newEntity)
            
        }
        if success == true
        {
            print("保存成功")
            // self.navigationController?.popToRootViewControllerAnimated(true)
        }
        else
        {
            print("保存失败")
        }
    }
    //MARK: - 搜索1条数据
    static  func  SearchCoreDataEntity() -> LocationEntity
    {
        let managedContext  = BaseDAO.mainMOC
        let fetchRqeust     = NSFetchRequest<NSFetchRequestResult>(entityName: "LocationEntity")
        let weatherArray    = try!managedContext.fetch(fetchRqeust) as AnyObject as! NSArray
        let weatherEntity   = weatherArray.object(at: 0) as! LocationEntity
        return weatherEntity
    }
    static  func  SearchOneEntity(_ index:Int) -> LocationEntity
    {
        let managedContext  = BaseDAO.mainMOC
        let fetchRqeust     = NSFetchRequest<NSFetchRequestResult>(entityName: "LocationEntity")
        let weatherArray    = try!managedContext.fetch(fetchRqeust) as AnyObject as! NSArray
        let weatherEntity   = weatherArray.object(at: index) as! LocationEntity
        return weatherEntity
    }
    //MARK: - 全部数据
    static func SearchAllDataEntity()->NSArray
    {
        let managedContext  = BaseDAO.mainMOC
        let fetchRqeust     = NSFetchRequest<NSFetchRequestResult>(entityName: "WeatherEntity")
        let weatherArray    = try!managedContext.fetch(fetchRqeust) as AnyObject as! NSArray
        return weatherArray
    }
    //MARK: - 0
    static  func  SearchWeatherModel() -> NavigationModel
    {
        let managedContext  = BaseDAO.mainMOC
        let fetchRqeust     = NSFetchRequest<NSFetchRequestResult>(entityName: "LocationEntity")
        let fetcheResults   = try!managedContext.fetch(fetchRqeust) as AnyObject as! NSArray
        let model           =  NavigationModel.convertFrom(fetcheResults.object(at: 0) as! LocationEntity)
        return model
    }
   //MARK: - save
    static func save() -> Bool
    {
        if BaseDAO.mainMOC.hasChanges
        {
            do
            {
                try BaseDAO.mainMOC.save()
            }
            catch
            {
                return false
            }
            
            return true
        }else
        {
            return false
        }
    }
    
    static func entityName() -> String
    {
        return "LocationEntity"
    }
}
