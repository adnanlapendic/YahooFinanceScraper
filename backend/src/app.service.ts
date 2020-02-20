import { Injectable, Next } from '@nestjs/common';
import cheerio = require('cheerio');
import { Company } from './model/company';
import { BASE_URL } from './util/constants';
const axios = require('axios').default;

@Injectable()
export class AppService {

  async getTickers(): Promise<Company[]> {
   
   const tickersData = axios.get(`${BASE_URL}/trending-tickers`)
    .then(function (response) {
        const $ = cheerio.load(response.data);   
        const tickers:Company[] = [];
        
        $('.yfinlist-table tr').each((i:number, el:HTMLElement)=> {
          const ticker = $(el).find('a').text();
          const name = $(el).find('.data-col1').text();
          const marketCap = $(el).find('.data-col8').text();
                    
          if(ticker !== '') {
            let company:Company = new Company();
            company.symbol = ticker;
            company.name = name;
            company.marketCap = marketCap;            
            tickers.push(company);
          }
        });
        return tickers;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    const result = await tickersData;
    return result;
  }


  async getTickerInfo(date:number) {
    const tickers = await this.getTickers();
      const promises = tickers.map(ticker => {
        return this.getSingleCompanyInfo(ticker, date);                         
      });
    return Promise.all(promises); 
  }


  async getSingleCompanyInfo(company: Company, date:number){
    return await axios.get(`${BASE_URL}/quote/${company.symbol}/profile?p=${company.symbol}`)
    .then(async function (response) {
      const $ = cheerio.load(response.data);
      const addressInHtml = $('.qsp-2col-profile').children().find('p').html();
      const employeesInHtml = $('.qsp-2col-profile').children().find('p').next().html(); 
      
      const extractedAddress: string[] = (addressInHtml !== null) ?  addressInHtml.replace(/<[^>]+>/g, '#').split('###') : 'No data'; 
      const extractedNumOfEmployees: string[] = (employeesInHtml !== null) ? employeesInHtml.replace(/<[^>]+>/g, '#').split('###') : 'No data'; 
      const employees: string = extractedNumOfEmployees[extractedNumOfEmployees.length -1];
      
      const numberOfEmployees: string = employees.substring(0, employees.length - 2);
      
      const address = (extractedAddress.length == 5) ? [extractedAddress[0].substr(1), extractedAddress[1]].join(', ') : [extractedAddress[0].substr(1), extractedAddress[1], extractedAddress[2]].join(', ');
      const country = (extractedAddress.length == 5) ? extractedAddress[2] : extractedAddress[3];   

      company.address = address;
      company.country = country;      
      company.numberOfEmployees = numberOfEmployees;

      return company;

    })
    .then( async (company:Company) => {
      const selectedDate = date/1000;
      const endDate = selectedDate + 86400;  
         return await axios.get(`${BASE_URL}/quote/${company.symbol}/history?period1=${selectedDate}&period2=${endDate}&interval=1d&filter=history&frequency=1d`)
         .then(response => {
           const $ = cheerio.load(response.data);

          const finDataForReqDate: string[] = [];
          $('.BdT td').each((i: number, el:HTMLElement) => {
            const asd = $(el).text();
            finDataForReqDate.push(asd);
          })
          
          company.date = finDataForReqDate[0];
          company.openPrice =  +finDataForReqDate[1]
          company.previousClosePrice = +finDataForReqDate[4]
          return company;

        }).catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async getFinanceReportForDate(company:Company, date){
    const selectedDate = date/1000;
      const endDate = selectedDate + 86400;  
         return await axios.get(`https://finance.yahoo.com/quote/${company.symbol}/history?period1=${selectedDate}&period2=${endDate}&interval=1d&filter=history&frequency=1d`)
         .then(response => {
           const $ = cheerio.load(response.data);

          const finDataForReqDate: string[] = [];
          $('.BdT td').each((i: number, el:HTMLElement) => {
            const asd = $(el).text();
            finDataForReqDate.push(asd);
          })
          
          company.date = finDataForReqDate[0];
          company.openPrice =  +finDataForReqDate[1]
          company.previousClosePrice = +finDataForReqDate[4]
          return company;

        }).catch(function (error) {
          console.log(error);
        });
  }

}
