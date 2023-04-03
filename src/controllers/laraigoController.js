import laraigoService from "../services/laraigoService.js";

const sendValues = async (req, res, next) => {
    const { body } = req;

    if(!req.body.corpid || !req.body.orgid || !req.body.conversationid || !req.body.personid){
        const error = new Error("Parameter 'corpid, orgid, conversationid, personid' can not be empty");
        error.statusCode = 400;
        error.code = 'missing_parameter';
        return next(error);
    }

    const data = {
        corpid: body.corpid,
        orgid: body.orgid,
        conversationid: body.conversationid,
        personid: body.personid
    }

    try {
        const result = await laraigoService.sendValues(data);
        res.status(201).send({ data: result });

    } catch (error) {
        next(error);
    }
}

export default {
    sendValues,
}