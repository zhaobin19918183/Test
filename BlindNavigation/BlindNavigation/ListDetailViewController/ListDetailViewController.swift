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
        return  10
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        let cell : NavigationTableViewCell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier) as!  NavigationTableViewCell
       
        
        return cell //在这个地方返回的cell一定不为nil，可以强制解包
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
