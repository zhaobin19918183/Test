//
//  LocationEntity+CoreDataProperties.swift
//  
//
//  Created by newland on 2018/4/2.
//
//

import Foundation
import CoreData


extension LocationEntity {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<LocationEntity> {
        return NSFetchRequest<LocationEntity>(entityName: "LocationEntity")
    }

    @NSManaged public var coordinates: NSData?
    @NSManaged public var locationMessage: NSData?

}
