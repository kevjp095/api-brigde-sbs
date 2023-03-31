import express from 'express'
import v1TipoCambioRouter from './v1/routes/tipoCambio.js'

const app = express();
const PORT = process.env.PORT || 3900;

app.use(express.json());
app.use("/api/v1/sbs/tipocambio", v1TipoCambioRouter)

app.get("/", (req, res) => {
    res.send("API REST - SBS")
});

app.listen(PORT, ()=> {
    console.log(`🚀 Server listening on port ${PORT}`)
});