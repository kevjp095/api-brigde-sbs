import axios from 'axios';

const API_URL = "https://servicios.sbs.gob.pe/api/ChatBot_Desa";

const getExchangeRate = async (token,data) => {
    try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post(`${API_URL}/TipoCambio/ObtenerTipoCambio`,data ,config);
        return response.data;

    } catch (error) {
        throw error;
    }
};

const getLatestExchangeRate = async (token) => {
    try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post(`${API_URL}/TipoCambio/ObtenerUltimoTipoCambio`,{},config);
        return response.data;
    
    } catch (error) {
        throw error;
    }
};

const getDebtReport = async (token,data) => {
    try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post(`${API_URL}/ReporteDeudas/ObtenerReporteDeudas`,data ,config);
        return response.data;

    } catch (error) {
        throw error;
    }
};

const getMembershipReport = async (token,data) => {
    try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post(`${API_URL}/ReporteAfiliacion/ObtenerReporteAfiliacion`,data ,config);
        return response.data;

    } catch (error) {
        throw error;
    }
};

const getLogin = async (token,data) => {
    try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post(`${API_URL}/Login/ObtenerToken`,data ,config);
        return response.data;

    } catch (error) {
        throw error;
    }
};

export default {
    getExchangeRate,
    getLatestExchangeRate,
    getDebtReport,
    getMembershipReport,
    getLogin
}
