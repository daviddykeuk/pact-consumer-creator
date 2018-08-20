const assert = require('assert')
const path = require('path')
var { Pact } = require("@pact-foundation/pact");
var pact = require("@pact-foundation/pact-node");

const userProvider = require('../providers/users');
const userMocks = require('../mocks/getUser.mocks')

require('dotenv').config();

var provider = new Pact({ 
    port: parseInt(process.env.USER_SERVICE_PORT),
    consumer: "example-consumer",
    provider: "user-service",
    dir: path.resolve(process.cwd(), 'pacts')
});


describe('The users provider service', () => {
  // Create mock provider
  before(() => provider.setup()); 

  after(() => {
      // Tear down the mock and write the pact
      provider.verify()
      provider.finalize();  
  });
  
  describe("When getting a user it should...", () => {
    before(() => {
      // add the interaction to the mock
      userMocks.forEach(m => {
        provider.addInteraction(m);
      })
    });

    it('return an existing user', done => {
      userProvider.getUser(1).then(user => {
        assert(user)
        assert(user.id)
        assert(user.first_name)
        assert(user.last_name)
      }).then(done, done);
    });

    it('fail when the user does not exist', done => {
        userProvider.getUser("unknown").catch(()=>{
            done()
        });
      });
  });  
})