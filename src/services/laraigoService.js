import axios from 'axios';

const sendValues = async (data) => {
    try {
        const response = await axios.post('https://zyxmelinux2.zyxmeapp.com/zyxmetest/services/api/handler/continueflow',data);
        return response.data;

    } catch (error) {
        throw error;
    }
};


export default {
    sendValues,
}
