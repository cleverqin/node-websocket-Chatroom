const config={
  dbConfig:{
    host:'***.**.**.*',
    user:'****',
    password:'****',
    database:'******',
    port: 3306
  },
};
const mysql=require("mysql");
const pool=mysql.createPool(config.dbConfig);
module.exports={
  query(sql,params){
    return new Promise((resolve, reject)=>{
      pool.getConnection((err, conn)=>{
        if (err) {
          reject(err)
        } else {
          conn.query(sql, params, (error,result)=>{
            if(error){
              reject(error)
            }else {
              resolve(result)
            }
          });
          conn.release();
        }
      });
    })
  },
  executor(SQU){
    const HSQL=SQU.toParam();
    return this.query(HSQL.text,HSQL.values)
  }
}
