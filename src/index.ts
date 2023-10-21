import app from "./app";
import { connectToDB } from "./config/db";

app.listen(8080, async ()=>{
    console.log('Server running at http://localhost:8080');
    connectToDB();


});