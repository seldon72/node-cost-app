const _ = require('lodash');
const {ObjectID} = require('mongodb');

var {ManoObra} = require('../models/mo');

module.exports = function(app, mongoose) {
    app.post('/api/manoobra', (req, res) => {
        var mo = new ManoObra({
            planta: req.body.planta,
            desc: req.body.desc,
            uom: req.body.uom,
            unitCost: req.body.unitCost,
            billId: req.body.billId,
            lastUpdated: new Date().getTime()
        });
    
        mo.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    });
    
    app.get('/api/manoobra', (req, res) => {
        ManoObra.find({isDeleted: false}).then((mo) => {
            res.send({mo});
        }, (e) => {
            res.status(400).send(e);
        });
    });
    
    app.get('/api/manoobra/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
    
        ManoObra.findOne({_id:id, isDeleted: false})
        .then((mo) => {
            if (!mo) {
                return res.status(404).send();
            }
            res.send({mo});
        }).catch((e) => res.status(400).send());
    })
    
    app.patch('/api/manoobra/:id', (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['unitCost']);
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        
        body.lastUpdated = new Date().getTime();
        
        ManoObra.findOneAndUpdate(
            {_id: id, isDeleted: false}, 
            {$set: body},
            {new: false}).then((mo) => {
                if (!mo) {
                    return res.status(404).send();
                }
                res.send({mo});
            }).catch((e) => res.status(400).send());
    });
    
    app.delete('/api/manoobra/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        
        ManoObra.findOneAndUpdate(
            {_id: id, isDeleted: false},
            {$set: {
                isDeleted: true,
                lastUpdated: new Date().getTime()
            }},
            {new: true}).then((mo) => {
                if (!mo) {
                    return res.status(404).send();
                }
                res.send({mo});
            }).catch((e) => res.status(400).send());
        
    });
};
