// for public IP configuration on Cloud SQL side
module.exports = {
    HOST: "34.126.161.30",
    USER: "equitize-backend",
    PASSWORD: "9fM7'ZRn9B,DFB7r", //insert your own password here
    DB: "equitize_cloudsql", //make sure database with this name is instantiated on your mysql
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };