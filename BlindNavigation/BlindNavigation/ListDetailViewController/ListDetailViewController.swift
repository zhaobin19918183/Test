//
//  ListDetailViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/3/30.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit

class ListDetailViewController: UIViewController,UITableViewDelegate,UITableViewDataSource {

   let cellIdentifier = "identifier"
    @IBOutlet weak var listDeatilTableView: UITableView!
    override func viewDidLoad() {
        super.viewDidLoad()
       
       listDeatilTableView!.register(UINib(nibName: "NavigationTableViewCell", bundle:nil), forCellReuseIdentifier: cellIdentifier)
        // Do any additional setup after loading the view.
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return  CoredataManager.SearchAllDataEntity().count
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 100
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        let cell : NavigationTableViewCell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier) as!  NavigationTableViewCell
        cell.selectionStyle = UITableViewCellSelectionStyle.none
        cell.localMssage(entityModel: NavigationModel.convertLocation(CoredataManager.SearchAllDataEntity()[indexPath.row] as! Location))
        return cell //在这个地方返回的cell一定不为nil，可以强制解包
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let  locationIndex : Location = CoredataManager.SearchAllDataEntity()[indexPath.row] as! Location
        print(CoredataManager.retriveEntityWith(identification: locationIndex).count)
        
        
        let navitionDetail    =  self.storyboard?.instantiateViewController(withIdentifier: "NavitionDetailView") as!  NavitionDetailViewController
        navitionDetail.index = indexPath.row
        navitionDetail.CoordinatesArray = CoredataManager.retriveEntityWith(identification: locationIndex)
        self.navigationController?.pushViewController(navitionDetail, animated: true)
        
        
        
        
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    


}
