import sbsService from '../services/sbsService.js'

const getExchangeRate = async (req, res, next) => {
    const token = req.token; 
    const { body } = req;

    if(!req.body.fecha){
        const error = new Error("Parameter 'fecha' can not be empty");
        error.statusCode = 400;
        error.code = 'missing_parameter';
        return next(error);
    }

    const date = {fecha: body.fecha}

    try {
        const tipoCambio = await sbsService.getExchangeRate(token,date);
        res.status(201).send({ data: tipoCambio });

    } catch (error) {
        next(error);
    }
}


const getLatestExchangeRate = async (req, res) => {
    const token = req.token; 

    try {
        const ultimoTipoCambio = await sbsService.getLatestExchangeRate(token);
        res.status(201).send({ data: ultimoTipoCambio });

    } catch (error) {
        next(error);
    }
}

export default {
    getExchangeRate,
    getLatestExchangeRate
}