import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class DatosGlobalesComponent extends Component {
  @tracked globalInfo = A(this.args.globalInfo);

  model(){
    console.log(this.globalInfo);
  }
}
