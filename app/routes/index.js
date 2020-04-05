import Route from '@ember/routing/route';
import jQuery from 'jquery';

export default class IndexRoute extends Route {

  async model(){
    return {
      "countries": await jQuery.get('http://api.coronastatistics.live/countries'),
      "global": await this.getGlobalJson()
    };
  }

  async getGlobalJson(){
    let data = {
      ...await jQuery.get('http://api.coronastatistics.live/all'),
      ...await this.getTotalCritical()
    }
    data['remainingSick'] = data.cases - (data.recovered + data.deaths)
    data = {
      ...data,
      ...this.getIncreasePercentage(data)
    }
    return data
  }

  async getTotalCritical(){
    const countriesArray = await jQuery.get('http://api.coronastatistics.live/countries');
    let critical = 0;
    let todayCases = 0;
    let todayDeaths = 0;
    let casesPerMillion = 0;
    for (var i = 0, _len = countriesArray.length; i < _len; i++) {
      critical += countriesArray[i]['critical'];
      todayCases += countriesArray[i]['todayCases'];
      todayDeaths += countriesArray[i]['todayDeaths'];
      casesPerMillion += countriesArray[i]['casesPerOneMillion'];
    }
    return {
      "totalCritical": critical,
      "todayCases": todayCases,
      "todayDeaths": todayDeaths,
      "casesPerMillion": casesPerMillion
    };
  }

  getIncreasePercentage(data){
    return {
      "casesIncrease": ((data.todayCases/data.cases)*100).toFixed(2)+"%",
      "dethIncrease": ((data.todayDeaths/data.deaths)*100).toFixed(2)+"%"
      // "recoveredIncrease": ((data.todadata.recovered))
      // "criticalIncrease": data.totalCritical
    }
  }
}
