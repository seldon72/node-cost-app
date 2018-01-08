const mpRoutes = require ('./mp_routes');
const staticRoutes = require('./static_routes');

module.exports = function (app, mongoose) {
	
    staticRoutes(app);
    mpRoutes(app, mongoose);

}