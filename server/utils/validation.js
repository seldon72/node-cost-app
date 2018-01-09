
var plantas = ['Poste de Concreto', 'Polimerico', 'PRFV', 'Piezas Especiales'];


var validPlanta = (str) => {
    return typeof str === 'string' && str.trim().length > 0 &&  plantas.includes(str);
};

module.exports = {validPlanta};
