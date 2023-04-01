import axios from 'axios'

const authorize = async (req, res, next) => {
    try {
      const token = await getToken();
      req.token = token;
      
      if (!req.token) {
        const error = new Error("Token missing");
        error.statusCode = 401;
        error.code = 'missing_token';
        return next(error);
      }

      next();
    } catch (error) {
      next(error)
    }
};

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
      throw error;
    }
}
export default authorize;