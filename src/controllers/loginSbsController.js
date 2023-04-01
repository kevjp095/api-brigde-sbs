import sbsService from '../services/sbsService.js'

const getLoginSbs = async (req, res, next) => {
    const token = req.token; 
    const { body } = req;

    if(!req.body.tipo_documento || !req.body.numero_documento || !req.body.contrasenia){
        const error = new Error("Parameter 'tipo_documento, numero_documento, contrasenia' can not be empty");
        error.statusCode = 400;
        error.code = 'missing_parameter';
        return next(error);
    }

    const data = {
        tipo_documento: body.tipo_documento,
        numero_documento: body.numero_documento,
        contrasenia: body.contrasenia
    }

    try {
        const tokenSbs = await sbsService.getLogin(token, data);
        res.status(201).send({ data: tokenSbs });

    } catch (error) {
        next(error);
    }
}

export default {
    getLoginSbs,
}