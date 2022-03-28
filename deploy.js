require("dotenv").config();
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const ftpConfig = {
  user: process.env.FTP_USER,
  // Password optional, prompted if none given
  password: process.env.FTP_PW,
  host: process.env.FTP_SERVER,
  port: process.env.FTP_PORT,
  localRoot: __dirname + "/out",
  remoteRoot: process.env.FTP_DIRECTORY,
  // include: ["*", "**/*"],      // this would upload everything except dot files
  include: ["*", "**/*"],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
    "dist/**/*.map",
    "node_modules/**",
    "node_modules/**/.*",
    ".git/**",
    ".DS_Store",
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: true,
};

ftpDeploy
  .deploy(ftpConfig)
  .then((res) => console.log("finished:", res))
  .catch((err) => console.log(err));
