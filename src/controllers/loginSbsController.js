import sbsService from '../services/sbsService.js'
import laraigoService from '../services/laraigoService.js'

const getLogin = async (req, res, next) => {
    const token = req.token; 
    const key = req.query.key;
    const [corpid, orgid, conversationid, personid] = key.split('-');

    const { body } = req;

    if(!req.body.tipo_documento || !req.body.numero_documento || !req.body.contrasenia){
        const error = new Error("Parameter 'tipo_documento, numero_documento, contrasenia' can not be empty");
        error.statusCode = 400;
        error.code = 'missing_parameter';
        return next(error);
    }

    if(!req.query.key){
        const error = new Error("Parameter? 'key' can not be empty");
        error.statusCode = 400;
        error.code = 'missing_parameter';
        return next(error);
    }

    const data = {
        tipo_documento: body.tipo_documento,
        numero_documento: body.numero_documento,
        contrasenia: body.contrasenia

    }

    const valuesLaraigo = {
        corpid: corpid,
        orgid: orgid,
        conversationid: conversationid,
        personid: personid
    }

    try {
        const tokenSbs = await sbsService.getLogin(token, data);
        const apiLaraigo = await laraigoService.sendValues(valuesLaraigo)
        console.log(apiLaraigo);

        res.status(201).send({ data: tokenSbs });

    } catch (error) {
        next(error);
    }
}

export default {
    getLogin,
}