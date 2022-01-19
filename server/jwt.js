const JWT=require("jsonwebtoken");
const auth={
  secret:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  token(data){
    return JWT.sign({data},this.secret,{
      expiresIn:"1d"
    })
  },
  decode(token){
    try {
      return JWT.verify(token,this.secret);
    }catch (e) {
      return null
    }
  }
};
module.exports=auth;
