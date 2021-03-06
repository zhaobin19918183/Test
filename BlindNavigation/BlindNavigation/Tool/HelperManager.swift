//
//  HelperManager.swift
//  Portal
//
//  Created by Kilin on 16/3/15.
//  Copyright © 2016年 Innocellence. All rights reserved.
//
import UIKit
import AudioToolbox
struct HelperManager {
    static let sharedManager = HelperManager()
    fileprivate init() {}
    
     static   func file_pathString(nameString:String)->String
    {
        let file_path = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first?.appending("/\(nameString)")
        print(file_path as Any)
        return file_path!
    }
    
  //两点距离
    static  func  distanceBetweenTheCoordinates(startPointlat:Double,startPointlon:Double,endPointLat:Double,endPointLon:Double)->Int
    {
        
        let startPoint:BMKMapPoint =   BMKMapPointForCoordinate(CLLocationCoordinate2DMake(startPointlat,startPointlon));
     
        let endPoint:BMKMapPoint =   BMKMapPointForCoordinate(CLLocationCoordinate2DMake(endPointLat,endPointLon));
        let distance  =  BMKMetersBetweenMapPoints(endPoint,startPoint)
        return Int(distance)
    }
    //在角度范围内震动
    static func Angularvibration(beforeHeading:Double,nowHeading:Double)
    {
       
        let beforeAdd     =    nowHeading + 15.0
        let beforeReduce  = nowHeading  - 15.0
       
        if nowHeading < 345.0 && nowHeading > 15.0 && beforeHeading > beforeReduce && beforeHeading < beforeAdd
        {
            
            let soundID = SystemSoundID(kSystemSoundID_Vibrate)
            //振动
            AudioServicesPlaySystemSound(soundID)
            
        }
        if  nowHeading > 345.0 && nowHeading < 15.0 && beforeReduce > 345.0 && beforeAdd < 15.0
        {
            
            let soundID = SystemSoundID(kSystemSoundID_Vibrate)
            //振动
            AudioServicesPlaySystemSound(soundID)
        }
        
    }
    
  
    
    
    
    static func convertAnyObjectToData< T > (_ anyObject : T) -> Data
    {
        let resultData : Data?
        do{
            resultData = try JSONSerialization.data(withJSONObject: anyObject as AnyObject, options: .prettyPrinted)
        }catch
        {
            resultData = nil
        }
        
        return resultData!
    }
    
    static func convertDataToAnyObject(_ data : Data) -> AnyObject
    {
        let resultAnyObject : AnyObject?
        do{
            resultAnyObject = try JSONSerialization.jsonObject(with: data, options: .allowFragments) as AnyObject
        }catch
        {
            resultAnyObject = nil
        }
        
        return resultAnyObject!
    }
    
    static func convertDataToString <T> (_ anyObject : T) -> String
    {
        let resultData : Data!
        do{
            resultData = try JSONSerialization.data(withJSONObject: anyObject as AnyObject, options: .prettyPrinted)
        }catch
        {
            resultData = nil
        }
        
        return String(data: resultData, encoding: String.Encoding.utf8)!
    }
    
    static func convertStringToAnyObject(_ string : String?) -> AnyObject?
    {
        guard let jsonData = string?.data(using: String.Encoding.utf8) else
        {
            return nil
        }
        
        let resultAnyObject : AnyObject?
        do{
            resultAnyObject = try JSONSerialization.jsonObject(with: jsonData, options: .allowFragments) as AnyObject
        }catch
        {
            resultAnyObject = nil
        }
        
        return resultAnyObject
    }
    static func base64StringToImage(imageString:String)->UIImage
    {
        //data:image/jpeg;base64,
        if imageString.contains(",")
        {
            var  index = imageString.index(of: ",")
            index = imageString.index(index!, offsetBy: 1)
            let names = imageString.suffix(from: index!)
            let imageData2 = Data(base64Encoded: String(names))
            let image2 = UIImage(data: imageData2!)
            return  image2!
        }
        let imageData = Data(base64Encoded: imageString)
        // 将Data转化成图片
        let image = UIImage(data: imageData!)
        return  image!
        
    }
    
