//
//  InformationViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/3/30.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit
import CoreLocation
import MessageUI
import Alamofire

class InformationViewController: UIViewController,BMKMapViewDelegate,BMKLocationServiceDelegate,CLLocationManagerDelegate {

    @IBOutlet weak var numberLabel: UILabel!
    @IBOutlet weak var EmergencyContactButton: UIButton!
    @IBOutlet weak var informationMapView: BMKMapView!
    @IBOutlet weak var informationButton: UIButton!
    var locaitonUser : BMKUserLocation!
    var locaitonUserHeadering : BMKUserLocation!
    var locationService: BMKLocationService!
    let dic = NSMutableDictionary()
    let array = NSMutableArray()
    //画折线
    var circle: BMKCircle?
    var polygon: BMKPolygon?

    var colorfulPolyline: BMKPolyline?
    var arcline: BMKArcline?
    var ground: BMKGroundOverlay?
    var pointAnnotation: BMKPointAnnotation?
    var animatedAnnotation: BMKPointAnnotation?
    var lockedScreenAnnotation: BMKPointAnnotation?
    let coord = NSMutableArray()
    //事件保存坐标
    var dictionaryExample = NSMutableDictionary()
    var arrayExample  = NSMutableArray()
    //录音文件
    var intoBool:Bool = true
    var firstBool:Bool = true
    var nameString:String = ""
    var  record = RecordManager()
    var number :Int = 9990
    var soundName = NSMutableArray()
    //TODO:数据库优化参数
        let coordinatesDic = NSMutableDictionary()
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        locationService = BMKLocationService()
        locationService.allowsBackgroundLocationUpdates = true
        locationService.startUserLocationService()
        informationMapView.showsUserLocation = false//先关闭显示的定位图层
        informationMapView.userTrackingMode = BMKUserTrackingModeFollow //设置定位的状态
        informationMapView.zoomLevel = 20.0
        informationMapView.showsUserLocation = true//显示定位图层
        
        let customRightBarButtonItem = UIBarButtonItem(title: "结束", style: .plain, target: self, action: #selector(InformationViewController.customLocationAccuracyCircle))
        self.navigationItem.rightBarButtonItem = customRightBarButtonItem
        numberLabel.isHidden = true
        
        
    }
    
    @objc func customLocationAccuracyCircle()
    {
//        coredataDic()
        stopRecordAction()
        coredatamanager()
        self.navigationController?.popViewController(animated: true)
    }
    //MARK:停止录音
    func stopRecordAction()
    {
        
        record.stopRecord(HelperManager.file_pathString(nameString: "\(HelperManager.converLocalTime())_\(number + 1).wav"))
         self.numberLabel.isHidden = true
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        locationService.delegate = self
        informationMapView.delegate = self
        informationMapView.viewWillAppear()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        locationService.delegate = nil
        informationMapView.delegate = nil
        informationMapView.viewWillDisappear()
    }
    
    // MARK: - BMKMapViewDelegate
    // MARK: - BMKLocationServiceDelegate
    
    func willStartLocatingUser() {
        print("willStartLocatingUser");
    }
    
    /**
     *用户方向更新后，会调用此函数
     *@param userLocation 新的用户位置 didUpdateBMKUserLocation
     */
 
    func didUpdateUserHeading(_ userLocation: BMKUserLocation!) {
        print("heading is \(userLocation.heading)")
       
    }
    
    /**
     *用户位置更新后，会调用此函数
     *@param userLocation 新的用户位置
     */

    func didUpdate(_ userLocation: BMKUserLocation!) {
        locaitonUserHeadering = userLocation
        informationMapView.updateLocationData(userLocation)
        locaitonUser = userLocation
        print("heading is \(userLocation)")
        if firstBool == true
        {
            firstBool  = false
            //TODO:初次进入导航页面记录获取到的第一个点,并录音
            var timeCount = 10
            // 在global线程里创建一个时间源
            let codeTimer = DispatchSource.makeTimerSource(queue:      DispatchQueue.global())
            // 设定这个时间源是每秒循环一次，立即开始
            codeTimer.schedule(deadline: .now(), repeating: .seconds(1))
            // 设定时间源的触发事件
            codeTimer.setEventHandler(handler: {
                // 返回主线程处理一些事件，更新UI等等
                timeCount = timeCount - 1
                // 每秒计时一次
                // 时间到了取消时间源
                print(timeCount)
                if timeCount <= 0 {
                    //
                    if self.arrayExample.count == 0 && self.locaitonUser.heading != nil
                    {
                        //              startToRecord()
                        self.locationUserMessage(nameString:"")
                    }
                   
                    
                    self.stopRecordAction()
                    
                    codeTimer.cancel()
                }
            })
            // 启动时间源
            codeTimer.resume()
            
        }
        else
        {
            if self.arrayExample.count != 0 && self.locaitonUser.heading != nil
            {
                
                self.SameIntervalDistance()
            }
            
        }

       
    }
    
