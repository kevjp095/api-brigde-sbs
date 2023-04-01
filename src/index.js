import express from 'express'
import v1TipoCambioRouter from './v1/routes/tipoCambio.js'
import v1ReporteRouter from './v1/routes/reporte.js'
import v1Login from './v1/routes/login.js'

const app = express();
const PORT = process.env.PORT || 3900;

app.use(express.json());
app.use("/api/v1/sbs/tipocambio", v1TipoCambioRouter)
app.use("/api/v1/sbs/reporte", v1ReporteRouter)
app.use("/api/v1/sbs/login", v1Login)

app.get("/", (req, res) => {
    res.send("API")
});

app.listen(PORT, ()=> {
    console.log(`🚀 Server listening on port ${PORT}`)
});