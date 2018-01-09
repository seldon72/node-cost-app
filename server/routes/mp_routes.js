const _ = require('lodash');
const {ObjectID} = require('mongodb');

var {MateriaPrima} = require('../models/mp');
var {validPlanta} = require('../utils/validation')

module.exports = function(app, mongoose) {
    app.post('/api/materiaprima', (req, res) => {
        var mp = new MateriaPrima({
            planta: req.body.planta,
            desc: req.body.desc,
            uom: req.body.uom,
            unitCost: req.body.unitCost,
            billId: req.body.billId,
            lastUpdated: new Date().getTime()
        });
    
        mp.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    });
    
    app.get('/api/materiaprima', (req, res) => {
        MateriaPrima.find({isDeleted: false}).then((mp) => {
            res.send({mp});
        }, (e) => {
            res.status(400).send(e);
        });
    });
    
    app.get('/api/materiaprima/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
    
        MateriaPrima.findOne({_id:id, isDeleted: false})
        .then((mp) => {
            if (!mp) {
                return res.status(404).send();
            }
            res.send({mp});
        }).catch((e) => res.status(400).send());
    })
    
    app.patch('/api/materiaprima/:id', (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['unitCost']);
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        
        body.lastUpdated = new Date().getTime();
        
        MateriaPrima.findOneAndUpdate(
            {_id: id, isDeleted: false}, 
            {$set: body},
            {new: false}).then((mp) => {
                if (!mp) {
                    return res.status(404).send();
                }
                res.send({mp});
            }).catch((e) => res.status(400).send());
    });
    
    app.delete('/api/materiaprima/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        
        MateriaPrima.findOneAndUpdate(
            {_id: id, isDeleted: false},
            {$set: {
                isDeleted: true,
                lastUpdated: new Date().getTime()
            }},
            {new: true}).then((mp) => {
                if (!mp) {
                    return res.status(404).send();
                }
                res.send({mp});
            }).catch((e) => res.status(400).send());
        
    });

    app.get('/api/materiaprima/planta/:planta', (req, res) => {
        var planta = req.params.planta;
        if (!validPlanta(planta)) {
            return res.status(404).send();
        }
    
        MateriaPrima.find({planta: planta, isDeleted: false})
        .then((mp) => {
            if (!mp) {
                return res.status(404).send();
            }
            res.send({mp});
        }).catch((e) => res.status(400).send());
    })

};
