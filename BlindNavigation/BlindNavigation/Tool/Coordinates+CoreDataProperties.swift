//
//  Coordinates+CoreDataProperties.swift
//  
//
//  Created by newland on 2018/4/8.
//
//

import Foundation
import CoreData


extension Coordinates {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Coordinates> {
        return NSFetchRequest<Coordinates>(entityName: "Coordinates")
    }

    @NSManaged public var locationX: Double
    @NSManaged public var locationY: Double
    @NSManaged public var heading: Double
    @NSManaged public var relationship: Location?

}