    /**
     *在地图View停止定位后，会调用此函数
     *@param mapView 地图View
     */
    func didStopLocatingUser() {
        print("didStopLocatingUser")
    }
    //MARK:相同间隔距离
    func SameIntervalDistance()
    {
        let pointNow:BMKMapPoint  = BMKMapPointForCoordinate(CLLocationCoordinate2DMake(locaitonUser.location.coordinate.latitude,locaitonUser.location.coordinate.longitude));
        let  beforelat = dictionaryExample["locationlat"]
        let  beforelon = dictionaryExample["locationlon"]
        let pointBefore:BMKMapPoint  = BMKMapPointForCoordinate(CLLocationCoordinate2DMake(beforelat! as! CLLocationDegrees ,beforelon! as! CLLocationDegrees));
        let distance:CLLocationDistance =  BMKMetersBetweenMapPoints(pointBefore,pointNow)
        
        if distance >= 10 {

            locationUserMessage(nameString:"")
            
        }
        print(distance)
    }
    //MARK:画出地图上的运动轨迹和记录点
    func locationLine()
    {
        //dictionaryExample
        for i in 0...arrayExample.count - 1 {
            
            let  dictionary:NSDictionary = arrayExample[i] as! NSDictionary
            let  locationlat:Double =  dictionary.value(forKey: "locationlat") as! Double
            let  locationlon:Double =  dictionary.value(forKey: "locationlon") as! Double
            let coords2DMake = CLLocationCoordinate2DMake(locationlat ,locationlon )
            coord.add(coords2DMake)
            
            pointAnnotation = BMKPointAnnotation()
            pointAnnotation?.coordinate = CLLocationCoordinate2DMake(locationlat, locationlon)
//            pointAnnotation?.title = locationlat
//            pointAnnotation?.subtitle = locationlon
            
            informationMapView.addAnnotation(pointAnnotation)
        }
    }

    
    // MARK: - BMKMapViewDelegate
    
    /**
     *根据overlay生成对应的View
     *@param mapView 地图View
     *@param overlay 指定的overlay
     *@return 生成的覆盖物View
     */
    func mapView(_ mapView: BMKMapView!, viewFor overlay: BMKOverlay!) -> BMKOverlayView! {
        
            let polylineView = BMKPolylineView(overlay: overlay)
           
            polylineView?.strokeColor =  UIColor(red: 0, green: 0, blue: 0.5, alpha: 1)
            polylineView?.lineWidth = 3
            polylineView?.loadStrokeTextureImage(UIImage(named: "texture_arrow.png"))
            return polylineView

    }
    
