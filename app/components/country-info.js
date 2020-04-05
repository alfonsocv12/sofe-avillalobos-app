import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class CountryInfoComponent extends Component {
  @tracked inputValue = "";
  @tracked countries = A(this.args.countries);
  @tracked selectedCountry = false;
  @tracked index = 0;
  @tracked countryInfo = this.setCountryData(this.countries[this.index]);

  @action
  change(query){
    this.inputValue = query.target.value;
  }

  @action
  countrySelected(value){
    this.index = value.target.selectedOptions[0].index;
    this.countryInfo = this.setCountryData(this.countries[this.index]);
    this.selectedCountry = (this.selectedCountry? false:true);
    return this.countryInfo
  }

  setCountryData(data){
    console.log(data);
    data['totalCritical'] = data.critical
    data['remainingSick'] = data.cases - (data.recovered + data.deaths)
    data['casesPerMillion'] = data.casesPerOneMillion
    data['casesIncrease'] = ((data.todayCases/data.cases)*100).toFixed(2)+"%"
    data['dethIncrease'] = ((data.todayDeaths/data.deaths)*100).toFixed(2)+"%"
    return data;
  }

}