    static func converLocalTime()->String
    {
        
        //获取当前时间
        let now = Date()
        // 创建一个日期格式器
        let dformatter = DateFormatter()
        dformatter.dateFormat = "yyyy年MM月dd日 HH:mm:ss"
        return  dformatter.string(from: now)
    }
    
    
    
    static func convertServerTimeToLocalTime(_ dateString : String) -> String
    {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        dateFormatter.timeZone   = TimeZone(secondsFromGMT: 0)
        let convertedDate = dateFormatter.date(from: dateString)
        dateFormatter.dateFormat = "dd"
        let day = dateFormatter.string(from: convertedDate!)
        dateFormatter.dateFormat = "MM"
        let monthString = dateFormatter.string(from: convertedDate!)
        dateFormatter.dateFormat = "yyyy"
        let year = dateFormatter.string(from: convertedDate!)
        switch monthString {
        case "01":
            let  month  = "January"
            return  ("\(day) \(month) \(year)")
        case "02":
            let  month  = "February"
            return  ("\(day) \(month) \(year)")
        case "03":
            let  month  = "March"
            return  ("\(day) \(month) \(year)")
        case "04":
            let  month  = "April"
            return  ("\(day) \(month) \(year)")
        case "05":
            let  month  = "May"
            return  ("\(day) \(month) \(year)")
        case "06":
            let  month  = "June"
            return  ("\(day) \(month) \(year)")
        case "07":
            let  month  = "July"
            return  ("\(day) \(month) \(year)")
        case "08":
            let  month  = "August"
            return  ("\(day) \(month) \(year)")
        case "09":
            let  month  = "September"
            return  ("\(day) \(month) \(year)")
        case "10":
            let  month  = "October"
            return  ("\(day) \(month) \(year)")
        case "11":
            let  month  = "November"
            return  ("\(day) \(month) \(year)")
        case "12":
            let  month  = "December"
            return  ("\(day) \(month) \(year)")
        default:
            break
        }
        return dateFormatter.string(from: convertedDate!)
    }
    
    static func convertServerTimeToDateString(_ dateString : String) -> (day : String , month : String)
    {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        dateFormatter.timeZone   = TimeZone(secondsFromGMT: 0)
        let convertedDate = dateFormatter.date(from: dateString)
        dateFormatter.dateFormat = "MM"
        let monthString = dateFormatter.string(from: convertedDate!)
        dateFormatter.dateFormat = "dd"
        let day = dateFormatter.string(from: convertedDate!)
        switch monthString {
        case "01":
            let  month   = "January"
            return (day , month)
        case "02":
            let  month   = "February"
            return (day , month)
            
        case "03":
            let  month   = "March"
            return (day , month)
        case "04":
            let  month   = "April"
            return (day , month)
        case "05":
            let  month   = "May"
            return (day , month)
        case "06":
            let  month   = "June"
            return (day , month)
        case "07":
            let  month   = "July"
            return (day , month)
        case "08":
            let  month   = "August"
            return (day , month)
        case "09":
            let  month   = "September"
            return (day , month)
        case "10":
            let  month   = "October"
            return (day , month)
        case "11":
            let  month   = "November"
            return (day , month)
        case "12":
            let  month   = "December"
            return (day , month)
        default:
            break
        }
        return (day,monthString)
        
    }
    static func dataTypeTurnJson(element:AnyObject) -> String {
        
        let jsonData = try! JSONSerialization.data(withJSONObject: element, options: JSONSerialization.WritingOptions.prettyPrinted)
        let str = String(data: jsonData, encoding: String.Encoding.utf8)!
        return str
    
    } 


   
    
}