    /**
     *当mapView新添加overlay views时，调用此接口
     *@param mapView 地图View
     *@param overlayViews 新添加的overlay views
     */
    func mapView(_ mapView: BMKMapView!, didAddOverlayViews overlayViews: [Any]!) {
        print("didAddOverlayViews")
    }
    //MARK:进入商店内部
    @IBAction func informationAction(_ sender: UIButton)
    {
       intoBool = false
    }
    //MARK:退出商店
    @IBAction func exitShopAction(_ sender: UIButton)
    {
        intoBool = true
    }
    //MARK:开始录音
    func startToRecord()
    {
//        let start  =      VoiceBroadcasManager()
//        start.startTranslattion(message: "录音开始", countrylanguage: "11")
        numberLabel.isHidden = false
        record.beginRecord(HelperManager.file_pathString(nameString: "\(HelperManager.converLocalTime())_\(number + 1).wav"))
        soundName.add("\(HelperManager.converLocalTime())_\(number + 1).wav")
        timeToStopRecord()
        
    }
    //MARK: 定义需要计时的时间
    func timeToStopRecord()
    {
        
        var timeCount = 10
        // 在global线程里创建一个时间源
        let codeTimer = DispatchSource.makeTimerSource(queue:      DispatchQueue.global())
        // 设定这个时间源是每秒循环一次，立即开始
        codeTimer.schedule(deadline: .now(), repeating: .seconds(1))
        // 设定时间源的触发事件
        codeTimer.setEventHandler(handler: {
          
            // 返回主线程处理一些事件，更新UI等等
            timeCount = timeCount - 1
            DispatchQueue.main.async {
              
                if timeCount <= 0
                {
                    self.numberLabel.isHidden = true
                }
                 self.numberLabel.text = String(timeCount)
                print(timeCount)
            }
            // 每秒计时一次
           
           
            // 时间到了取消时间源
            if timeCount <= 0 {
//
                self.stopRecordAction()
//                let start  =      VoiceBroadcasManager()
//                start.startTranslattion(message: "录音结束", countrylanguage: "11")
                codeTimer.cancel()
            }
        })
        // 启动时间源
        codeTimer.resume()
        
    }
    
    
    //MARK:获取需要记录点的坐标
    func  locationUserMessage(nameString:String)
    {
        
        if intoBool == true
        {
       
        let locationlat :Double =   locaitonUser.location.coordinate.latitude
        let locationlon :Double  =    locaitonUser.location.coordinate.longitude
        //TODO:划线和点
        var polyline: BMKPolyline?
        if arrayExample.count != 0{
        if polyline == nil {
            var coords = [
    CLLocationCoordinate2DMake(Double(dictionaryExample["locationlat"] as! Double),  Double(dictionaryExample["locationlon"]  as! Double)),
 
        CLLocationCoordinate2DMake(locationlat, locationlon)]
            polyline = BMKPolyline(coordinates: &coords, count: 2)
        }
            informationMapView.add(polyline)
 
            let  locationlat:Double =  dictionaryExample.value(forKey: "locationlat") as! Double
            let  locationlon:Double =  dictionaryExample.value(forKey: "locationlon") as! Double
            let coords2DMake = CLLocationCoordinate2DMake(locationlat ,locationlon )
            coord.add(coords2DMake)
            
            pointAnnotation = BMKPointAnnotation()
            pointAnnotation?.coordinate = CLLocationCoordinate2DMake(locationlat, locationlon)
            informationMapView.addAnnotation(pointAnnotation)
            
        }
        
        dictionaryExample = ["locationlat":locationlat as AnyObject,"locationlon":locationlon as AnyObject,"headering":locaitonUserHeadering.heading.trueHeading as AnyObject,"soundName":nameString as AnyObject]
     
            arrayExample.add(dictionaryExample)
            
        }
    }
    //MARK:数据库优化
    func  coredatamanager()
    {
        //arrayExample
        let locationDic = NSMutableDictionary()
        locationDic.setValue(HelperManager.converLocalTime(), forKey: "locationDate")
        locationDic.setValue(HelperManager.converLocalTime(), forKey: "locationName")
        locationDic.setValue(1, forKey: "locationID")
        uploadToNetwork()
//        CoredataManager.coredataManagerLocation(LocationDic: locationDic, coordinatesArray: arrayExample)
//
        
    }
    //MARK:上传数据到服务器
    func uploadToNetwork()
    {
        let  jsonStr = HelperManager.dataTypeTurnJson(element: arrayExample)
        let parameters2      = ["filesName":HelperManager.converLocalTime(),"time":HelperManager.converLocalTime(),"location":jsonStr,"locaitonName":"newland"]
        Alamofire.request("http://192.168.123.1:8000/blindLanter/locationRequest/",method:.post, parameters: parameters2)
            .responseJSON { response in
               
                print("result==\(response.result)")// 返回结果，是否成功
                if String(describing: response.result) == "SUCCESS"
                {
                 
                }
                else
                {
                    
                }
                
        }
    }

    func testSaveArrayPlist(arrayObject:NSMutableArray) ->NSData{
        //JSONSerialization
        let data = try? JSONSerialization.data(withJSONObject: arrayObject, options: JSONSerialization.WritingOptions.prettyPrinted)
        let strJson = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
        let dataExample : NSData = NSKeyedArchiver.archivedData(withRootObject: strJson as Any) as NSData
      return dataExample
        //locationSoundName
       
    }
    //MARK: 保存特定的坐标数据
    func userLocationData(array:[AnyObject])->NSData
    {
        let dic:[String:AnyObject] = ["arrayDic":array as AnyObject]
        
        let dataExample : NSData = NSKeyedArchiver.archivedData(withRootObject: dic) as NSData
        return dataExample
        
    }
    @IBAction func EmergencyContactAction(_ sender: UIButton)
    {
        startToRecord()
        locationUserMessage(nameString: HelperManager.converLocalTime())

    }
    

}
