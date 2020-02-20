import { Component } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ScrapeService } from './scrape.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YahooFinanceScraper';
  events: string[] = [];
  date;
  companies: any[]=[];
  showLoader = false;
  constructor(private scrapeService: ScrapeService) {
    console.log('test');
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }

  sendRequest(){
    this.showLoader = true;
    this.companies = []
    const d = new Date(this.date);
    const millis = d.getTime();

    this.scrapeService.getTickers(millis).subscribe((data: any[])=>{
      this.companies = data;
      this.showLoader = false;
      console.log(this.companies);

    });

    
    
    
  }
}
