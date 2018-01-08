const _ = require('lodash');
const {ObjectID} = require('mongodb');

var {Otro} = require('../models/otro');

module.exports = function(app, mongoose) {
    app.post('/api/otros', (req, res) => {
        var otro = new Otro({
            planta: req.body.planta,
            desc: req.body.desc,
            uom: req.body.uom,
            unitCost: req.body.unitCost,
            billId: req.body.billId,
            lastUpdated: new Date().getTime()
        });
    
        otro.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    });
    
    app.get('/api/otros', (req, res) => {
        Otro.find({isDeleted: false}).then((otro) => {
            res.send({otro});
        }, (e) => {
            res.status(400).send(e);
        });
    });
    
    app.get('/api/otros/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
    
        Otro.findOne({_id:id, isDeleted: false})
        .then((otro) => {
            if (!otro) {
                return res.status(404).send();
            }
            res.send({otro});
        }).catch((e) => res.status(400).send());
    })
    
    app.patch('/api/otros/:id', (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['unitCost']);
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        
        body.lastUpdated = new Date().getTime();
        
        Otro.findOneAndUpdate(
            {_id: id, isDeleted: false}, 
            {$set: body},
            {new: false}).then((otro) => {
                if (!otro) {
                    return res.status(404).send();
                }
                res.send({otro});
            }).catch((e) => res.status(400).send());
    });
    
    app.delete('/api/otros/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        
        Otro.findOneAndUpdate(
            {_id: id, isDeleted: false},
            {$set: {
                isDeleted: true,
                lastUpdated: new Date().getTime()
            }},
            {new: true}).then((otro) => {
                if (!otro) {
                    return res.status(404).send();
                }
                res.send({otro});
            }).catch((e) => res.status(400).send());
        
    });
};
