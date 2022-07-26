const io=require("./io");
const {getNetworkIPv4}=require("./utils");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
app.use("/",express.static('dist'));
app.use("/assets/images",express.static('upload'));
const PORT=3000;
io.attach(server);
//启动服务器
server.listen(PORT,()=> {
  const address=getNetworkIPv4().address;
  console.info("- Local:   http://localhost:"+PORT);
  console.info(`- Network: http://${address}:`+PORT)
});
