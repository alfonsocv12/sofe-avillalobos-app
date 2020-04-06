import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NumberCommasComponent extends Component {
  @tracked number = this.numberWithCommas(this.args.number)

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
