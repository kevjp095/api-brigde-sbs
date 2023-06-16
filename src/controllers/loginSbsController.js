import moment from 'moment';
import crypto from 'crypto';
import formidable from 'formidable';
import sbsService from '../services/sbsService.js'
import laraigoService from '../services/laraigoService.js'
import { decryptAuth } from '../helpers/decryptAuth.js';
import { validateRecaptcha } from '../helpers/validateRecaptcha.js';

const getLogin = async (req, res, next) => {

    const token = req.token;
    const { body } = req;

    try {
        const recaptcha_score = await validateRecaptcha(body.token_recaptcha);

        if (recaptcha_score.success === false) {
            next(recaptcha_score);
        }
        

        let numero_document = decryptAuth(body.numero_documento);
        let password = decryptAuth(body.contrasenia);

        const data = {
            tipo_documento: body.tipo_documento,
            numero_documento: numero_document,
            contrasenia: password
        }

        const [corpid, orgid, conversationid, personid] = body.key.split('-');

        const valuesLaraigo = {
            corpid: corpid,
            orgid: orgid,
            conversationid: conversationid,
            personid: personid,
            variables: {
                accion_landing: body.event,
                tipo_doc: body.tipo_documento,
                num_doc: numero_document,
                email: "",
                fec_nac: "",
                full_name: "",
                fec_login: ""
            }
        }

        if (valuesLaraigo.variables.accion_landing === 'FORGOT_PASSWORD' || valuesLaraigo.variables.accion_landing === 'MANYATTEMPTS') {

            const responseLaraigo = await laraigoService.sendValues(valuesLaraigo)

            if (responseLaraigo.Success === false) {
                const error = new Error("ERROR_AUTHENTICATION | EVENT_" + valuesLaraigo.event);
                error.is_succ.ess = false;
                error.statusCode = 401;
                return next(error);
            }
            return;
        }

        const responseSbs = await sbsService.getLogin(token, data);

        if (responseSbs.is_success === false) {
            const error = new Error(responseSbs.message);
            error.is_success = responseSbs.is_success;
            error.statusCode = 500;
            error.code = 'SBS_ERROR_AUTHENTICATION';
            return next(error);
        }


        let email_user = getEmail(responseSbs);
        let fec_nac = getFecNac(responseSbs);
        let full_name = getFullName(responseSbs);
        let fec_login = getDate(responseSbs);

        console.log(fec_login)

        valuesLaraigo.variables.accion_landing = 'LOGINSUCCESS';
        valuesLaraigo.variables.email = email_user;
        valuesLaraigo.variables.fec_nac = fec_nac;
        valuesLaraigo.variables.full_name = full_name;
        valuesLaraigo.variables.fec_login = moment(fec_login, 'D/M/YYYY, H:mm:ss').format('DD/MM/YYYY HH:mm:ss A');


        console.log(valuesLaraigo)
        //console.log(recaptcha_score)

        const responseLaraigo = await laraigoService.sendValues(valuesLaraigo)

        if (responseLaraigo.Success === false) {
            const error = new Error("ERROR KEY APILARAIGO:" + responseLaraigo.Msg);
            error.statusCode = 500;
            error.code = 'apiLaraigo_error';
            error.result = responseLaraigo.Result
            return next(error);
        }


        //res.status(201).send({ result: responseSbs.is_success });
        res.status(201).send({ result: responseSbs.is_success, score: recaptcha_score });

    } catch (error) {
        next(error);
    }
}

const closeTab = async (req, res, next) => {

    if (req.is('multipart/form-data')) {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al procesar formulario');
                return;
            }

            //console.log('Campos recibidos:', fields);         
            const [corpid, orgid, conversationid, personid] = fields.key.split('-');
            const values = {
                corpid: corpid,
                orgid: orgid,
                conversationid: conversationid,
                personid: personid,
                variables: {
                    accion_landing: fields.event
                }
            }
            console.log(values)
            const responseLaraigo = await laraigoService.sendValues(values)
            if (responseLaraigo.Success === false) {
                const error = new Error("ERROR EVENT_CLOSE_TAB:" + responseLaraigo.Msg);
                error.statusCode = 500;
                error.code = 'apiLaraigo_error';
                error.result = responseLaraigo.Result
                return next(error);
            }

            res.status(201).send({ data: responseLaraigo });
        });
    }
    else {
        res.status(400).send('Tipo de contenido no compatible, ONLY-FORMDATA');
    }
}

const getEmail = (response) => {
    let email_user = "";
    const arrayParametros = response.result.parametros
    for (let item of arrayParametros) {
        if (item.type === "email") {
            email_user = item.value;
            break;
        }
    }
    return email_user;
}
const getFecNac = (response) => {
    let fec_nac = "";
    const arrayParametros = response.result.parametros
    for (let item of arrayParametros) {
        if (item.type === "fecnac") {
            fec_nac = item.value;
            break;
        }
    }
    return fec_nac;
}
const getFullName = (response) => {
    let full_name = "";
    const arrayParametros = response.result.parametros
    for (let item of arrayParametros) {
        if (item.type === "name") {
            full_name = item.value;
            break;
        }
    }
    return full_name;
}

const getDate = (response) => {
    let date_sbs = "";
    const arrayParametros = response.result.token.http_response.headers
    for (let item of arrayParametros) {
        if (item.key === "Date") {
            date_sbs = item.value.toString();
            break;
        }
    }
    const fechaHoraUTC = new Date(date_sbs);
    const opciones = { timeZone: 'America/Lima' };
    const fechaHoraLocal = fechaHoraUTC.toLocaleString('es-PE', opciones);

    return fechaHoraLocal;
}

export default {
    getLogin,
    closeTab
}