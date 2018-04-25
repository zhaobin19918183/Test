//
//  NavitionDetailViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/3/30.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit
import CoreLocation
import AudioToolbox
class NavitionDetailViewController: UIViewController,BMKMapViewDelegate,BMKLocationServiceDelegate,CLLocationManagerDelegate,BMKRouteSearchDelegate {
    @IBOutlet weak var informationMapView: BMKMapView!
    var locaitonUser : BMKUserLocation!
    var locationService: BMKLocationService!
    let dic = NSMutableDictionary()
    var circle: BMKCircle?
    var polygon: BMKPolygon?
    var lostpolyline: BMKPolyline?
    //途经点
    var polyline: BMKPolyline?
    //起始点
    var startline: BMKPolyline?
    //终点
    var endine: BMKPolyline?
    //录音点
    var videoline: BMKPolyline?
    var colorfulPolyline: BMKPolyline?
    var arcline: BMKArcline?
    var ground: BMKGroundOverlay?
    var pointAnnotation: BMKPointAnnotation?
    var animatedAnnotation: BMKPointAnnotation?
    var lockedScreenAnnotation: BMKPointAnnotation?
    let coord = NSMutableArray()
    var dictionaryExample : [String:AnyObject] = [:]
    var index:Int = 0 
    var arrayExample : [AnyObject] = []
    var entity = LocationEntity()
    var  record = RecordManager()
       let start  =      VoiceBroadcasManager()
    //第几个点
    var pointNumber:Int = 0
    var mindistance = Int()
    var nextdistance = Int()
    var nextPoint = Int()
    var lostDistance = Int()
    var CoordinatesArray = [Coordinates]()
    var numberint:Int = 0
    var routeSearch: BMKRouteSearch!
    @IBOutlet weak var numberLabel: UILabel!
    @IBOutlet weak var targetImageVIew: UIImageView!
    var lostBool:Bool = true
    var locaitonBool:Bool = true
    var routeSearchBool:Bool = true
    var  AnnotationViewID : String = ""
    var RouteAnnotationArr = [BMKWalkingStep]()
    var stepInt:Int = 0
    var nextStepInt:Int = 0
    
    @IBOutlet weak var naviView: UIView!
    
