import sbsService from '../services/sbsService.js'

const getExchangeRate = async (req, res, next) => {

    const token = req.token; 
    const { body } = req;

    const date = {fecha: body.fecha}

    try {
        const tipoCambio = await sbsService.getExchangeRate(token,date);
        const filteredResult = tipoCambio.result.find(item => item.descripcion === body.moneda);
        res.status(201).send({ data: filteredResult });

    } catch (error) {
        next(error);
    }
}


const getLatestExchangeRate = async (req, res, next) => {
    const token = req.token; 
    const { body } = req;

    if(!body.moneda){
        const error = new Error("Parameter 'moneda' can not be empty");
        error.statusCode = 400;
        error.code = 'missing_parameter';
        return next(error);
    }

    try {
        const ultimoTipoCambio = await sbsService.getLatestExchangeRate(token);
        const filteredResult = ultimoTipoCambio.result.find(item => item.descripcion === body.moneda);
        res.status(201).send({ data: filteredResult });

    } catch (error) {
        next(error);
    }
}

export default {
    getExchangeRate,
    getLatestExchangeRate
}