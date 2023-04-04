import axios from 'axios';

const sendValues = async (data) => {
    try {
        const response = await axios.post('https://zyxmelinux2.zyxmeapp.com/zyxmetest/services/api/handler/continueflow',data);
        if (response.Success === false) {
            const error = new Error(responseLaraigo.Msg);
            error.statusCode = 500;
            error.code = 'apiLaraigo_error';
            error.result = responseLaraigo.Result
            return next(error);
        }

        return response.data;

    } catch (error) {
        throw error;
    }
};


export default {
    sendValues,
}
