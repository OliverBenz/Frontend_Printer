import { Queue } from '../classes/queue';
import { History } from '../classes/history';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { HelpersService } from './helpers.service';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class PrintsService {
  // Article Normal
  private queueSource = new BehaviorSubject<any>("");
  queue = this.queueSource.asObservable();

  // Article Normal
  private printsSource = new BehaviorSubject<any>("");
  prints = this.printsSource.asObservable();

  private file: File = null;

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) {
    this.helpersService.file.subscribe(file => {
      if(file){
        this.file = file;
      }
    })
  }

  public getQueue(){
    let url = "http://127.0.0.1:5000/queue/To-Do";

    this.http.get<any>(url, httpOptions).subscribe(data => {
      var queueList: Array<Queue> = [];
      
      for(let i = 0; i < data.data.length; i++){
        queueList.push(new Queue(data.data[i]))
      }
      this.queueSource.next(queueList);
    })
  }

  public getUserPrints(value: string, sessionId: string){
    let url = "http://127.0.0.1:5000/user/" + value + "/" + sessionId;

    this.http.get<any>(url, httpOptions).subscribe(data => {
      var historyList: Array<History> = [];
      console.log(data);
      for(let i = 0; i < data.data.length; i++){
        historyList.push(new History(data.data[i]));
      }

      this.printsSource.next(historyList);
    });
  }

  public postPrint(obj){

    // Filename:     sessionId-amount-date-date_till-filename-name-time-length-weight-price

    let body = JSON.parse('{"sessionId": "' + obj.getSessionId() + '", "amount": "' + obj.getAmount() + '", "date": "' + obj.getDate() + '", "date_until": "' + obj.getDateUntil() + '", "filename": "' + obj.getFilename() + '", "name": "' + obj.getName() + '", "time": "' + obj.getTime() + '", "length": "' + obj.getLength() + '", "weight": "' + obj.getWeight() + '", "price": "' + obj.getPrice() + '", "notes": "' + obj.getNotes() + '"}');
    
    this.http.post<any>("http://127.0.0.1:5000/add", body, httpOptions).subscribe(resp => {
      console.log("Success");
      console.log(resp);
    }), error => {
      console.log("Error");
      console.log(error);
    };

    console.log(this.file.name);
    const fd = new FormData();
    fd.append('print', this.file, this.file.name);
    this.http.post<any>("127.0.0.1:5000/file", fd).subscribe(res => {
      console.log(res);
    });
  }
}
