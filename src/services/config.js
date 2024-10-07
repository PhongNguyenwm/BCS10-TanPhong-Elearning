import axios from "axios";
export const http = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api",
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTXHUwMGUxbmcgMTAiLCJIZXRIYW5TdHJpbmciOiIwMS8wOS8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MjUxNDg4MDAwMDAiLCJuYmYiOjE2OTg2ODUyMDAsImV4cCI6MTc2NzIyNTU5OX0.0dUDEMt1iBLA2haTnrKqKPLKPz2x4MAmVZlxXq-ff54",
  },
  timeout: 30000,
});
