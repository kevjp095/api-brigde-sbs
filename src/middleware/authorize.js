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
            grant_type: process.env.GRANT_TYPE,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            username: process.env.USERNAMESBS,
            password: process.env.PASSWORDSBS,
            scope: process.env.SCOPE
          });
          const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          };

          const response = await axios.post('https://autapi.sbs.gob.pe/auth/realms/Realm.AppSbs/protocol/openid-connect/token', data, config);
          return response.data.access_token

    } catch (error) {
      return error
    }
}
export default authorize;