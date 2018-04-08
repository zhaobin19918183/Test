//
//  Location+CoreDataProperties.swift
//  
//
//  Created by newland on 2018/4/8.
//
//

import Foundation
import CoreData


extension Location {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Location> {
        return NSFetchRequest<Location>(entityName: "Location")
    }

    @NSManaged public var locationID: Int16
    @NSManaged public var locationName: String?
    @NSManaged public var locationDate: String?

}
