import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import jQuery from 'jquery';
import { A } from '@ember/array';

export default class CountriesListComponent extends Component {
  @tracked countries = A(this.args.countries);

  @tracked item;

  sortByItems = [
    {
      "name": "Total Cases",
      "query": "cases"
    },
    {
      "name": "Today Cases",
      "query": "todayCases"
    },
    {
      "name": "Total Deaths",
      "query": "deaths"
    },
    {
      "name": "today Deaths",
      "query": "todayDeaths"
    },
    {
      "name": "Total Recoveries",
      "query": "recovered"
    },
    {
      "name": "Currently Active",
      "query": "active"
    },
    {
      "name": "Critical",
      "query": "critical"
    }
  ]

  @action
  change(query){
    console.log(this.args.countries);
    // query = query.target.value.toLowerCase();
    // this.countries = A(this.args.countries.filter(
    //   obj => {
    //     if(obj.country.toLowerCase().includes(query)){
    //       return obj
    //     }
    //   }
    // ));
  }

  @action
  async changeItems(item, closeDropdown){
    this.countries = await jQuery.get(
      "http://api.coronastatistics.live/countries/?sort="+item.query
    );
  }
}