    @IBOutlet weak var detailTextView: UITextView!
    override func viewDidLoad() {
        super.viewDidLoad()
        numberLabel.isHidden = true
        locationService = BMKLocationService()
        locationService.allowsBackgroundLocationUpdates = true
        locationService.startUserLocationService()
        informationMapView.showsUserLocation = false//先关闭显示的定位图层
        informationMapView.delegate = self
        informationMapView.userTrackingMode = BMKUserTrackingModeFollow //设置定位的状态
        informationMapView.zoomLevel = 20.0
        informationMapView.showsUserLocation = true//显示定位图层
        CoordinatesLine()
        playMusicFile(number: 0)
    
    }
    override func viewDidDisappear(_ animated: Bool)
    {
        start.cancleSpeek()
    }
    @objc func customLocationAccuracyCircle()
    {
        self.navigationController?.popViewController(animated: true)
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
    /**
     *在地图View将要启动定位时，会调用此函数
     *@param mapView 地图View
     */
    func willStartLocatingUser() {
        print("willStartLocatingUser");
    }
    /**
     *用户方向更新后，会调用此函数
     *@param userLocation 新的用户位置
     */
    func didUpdateUserHeading(_ userLocation: BMKUserLocation!) {
        print("didUpdateUserHeading")
        LostToJudge(location: userLocation, number: nextdistance)
    }
    /**
     *用户位置更新后，会调用此函数
     *@param userLocation 新的用户位置
     */
    func didUpdate(_ userLocation: BMKUserLocation!) {
        print("didUpdate")
        locaitonUser = userLocation
        informationMapView.updateLocationData(userLocation)
        if userLocation.heading != nil
        {
         ClosestPointOfDistance(userLocation: userLocation)
        }
    }
    //MARK:最近点
    func  ClosestPointOfDistance(userLocation: BMKUserLocation)
    {
        let pointNow:BMKMapPoint =   BMKMapPointForCoordinate(CLLocationCoordinate2DMake(userLocation.location.coordinate.latitude,userLocation.location.coordinate.longitude));
        var pointDistanceArr:[AnyObject] = []
        for i  in 0...CoordinatesArray.count - 1 {
            let  coordinates:Coordinates = CoordinatesArray[i]
            let  locationlat =  coordinates.locationX
            let  locationlon =  coordinates.locationY
            let pointBefore:BMKMapPoint =   BMKMapPointForCoordinate(CLLocationCoordinate2DMake(Double(locationlat),Double(locationlon)));
           let distance  =  BMKMetersBetweenMapPoints(pointNow,pointBefore)
            pointDistanceArr.append(distance as AnyObject)
        }
        var min = Int(truncating: pointDistanceArr[0] as! NSNumber)
        for i in 1..<pointDistanceArr.count - 1 {
            
            let mindis = Int(truncating: pointDistanceArr[i] as! NSNumber)
            if  mindis < min  {
                min = mindis
                // mindistance 最近导航点在已知数组中的位置
                mindistance = i
            }
        }
        let numberInt:Int = mindistance + 1
        numberLabel.text = String(numberInt)
        self.detailTextView.text = String("ClosestPointOfDistance === 最近距离\(min),当前第\(numberInt)个点")
        if  lostBool == true
        {
            lostBool = false
            if  min > 10
            {
                goToFitstLoactionHeader(startLoaciton: userLocation, number: mindistance)
            }
            else
            {
                  nextPoint(location: userLocation, number: mindistance)
            }
        }
        else
        {
            nextPoint(location: userLocation, number: mindistance)
        }
    }
    //MARK:是否到达下一个坐标点
    func nextPoint(location:BMKUserLocation, number:Int)
    {
        naviView.isHidden = true
        let  coordinates:Coordinates = CoordinatesArray[number]
        let distance = HelperManager.distanceBetweenTheCoordinates(startPointlat: coordinates.locationX, startPointlon: coordinates.locationY, endPointLat:location.location.coordinate.latitude, endPointLon: location.location.coordinate.longitude)
 
        if distance  <= 2
        {
            locaitonBool = false
            start.startTranslattion(message: "距离第\(number)目标位置还有2米,请注意", countrylanguage: "11")
            nextdistance = number + 1
            playMusicFile(number:nextPoint)
        }

    }
    //MARK:播放录音文件
    func playMusicFile(number:Int)
    {
        start.pauseTranslation()
        let  coordinates:Coordinates = CoordinatesArray[number]
        if coordinates.soundName != ""
        {
          record.play(HelperManager.file_pathString(nameString: coordinates.soundName!))
        }
        
    }
    //MARK:判断是否迷路 == 线外
    func goToFitstLoactionHeader(startLoaciton:BMKUserLocation,number:Int)
    {
        let  coordinates:Coordinates = CoordinatesArray[number]
        let  locationlat =  coordinates.locationX
        let  locationlon =  coordinates.locationY
        if routeSearchBool == true
        {
            routeSearchBool = false
            let from = BMKPlanNode()
            from.pt = startLoaciton.location.coordinate
            let to = BMKPlanNode()
            to.pt = CLLocationCoordinate2DMake(locationlat, locationlon)
            let walkingRouteSearchOption = BMKWalkingRoutePlanOption()
            walkingRouteSearchOption.from = from
            walkingRouteSearchOption.to = to
            let flag = routeSearch.walkingSearch(walkingRouteSearchOption)
            if flag {
                print("步行检索发送成功")
            }else {
                print("步行检索发送失败")
            }
        }
        let distance = HelperManager.distanceBetweenTheCoordinates(startPointlat: coordinates.locationX, startPointlon: coordinates.locationY, endPointLat:startLoaciton.location.coordinate.latitude, endPointLon: startLoaciton.location.coordinate.latitude)
        
        if distance <=  2
         {
                lostBool = false
                let numberInt:Int = mindistance + 2
                let start  =      VoiceBroadcasManager()
                start.startTranslattion(message: "初次导航距离第\(numberInt)目标位置还有2米,请注意", countrylanguage: "china")
        }

    }
    //MARK:判断是否迷路 == 当前位置距离最近的坐标点如果距离大于2米,择按照步行导航的线上点角度进行判断,当距离小于2米后按照原有线路上的方向进行导航
    func  LostToJudge(location:BMKUserLocation,number:Int)
    {

        let  coordinates:Coordinates = CoordinatesArray[number]
        let  heading:Double =  coordinates.heading
        let distance = HelperManager.distanceBetweenTheCoordinates(startPointlat: coordinates.locationX, startPointlon: coordinates.locationY, endPointLat:location.location.coordinate.latitude, endPointLon: location.location.coordinate.longitude)
        
         self.detailTextView.text = String("next === 目标角度\(heading),当前角度\(location.heading.trueHeading) ,距离 ==\(distance)")
        if distance > 2 && RouteAnnotationArr.count != 0 && stepInt < RouteAnnotationArr.count
        {
           // RouteAnnotationArr
            let transitStep:BMKWalkingStep = RouteAnnotationArr[stepInt]
            let  headingStep:Double =  Double(transitStep.direction)*30
            HelperManager.Angularvibration(beforeHeading: location.heading.trueHeading, nowHeading: headingStep)
            self.targetImageVIew.transform = CGAffineTransform(rotationAngle: CGFloat(headingStep))
            let distanceStep = HelperManager.distanceBetweenTheCoordinates(startPointlat: transitStep.points[stepInt].x, startPointlon: transitStep.points[stepInt].y, endPointLat:location.location.coordinate.latitude, endPointLon: location.location.coordinate.longitude)
            if distanceStep < 1
            {
                stepInt = stepInt + 1
            }
        }
        
        if distance <= 2
        {
           
                self.targetImageVIew.transform =  CGAffineTransform(rotationAngle: CGFloat(heading))
            HelperManager.Angularvibration(beforeHeading: location.heading.trueHeading, nowHeading: heading)
        }

    }
    func onGetWalkingRouteResult(_ searcher: BMKRouteSearch!, result: BMKWalkingRouteResult!, errorCode error: BMKSearchErrorCode) {
        print("onGetWalkingRouteResult: \(error)")
        naviView.isHidden = true
        //BMKUserLocation
        if error == BMK_SEARCH_NO_ERROR {
            let plan = result.routes[0] as! BMKWalkingRouteLine
            
            let size = plan.steps.count
            var planPointCounts = 0
            for i in 0..<size {
                let transitStep = plan.steps[i] as! BMKWalkingStep
                RouteAnnotationArr.append(transitStep)
                if i == 0 {
                    let item = RouteAnnotation()
                    item.coordinate = plan.starting.location
                    item.title = "起点"
                    item.type = 0
                    informationMapView.addAnnotation(item)  // 添加起点标注
                }
                if i == size - 1 {
                    let item = RouteAnnotation()
                    item.coordinate = plan.terminal.location
                    item.title = "终点"
                    item.type = 1
                    informationMapView.addAnnotation(item)  // 添加终点标注
                }
                //TODO: 添加 annotation 节点 节点上描述文字
                let item = RouteAnnotation()
                item.coordinate = transitStep.entrace.location
                item.title = transitStep.entraceInstruction
                item.degree = Int(transitStep.direction) * 30
                item.type = 4
                informationMapView.addAnnotation(item)
              
                print(transitStep.direction)
                // 轨迹点总数累计
                planPointCounts = Int(transitStep.pointsCount) + planPointCounts
            }

            // 轨迹点
            var tempPoints = Array(repeating: BMKMapPoint(x: 0, y: 0), count: planPointCounts)
            var i = 0
            for j in 0..<size {
                let transitStep = plan.steps[j] as! BMKWalkingStep
                for k in 0..<Int(transitStep.pointsCount) {
                    tempPoints[i].x = transitStep.points[k].x
                    tempPoints[i].y = transitStep.points[k].y
                    i += 1
                }
            }
            // 通过 points 构建 BMKPolyline
            let polyLine = BMKPolyline(points: &tempPoints, count: UInt(planPointCounts))
            informationMapView.add(polyLine)  // 添加路线 overlay
//            mapViewFitPolyLine(polyLine)
        } else if error == BMK_SEARCH_AMBIGUOUS_ROURE_ADDR {
    }
    }
    //根据polyline设置地图范围
   func mapViewFitPolyLine(_ polyline: BMKPolyline!) {
        if polyline.pointCount < 1 {
            return
        }
        let pt = polyline.points[0]
        var leftTopX = pt.x
        var leftTopY = pt.y
        var rightBottomX = pt.x
        var rightBottomY = pt.y
        for i in 1..<polyline.pointCount {
            let pt = polyline.points[Int(i)]
            leftTopX = pt.x < leftTopX ? pt.x : leftTopX;
            leftTopY = pt.y < leftTopY ? pt.y : leftTopY;
            rightBottomX = pt.x > rightBottomX ? pt.x : rightBottomX;
            rightBottomY = pt.y > rightBottomY ? pt.y : rightBottomY;
        }
        let rect = BMKMapRectMake(leftTopX, leftTopY, rightBottomX - leftTopX, rightBottomY - leftTopY)
        informationMapView.visibleMapRect = rect
    }
    /**
     *在地图View停止定位后，会调用此函数
     *@param mapView 地图View
     */
    func didStopLocatingUser() {
        print("didStopLocatingUser")
    }
    func getDictionaryFromJSONString(jsonString:String) ->NSArray{
        let jsonData:Data = jsonString.data(using: .utf8)!
        let dict = try? JSONSerialization.jsonObject(with: jsonData, options: .mutableContainers)
        if dict != nil {
            return dict as! NSArray
        }
        return NSArray()
    }
    //MARK:画出地图上的运动轨迹和记录点
    func CoordinatesLine()
    {
        AnnotationViewID = "renameMark"
        for i in 0...CoordinatesArray.count - 1 {
            let  coordinates:Coordinates = CoordinatesArray[i]
            let coords2DMake = CLLocationCoordinate2DMake(coordinates.locationX,coordinates.locationY )
            coord.add(coords2DMake)
            pointAnnotation = BMKPointAnnotation()
            pointAnnotation?.coordinate = CLLocationCoordinate2DMake(coordinates.locationX,coordinates.locationY)
            informationMapView.addAnnotation(pointAnnotation)
        }
         self.addOverlayViews()
         self.routeSearchBMK()
    }
    func  routeSearchBMK()
    {
        AnnotationViewID = "routeSearch"
        routeSearch = BMKRouteSearch()
        routeSearch.delegate = self
    }
    func mapView(_ mapView: BMKMapView!, viewFor annotation: BMKAnnotation!) -> BMKAnnotationView! {
        var annotationView = mapView.dequeueReusableAnnotationView(withIdentifier: AnnotationViewID) as! BMKPinAnnotationView?
        if annotationView == nil {
            annotationView = BMKPinAnnotationView(annotation: pointAnnotation, reuseIdentifier: AnnotationViewID)
            if (annotation as! BMKPointAnnotation) == lockedScreenAnnotation {
                // 设置颜色
                annotationView!.pinColor = UInt(BMKPinAnnotationColorPurple)
                // 设置可拖拽
                annotationView!.isDraggable = false
            } else {
                annotationView!.isDraggable = true
            }
            
            if AnnotationViewID != "routeSearch"
                {
                    let label = UILabel()
                    label.frame = CGRect(x:0, y: 10, width: 25, height: 25)
                    label.backgroundColor = UIColor.blue
                    label.textColor = UIColor.white
                    numberint = numberint + 1
                    label.clipsToBounds = true
                    label.layer.cornerRadius = 8
                    label.textAlignment = NSTextAlignment.center
                    label.text = String(numberint )
                    annotationView?.addSubview(label)
                    annotationView?.image = nil
            }
        }
        annotationView?.annotation = annotation
        return annotationView
    }
    //添加内置覆盖物
    func addOverlayViews() {
        // 添加折线覆盖物
        if polyline == nil {
            var coords = [
                self.coord[0] as!  CLLocationCoordinate2D]
            for i in 1...coord.count - 1
            {
                coords.append(self.coord[i] as!  CLLocationCoordinate2D)
            }
            polyline = BMKPolyline(coordinates: &coords, count: UInt(coord.count))
        }
        informationMapView.add(polyline)
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
}
