import sbsService from '../services/sbsService.js'
import laraigoService from '../services/laraigoService.js'

const getLogin = async (req, res, next) => {
    const token = req.token;
    const { body } = req;

    const data = {
        tipo_documento: body.tipo_documento,
        numero_documento: body.numero_documento,
        contrasenia: body.contrasenia
    }
    
    const [corpid, orgid, conversationid, personid] = body.key.split('-');
    const valuesLaraigo = {
        corpid: corpid,
        orgid: orgid,
        conversationid: conversationid,
        personid: personid
    }

    try {
        const tokenSbs = await sbsService.getLogin(token, data);

        if (tokenSbs.is_success === false) {
            const error = new Error(tokenSbs.message);
            error.statusCode = 500;
            error.code = 'SBS_ERROR';
            return next(error);
        }

        const responseLaraigo = await laraigoService.sendValues(valuesLaraigo)

        if (responseLaraigo.Success === false) {
            const error = new Error("ERROR KEY APILARAIGO:" + responseLaraigo.Msg);
            error.statusCode = 500;
            error.code = 'apiLaraigo_error';
            error.result = responseLaraigo.Result
            return next(error);
        }

        res.status(201).send({ data: tokenSbs });

    } catch (error) {
        next(error);
    }
}

export default {
    getLogin,
}