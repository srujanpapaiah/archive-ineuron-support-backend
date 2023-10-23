import app from "./app";

import { connectToDB } from "./config/db";

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
  connectToDB();
});
