const mpRoutes     = require ('./mp_routes');
const otroRoutes   = require ('./otro_routes');
const moRoutes     = require ('./mo_routes');
const staticRoutes = require ('./static_routes');

module.exports = function (app, mongoose) {
	
    staticRoutes(app);
    mpRoutes(app, mongoose);
    moRoutes(app, mongoose);
    otroRoutes(app, mongoose);

}