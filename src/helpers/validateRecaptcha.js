import axios from 'axios';
const URL_RECAPTCHA = "https://apix.laraigo.com/api/check/recaptcha";

export async function validateRecaptcha(token) {
    try {
        let recaptcha_object = await recaptcha(token);
        //console.log(recaptcha_object)

        if (!recaptcha_object.success) {
          const error = new Error("Error: token_recaptcha used or duplicated");
          error.success = false;
          error.message = "Error: token_recaptcha used or duplicated";
          error.statusCode = 400;
          error.code = 'recaptcha_error';
          throw error;
          
        }
        return recaptcha_object.score;

    } catch (error) {
      return error;
    }
}


async function recaptcha(token) {
    try {
      const request_recaptcha = {
        response: token
      };
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(request_recaptcha),
        url: URL_RECAPTCHA
      };
  
      const response = await axios(options);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }