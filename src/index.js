import app from "./app";
import { connectToDB } from "./config/db";
const cluster = require("cluster");
const os = require("os");

const numCPU = os.cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPU; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT || 9002, () => {
    console.log(
      `Server running on port ${process.env.PORT} and process is ${process.pid}`
    );
    connectToDB();
  });
}
