import formidable from 'formidable';
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
        personid: personid,
        event: req.body.event
    }

    try {
        if (valuesLaraigo.event === 'CLOSE_LANDING' || valuesLaraigo.event === 'FORGOT_PASSWORD' || valuesLaraigo.event === 'MANYATTEMPTS') {
            const responseLaraigo = await laraigoService.sendValues(valuesLaraigo)
            if (responseLaraigo) {
                const error = new Error("ERROR_AUTHENTICATION | EVENT_" + valuesLaraigo.event);
                error.is_success = false;
                error.statusCode = 401;
                return next(error);
            }
        }

        const tokenSbs = await sbsService.getLogin(token, data);

        if (tokenSbs.is_success === false) {
            const error = new Error(tokenSbs.message);
            error.is_success = tokenSbs.is_success;
            error.statusCode = 500;
            error.code = 'SBS_ERROR_AUTHENTICATION';
            return next(error);
        }


        valuesLaraigo.event = 'LOGIN_SUCCESS'
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

const closeTab = async (req, res, next) => {
    if (req.is('multipart/form-data')) {
        const form = formidable({ multiples: true });
    
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error al procesar formulario');
            return;
          }
    
          console.log('Campos recibidos:', fields);
    
          res.send('Formulario recibido');
        });
      }
      // Si el tipo de contenido de la solicitud es application/json
      else if (req.is('application/json')) {
        const data = req.body;
        console.log('Datos recibidos:', data);
    
        res.send('Datos recibidos');
      }
      // Si el tipo de contenido de la solicitud no es compatible
      else {
        res.status(400).send('Tipo de contenido no compatible');
      }
}

export default {
    getLogin,
    closeTab
}