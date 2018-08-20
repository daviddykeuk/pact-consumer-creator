// this is code that gets a user by id from another service
const request = require('request');

module.exports = {
    getUser: (user_id) => {
        return new Promise((resolve, reject) => {
            var req = {
                url: `${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}/users/${user_id}`,
                method: 'GET',
                headers: {
                    'Accept':'application/json'
                }
            }
            request.get(req, (err, response, body) => {
                if (response.statusCode == 200) {
                    var user = JSON.parse(body);
                    resolve(user);
                } else if (err){
                    reject(new Error("User service not available"));
                } else {
                    reject(new Error("User could not be found"));
                }
            });
        });     
    }
}