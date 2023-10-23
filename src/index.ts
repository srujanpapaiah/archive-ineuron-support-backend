import app from "./app";
import { connectToDB } from "./config/db";

app.listen(process.env.PORT || 9002, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  connectToDB();
});
