import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

var api_url = "https://petplant-server.herokuapp.com/";

@Injectable()
export class Data {

  constructor(public http: Http) {}

  get_plants_by_user(userId){
    return new Promise<any>((resolve,reject)=>{
      this.http.get(api_url+'get_plants_by_user/'+userId).subscribe(res=>{
        console.log(res);
        console.log(res.json());
        if (res.status==200){
          resolve(res.json());
        }else{
          reject();
        }
      });
    });
  }

}
