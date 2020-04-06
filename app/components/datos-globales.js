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
        "cases": data.cases,
        "typeText": "primary",
        "extraData": data.todayCases+" today",
        "icon": "lungs-virus"
      },
      {
        "title":"Deaths",
        "casesIncrease": data.dethIncrease,
        "cases": data.deaths,
        "typeText": "danger",
        "extraData": data.todayDeaths+" today",
        "icon": "skull-crossbones"
      },
      {
        "title": "Recovered",
        "casesIncrease": data.recoveredIncrease,
        "cases": data.recovered,
        "typeText": "success",
        "extraData": data.remainingSick+" sick",
        "icon": "virus-slash"
      },
      {
        "title": "Critical",
        "casesIncrease": data.criticalIncrease,
        "cases": data.totalCritical,
        "typeText": "warning",
        "extraData": data.casesPerMillion+" *M",
        "icon": "exclamation"
      }
    ]);
  }
}
