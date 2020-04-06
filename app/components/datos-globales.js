import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class DatosGlobalesComponent extends Component {
  @tracked globalInfo = this.globalData();

  globalData(){
    const data = this.args.globalInfo;
    return A([
      {
        "title":"Infections",
        "casesIncrease": data.casesIncrease,
        "cases": this.numberWithCommas(data.cases),
        "typeText": "primary",
        "extraData": this.numberWithCommas(data.todayCases)+" today",
        "icon": "lungs-virus"
      },
      {
        "title":"Deaths",
        "casesIncrease": data.dethIncrease,
        "cases": this.numberWithCommas(data.deaths),
        "typeText": "danger",
        "extraData": this.numberWithCommas(data.todayDeaths)+" today",
        "icon": "skull-crossbones"
      },
      {
        "title": "Recovered",
        "casesIncrease": data.recoveredIncrease,
        "cases": this.numberWithCommas(data.recovered),
        "typeText": "success",
        "extraData": this.numberWithCommas(data.remainingSick)+" sick",
        "icon": "virus-slash"
      },
      {
        "title": "Critical",
        "casesIncrease": data.criticalIncrease,
        "cases": this.numberWithCommas(data.totalCritical),
        "typeText": "warning",
        "extraData": this.numberWithCommas(data.casesPerMillion)+" *M",
        "icon": "exclamation"
      }
    ]);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
