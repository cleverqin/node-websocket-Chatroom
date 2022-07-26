module.exports={
  publicPath:process.env.BASE_URL,
  assetsDir:"static",
  outputDir:"dist",
  productionSourceMap:false,
  css:{
    sourceMap:true
  },
  devServer:{
    proxy: {
      '': {
        target: process.env.PROXY_SERVER,
        ws:true
      },
      '/assets': {
        target: process.env.PROXY_SERVER,
        ws:true
      },
      '/socket.io': {
        target: process.env.PROXY_SERVER,
        ws:true
      }
    }
  }
};
