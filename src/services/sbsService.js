import axios from 'axios';

const getToken = async() => {
    try {
        const data = new URLSearchParams({
            grant_type: 'password',
            client_id: 'api.chatbot',
            client_secret: '8ab4dbf4-c378-495f-a30d-e3cc3c0b2c0d',
            username: 'user-chatbot',
            password: '+YM4Sj+5AVEYoTZff/000ersihYwtbQHLwplDuKRxdw=',
            scope: 'api_only_chatbot'
          });
          const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          };
          const response = await axios.post('https://autapi.sbs.gob.pe/auth/realms/Realm.AppSbs/protocol/openid-connect/token', data, config);
     
          return response.data.access_token
    } catch (error) {
        console.log(error)
    }
};

const getExchangeRate = async (data) => {
    try {
        const token = await getToken();
    
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('https://servicios.sbs.gob.pe/api/ChatBot_Desa/TipoCambio/ObtenerTipoCambio',data ,config);

        return response.data;
        

    } catch (error) {
       console.log(error)
    }
};

const getLatestExchangeRate = async () => {
    try {
        const token = await getToken();
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post('https://servicios.sbs.gob.pe/api/ChatBot_Desa/TipoCambio/ObtenerUltimoTipoCambio',{},config);
        
        return response.data;
    
    } catch (error) {
       console.log(error)
    }
};

export default {
    getExchangeRate,
    getToken,
    getLatestExchangeRate
}