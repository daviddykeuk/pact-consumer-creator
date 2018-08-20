var { Matchers } = require("@pact-foundation/pact");
const { like } = Matchers;

module.exports = [
    {
        state: 'When a user with id "1" exists',
        uponReceiving: 'Getting user details',
        withRequest: {
          method:  'GET',
          path:  '/users/1',
          headers: {
            Accept: 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: {
            id: 1,
            first_name: like('Tywin'),
            last_name: like('Lannister'),
          }
        }
    }, {
        state: 'When a user with id "unknown" does not exist',
        uponReceiving: 'Trying to get a non-existent user',
        withRequest: {
          method:  'GET',
          path:  '/users/unknown',
          headers: {
            Accept: 'application/json'
          }
        },
        willRespondWith: {
          status: 404
        }
    }, 
]