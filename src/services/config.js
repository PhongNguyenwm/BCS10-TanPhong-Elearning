import axios from "axios";
export const http = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api",
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTXHUwMGUxbmcgMTAiLCJIZXRIYW5TdHJpbmciOiIzMS8xMi8yMDI1IiwiSGV0SGFuVGltZSI6MTc2NzIyNTU5OTAwMCwibmJmIjoxNjk4Njg1MjAwLCJleHAiOjE3NjcyMjU1OTl9.loRPS1RZwfJ0WEe5S9bQER2C0PiRLuJ-8r3CREErSLs",
  },
  timeout: 30000,
});
