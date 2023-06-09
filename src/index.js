import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';
import v1exchangeRouter from './v1/routes/exchangeRate.js'
import v1ReportRouter from './v1/routes/report.js'
import v1Login from './v1/routes/login.js'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3900;

app.use(express.json());
app.use(cors());

app.use("/api/v1/sbs/tipocambio", v1exchangeRouter)
app.use("/api/v1/sbs/reporte", v1ReportRouter)
app.use("/api/v1/sbs/login", v1Login)

app.get("/", (req, res) => {
    res.send("API REST V1")
});

app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`🚀 Server listening on port ${PORT}`)
});