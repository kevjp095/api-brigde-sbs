const URL_RECAPTCHA = "https://apix.laraigo.com/api/check/recaptcha";

export async function validateRecaptcha(token) {
    try {
        let res_recaptcha = await recaptcha(token);
        
        let recaptcha_object = await res_recaptcha.json();

        if (!recaptcha_object.success) {
            throw new Error(recaptcha_object);
        }
        return recaptcha_object.score;

    } catch (error) {
        throw new Error(error);
    }
}


async function recaptcha(token) {
    try {
        let request_recaptcha = {
            response: token
        };
    
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request_recaptcha)
        }
    
        let response = await fetch(URL_RECAPTCHA, options);
    
        return response;
    } catch (error) {
        throw new Error(error);
    }

}