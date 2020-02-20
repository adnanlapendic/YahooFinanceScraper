import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { DbService } from './db/db.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly dbService:DbService) {}

  @Get(':date')
  async getTickers(@Param('date') date) {
    console.log(date);
    
    const data =  await this.appService.getTickerInfo(date);
    let dataFromDb;
    try {
      dataFromDb = await this.dbService.saveData(data);      
    } catch (error) {
      console.log(error);
      
    }
    return data;
  }
}
