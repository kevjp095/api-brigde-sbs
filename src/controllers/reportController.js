import moment from 'moment';
moment.locale('es');
import sbsService from '../services/sbsService.js'

const getDebtReport = async (req, res, next) => {
    const token = req.token;
    const { body } = req;

    const data = {
        tipo_documento: body.tipo_documento,
        numero_documento: body.numero_documento
    }

    try {
        const result = await sbsService.getDebtReport(token, data);

        const structured = {
            reportname: "testreport",
            parameters: {
                persona_natural: {},
                detalle: []
            }
        };

        const report = formatReportJson(structured, result)

        res.status(201).send({ data: report });

    } catch (error) {
        next(error);
    }
}

const getMembershipReport = async (req, res, next) => {
    const token = req.token;
    const { body } = req;

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

const formatReportJson = (newJson, response) => {

    try {
        const persona_natural = response.result.persona_natural;
        newJson.parameters.persona_natural = persona_natural
  

        response.result.lista_deudas.forEach((deuda) => {
            const newData = {
                anio: deuda.reporte_cabecera.anio,
                mes: deuda.reporte_cabecera.mes,
                fecha_reprote: moment().format('MMMM YYYY'),
                deuda: deuda.lista_reporte_crediticio_detalle,
                linea_credito: deuda.lista_reporte_crediticio_saldo
            };

            newJson.parameters.detalle.push(newData);

        });

        return newJson;

    } catch (error) {
        console.log(error)
    }

}

export default {
    getDebtReport,
    getMembershipReport
}