import { Injectable } from '@nestjs/common';
import { Company } from 'src/model/company';
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'password',
      database : 'database23'
    }
  });

@Injectable()
export class DbService {
    async saveData(data:Company[]){
        const date = new Date();
        const dateInMillis = date.getTime();
        const id = await knex('request').insert({request_date: dateInMillis})
        
        data.forEach(async company => {
            if(company !== undefined){
                await knex('company').insert({symbol: company.symbol, name: company.name, market_cap: company.marketCap, address: company.address, 
                country: company.country, number_of_employees: company.numberOfEmployees, date: company.date, open_price:company.openPrice,
                previous_close_price: company.previousClosePrice, request_id: id});
            }
        });
    
    }
}
