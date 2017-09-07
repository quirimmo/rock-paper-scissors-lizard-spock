global.chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
global.assert = global.chai.assert;
global.expect = global.chai.expect;
global.should = global.chai.should();
global.chai.use(chaiAsPromised);