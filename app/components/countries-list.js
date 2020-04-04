import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import jQuery from 'jquery';
import { A } from '@ember/array';

export default class CountriesListComponent extends Component {
  @tracked countries = A(this.args.countries);

  @action
  async change(query){
    query = query.target.value;
    this.countries = A(this.args.countries.filter(
      obj => {
        if(obj.country.includes(query)){
          return obj
        }
      }
    ));
  }
}
