import Route from '@ember/routing/route';
import jQuery from 'jquery';

export default class CoronavirusRoute extends Route {
  model(){
    return jQuery.get(
      'http://api.coronastatistics.live/countries', function(data, status){
      return data;
    });
  }
}
