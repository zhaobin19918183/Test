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
    //TODO:Location
    static func createLocationEntityWith(InitialClosure closure : (_ newEntity : Location )->() ) -> Bool
    {
        let entity = NSEntityDescription.insertNewObject(forEntityName: self.entityName(), into: BaseDAO.mainMOC) as! Location
        closure(entity)
        return self.save()
    }
    //TODO:Location
    static func createCoordinatesEntityWith(InitialClosure closure : (_ newEntity : Coordinates )->() ) -> Bool
    {
        let entity = NSEntityDescription.insertNewObject(forEntityName: self.entityName(), into: BaseDAO.mainMOC) as! Coordinates
        closure(entity)
        return self.save()
    }
    
    
    //MARK: - Update
    static func updateEntityWith(Entity entity : LocationEntity) -> Bool
    {
        let  model =  NavigationModel.convertFrom(entity)
        model.coordinates = entity.coordinates
        model.lcoaitonMessage = entity.locationMessage
        model.locationSoundName = entity.locationSoundName
        model.locaitonName = entity.locaitonName
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

            let coordinates : Data    =  dicData.value(forKey: "coordinates") as! Data
            let lcoaitonMessage : Data =  dicData.value(forKey: "lcoaitonMessage") as! Data
            let lcoaitonName : String  =  dicData.value(forKey: "locaitonName") as! String
            let locationSoundName : Data
                =  dicData.value(forKey: "locationSoundName")! as! Data


            newEntity.locationMessage         = lcoaitonMessage
            newEntity.coordinates             = coordinates
            newEntity.locaitonName            = lcoaitonName
            newEntity.locationSoundName        = locationSoundName
//            NavigationModel.convertFrom(newEntity)
            
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
        let fetchRqeust     = NSFetchRequest<NSFetchRequestResult>(entityName: "LocationEntity")
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
   //MARK: -
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
    //TODO:locaitonToCoordinates
    static  func locaitonToCoordinates(_ dicData:NSMutableDictionary)
    {
        
        let success = WeatherDAO.createLocationEntityWith { (newEntity:Location) -> () in
            
            let locationID : Int16    =  dicData.value(forKey: "locationID") as! Int16
            let locationName : String =  dicData.value(forKey: "locationName") as! String
            let locationDate : String  =  dicData.value(forKey: "locationDate") as! String
            newEntity.locationID          = locationID
            newEntity.locationName        = locationName
            newEntity.locationDate        = locationDate
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
    
    //TODO:createCoordinatesEntityWith
    static  func CoordinatesToLocation(_ dicData:NSMutableDictionary)
    {

        let success = WeatherDAO.createCoordinatesEntityWith { (newEntity:Coordinates) -> () in
            
            let locationX : Double    =  dicData.value(forKey: "locationX") as! Double
            let locationY : Double =  dicData.value(forKey: "locationY") as! Double
            let heading : Double  =  dicData.value(forKey: "heading") as! Double
            let relationship : Location  =  dicData.value(forKey: "relationship") as! Location
            newEntity.locationX           = locationX
            newEntity.locationY           = locationY
            newEntity.heading             = heading
            newEntity.relationship        = relationship
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
    
    
    
    static func entityName() -> String
    {
        return "LocationEntity"
    }
}
