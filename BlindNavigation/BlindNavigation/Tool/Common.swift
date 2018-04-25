//
//  Common.swift
//  EveryOne
//
//  Created by Zhao.bin on 16/1/12.
//  Copyright © 2016年 Zhao.bin. All rights reserved.
//

import Foundation
import UIKit

//Colors
let systemColorClear : UIColor = UIColor.clear
let SystemColorGreen : UIColor = UIColor(red: 76/255.0, green: 217/255.0, blue: 100/255.0, alpha: 1)
let SystemColorGray : UIColor = UIColor(red: 200/255.0, green: 200/255.0, blue: 200/255.0, alpha: 1)
let SystemColorLightRed : UIColor = UIColor(red: 220/255.0, green: 100/255.0, blue: 80/255.0, alpha: 1)
let SystemColorRed : UIColor = UIColor(red: 250/255.0, green: 100/255.0, blue: 80/255.0, alpha: 1)
let SystemColorLightBlack : UIColor = UIColor(red: 100/255.0, green: 100/255.0, blue: 100/255.0, alpha: 1)
let SystemColorBlue : UIColor = UIColor(red: 90/255.0, green: 185/255.0, blue: 230/255.0, alpha: 1)
let SystemColorLightWhite : UIColor = UIColor(red: 150/255.0, green: 150/255.0, blue: 150/255.0, alpha: 1)

//Paths
//Level - 1
private let kPathRootArray = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)
let kPathRoot = kPathRootArray[0] as String

//Level - 2
let kPathCoreData = kPathRoot + "/Coredata"

//Level - 3
let kPathSQLITE = kPathCoreData + "/Model.Sqlite"

let Common_busUrl = "http://op.juhe.cn/189/bus/busline"
let Common_OK = " 确认"
let Common_Warning = "警告"
let locationRequest = "http://192.168.123.1:8000/blindLanter/locationRequest/"



//"ar-SA " //沙特阿拉伯（阿拉伯文）
//
//"en-ZA"//南非（英文）
//
//nl-BE, 比利时（荷兰文）
//
//en-AU, 澳大利亚（英文）
//
//th-TH, 泰国（泰文）
//
//de-DE, 德国（德文）
//
//en-US, 美国（英文）
//
//pt-BR, 巴西（葡萄牙文）
//
//pl-PL, 波兰（波兰文）
//
//en-IE, 爱尔兰（英文）
//
//el-GR, 希腊（希腊文）
//
//id-ID, 印度尼西亚（印度尼西亚文）
//
//sv-SE, 瑞典（瑞典文）
//
//tr-TR, 土耳其（土耳其文）
//
//pt-PT, 葡萄牙（葡萄牙文）
//
//ja-JP, 日本（日文）
//
//ko-KR, 南朝鲜（朝鲜文）
//
//hu-HU, 匈牙利（匈牙利文）
//
//cs-CZ, 捷克共和国（捷克文）
//
//da-DK, 丹麦（丹麦文）
//
//es-MX, 墨西哥（西班牙文）
//
//fr-CA, 加拿大（法文）
//
//nl-NL, 荷兰（荷兰文）
//
//fi-FI, 芬兰（芬兰文）
//
//es-ES, 西班牙（西班牙文）
//
//it-IT, 意大利（意大利文）
//
//he-IL, 以色列（希伯莱文，阿拉伯文）
//
//no-NO, 挪威（挪威文）
//
//ro-RO, 罗马尼亚（罗马尼亚文）
//
//zh-HK, 香港（中文）
//
//zh-TW, 台湾（中文）
//
//sk-SK, 斯洛伐克（斯洛伐克文）
//
//zh-CN, 中国（中文）
//
//ru-RU, 俄罗斯（俄文）
//
//en-GB, 英国（英文）
//
//fr-FR, 法国（法文）
//
//hi-IN  印度（印度文）




