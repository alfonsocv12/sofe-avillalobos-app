import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | global-data', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:global-data');
    assert.ok(controller);
  });
});
