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
                deuda: [],
                lineas_credito: []
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
        response.result.lista_deudas.forEach((deuda,) => {

            deuda.lista_reporte_crediticio_detalle.forEach((detalle) => {

                const nuevaDeuda = {
                    codigo_entidad: detalle.codigo_entidad,
                    nombre_entidad: detalle.nombre_entidad,
                    id_calificacion: detalle.id_calificacion,
                    capital: detalle.capital,
                    intereses_comisiones: detalle.intereses_comisiones,
                    monto: detalle.monto
                };

                newJson.parameters.deuda.push(nuevaDeuda);
            });

            deuda.lista_reporte_crediticio_saldo.forEach((saldo) => {
                const nuevaLineaCredito = {
                    codigo_entidad: saldo.codigo_entidad,
                    nombre_entidad: saldo.nombre_entidad,
                    nombre_cuenta: saldo.nombre_cuenta,
                    saldo: saldo.saldo
                };
                newJson.parameters.lineas_credito.push(nuevaLineaCredito);
            });
        });

        return newJson;

    } catch (error) {
        next(error);
    }

}

export default {
    getDebtReport,
    getMembershipReport
}