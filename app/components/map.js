import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class MapComponent extends Component {
  @tracked globalInfo = A(this.args.globalInfo);

  model(){
    console.log(this.globalInfo);
  }
}
