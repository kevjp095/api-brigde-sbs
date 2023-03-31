import sbsService from '../services/sbsService.js'

const getExchangeRate = async (req, res) => {
    const { body } = req;
    
    if(!body.fecha){
        return;
    }

    const date = {fecha: body.fecha}

    const tipoCambio = await sbsService.getExchangeRate(date);
    res.send({ status: 'OK', data: tipoCambio });
}

const getLatestExchangeRate = async (req, res) => {
    const ultimoTipoCambio = await sbsService.getLatestExchangeRate();
    res.send({ status: 'OK', data: ultimoTipoCambio });
}

export default {
    getExchangeRate,
    getLatestExchangeRate
}