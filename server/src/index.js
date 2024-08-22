import 'dotenv/config';
import { app } from './app.js';

const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`listening at ${port}`)
})

app.on("errror",errror=>{
    console.log("ERRROR : "  + errror)
})