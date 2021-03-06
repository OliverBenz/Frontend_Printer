import { Print } from './../classes/print';
import { Job } from './../classes/job';
import { HelpersService } from './../services/helpers.service';
import { PrintsService } from './../services/prints.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, AfterContentInit{
  // usrid, amount, date, date_until, filename, name, time, length, weight, price
  private file: File = null;

  constructor(
    private printsService: PrintsService,
    private authService: AuthService,
    private helpersService: HelpersService
  ) { }

  ngOnInit() {
    this.helpersService.file.subscribe(file => {
      if(file != null){
        this.file = file;
      }
    });
  }

  ngAfterContentInit(){
    if(this.file != null){
      this.checkFilename();
    }
  }

  public checkFilename(){
    let filename = this.file.name.split(".gcode")[0];
    
    if((filename.split("_").length - 1) == 4){
      let obj = filename.split("_");

      (<HTMLInputElement>document.getElementById("filename")).value = filename;
      (<HTMLInputElement>document.getElementById("name")).value = obj[0].replace(/-/g, " ");
      (<HTMLInputElement>document.getElementById("time")).value = this.formatTime(obj[1]);
      (<HTMLInputElement>document.getElementById("length")).value = obj[2].replace(",", ".");
      (<HTMLInputElement>document.getElementById("weight")).value = obj[3].replace(",", ".");
      // (<HTMLInputElement>document.getElementById("price")).value = obj[4].replace(",", ".");
    }
  }

  // TODO: Only allow file upload if logged in

  public submit(){
    if(this.authService.checkSessionId()){
      // Filename:     usrid-amount-date-date_until-filename-name-time-length-weight-price
      var amount = (<HTMLInputElement>document.getElementById("amount")).value;
      var date = new Date().toISOString().split("T")[0];
      var dateUntil = (<HTMLInputElement>document.getElementById("date_until")).value;
      var filename = (<HTMLInputElement>document.getElementById("filename")).value;
      var name = (<HTMLInputElement>document.getElementById("name")).value;
      var time = (<HTMLInputElement>document.getElementById("time")).value;
      var length = (<HTMLInputElement>document.getElementById("length")).value;
      var weight = (<HTMLInputElement>document.getElementById("weight")).value;
      // var price = (<HTMLInputElement>document.getElementById("price")).value;
      var notes = (<HTMLInputElement>document.getElementById("notes")).value;

      let usrid: number = 0;

      // "+" is to cast string to number
      let job: Job = new Job(0, +amount, date, notes, filename, name, this.round(+time), this.round(+length), this.round(+weight));
      job.setDateUntil(dateUntil);

      // let print: Print = new Print(this.authService.getSessionId(), +amount, date, date_until, filename, name, Math.round(+time * 100) / 100, Math.round(+length * 100) / 100, Math.round(+weight * 100) / 100, Math.round(+price * 100) / 100, notes);
 
      this.printsService.postPrint(job, this.file);
      this.clearInput();
    }
    else{
      alert("Login Needed");
    }

  }

  private round(val){
    return Math.round(val * 100) / 100
  }

  private formatTime(str){
      var time = str.split("h");
      time[1] = (time[1].split("min"))[0];
      time =  +time[0] + (((time[1] / 100) / 60) * 100);

    return time;
  }

  private clearInput(){
    (<HTMLFormElement>document.getElementById('printForm')).reset();
  }
}
