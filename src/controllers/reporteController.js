import sbsService from '../services/sbsService.js'

const getDebtReport = async (req, res, next) => {
    const token = req.token; 
    const { body } = req;

    if(!req.body.tipo_documento || !req.body.numero_documento){
        const error = new Error("Parameter 'tipo_documento or numero_documento' can not be empty");
        error.statusCode = 400;
        error.code = 'missing_parameter';
        return next(error);
    }

    const data = {
        tipo_documento: body.tipo_documento,
        numero_documento: body.numero_documento
    }

    try {
        const reportDebt = await sbsService.getDebtReport(token, data);
        res.status(201).send({ data: reportDebt });

    } catch (error) {
        next(error);
    }
}

const getMembershipReport = async (req, res, next) => {
    const token = req.token; 
    const { body } = req;

    if(!req.body.id_tipo_documento || !req.body.numero_documento){
        const error = new Error("Parameter 'id_tipo_documento or numero_documento' can not be empty");
        error.statusCode = 400;
        error.code = 'missing_parameter';
        return next(error);
    }

    const data = {
        id_tipo_documento: body.id_tipo_documento,
        numero_documento: body.numero_documento
    }

    try {
        const reporteAfiliacion = await sbsService.getMembershipReport(token, data);
        res.status(201).send({ data: reporteAfiliacion });

    } catch (error) {
        next(error);
    }
}

export default {
    getDebtReport,
    getMembershipReport
}