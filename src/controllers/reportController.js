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

        const report = formatReportJson(result)

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

const formatReportJson = (response) => {
    try {
        const newJson = {
            reportname: "testreport",
            parameters: {
                persona_natural: {},
                detalle: []
            }
        };

        const persona_natural = response.result.persona_natural;
        newJson.parameters.persona_natural = persona_natural;

        let hasNullReporteCabecera = false;

        response.result.lista_deudas.forEach((deuda) => {
            // si el services no tiene deuda
            if (deuda.reporte_cabecera === null) {
                hasNullReporteCabecera = true;
                const newData = {
                    ultimo_periodo: deuda.ultimo_periodo,
                    anio: moment(deuda.ultimo_periodo).format('YYYY'),
                    mes: moment(deuda.ultimo_periodo).format('MMMM'),
                    fecha_reprote: moment(deuda.ultimo_periodo).format('MMMM') + " " + moment(deuda.ultimo_periodo).format('YYYY'),
                    deuda: [],
                    linea_credito: [],
                    cant_enity: 0
                };

                newJson.parameters.detalle.push(newData);

                return; // Salta a la siguiente iteración del bucle forEach
            }
            let cant_enity = deuda.lista_reporte_crediticio_detalle.length + deuda.lista_reporte_crediticio_saldo.length;

            console.log(cant_enity)

            const newData = {
                anio: deuda.reporte_cabecera.anio,
                mes: deuda.reporte_cabecera.mes,
                fecha_reprote: moment().month(deuda.reporte_cabecera.mes - 1).format('MMMM') + " " + deuda.reporte_cabecera.anio,
                deuda: deuda.lista_reporte_crediticio_detalle,
                linea_credito: deuda.lista_reporte_crediticio_saldo,
                cant_enity: cant_enity
            };

            newJson.parameters.detalle.push(newData);
        });


        if (hasNullReporteCabecera) {
            return newJson; // Retorna response si se encontró alguna deuda con reporte_cabecera null
        }

        return newJson;
    } catch (error) {
        console.log(error);
    }
};


export default {
    getDebtReport,
    getMembershipReport
}