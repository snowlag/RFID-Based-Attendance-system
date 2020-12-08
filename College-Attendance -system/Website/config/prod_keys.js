var env = {
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY, 
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY, 
    Table: process.env.TABLE, // Table
    JwtSecret: process.env.JWTSECRETKEY,
    authtoken: process.env.AUTHTOKEN
  };
   
module.exports = env;	

