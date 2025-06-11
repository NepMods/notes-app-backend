require("dotenv").config();
const app = require("./src/app")

const port = process.env.PORT | 3000;

app.listen(port, () => {
    console.log(`Backend Running on http://0.0.0.0:${port}`)
})