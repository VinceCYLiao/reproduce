require("dotenv").config({
  path: `.env.${process.env.ENV}`,
});
const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { ENV } = process.env;
const port = process.env.PORT || 3000;
const proxyApiUrl = process.env.PROXY_API_URL || "";

// dev - true: use source code path ,false: use bundle path
const dev = ENV !== "prod" && ENV !== "uat" && ENV !== "sit";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    if (proxyApiUrl !== "") {
      const apiPaths = {
        "/api": {
          target: proxyApiUrl,
          pathRewrite: {
            "^/api": "",
          },
          changeOrigin: true,
        },
      };
      server.use("/api", createProxyMiddleware(apiPaths["/api"]));
    }

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log("Error:::::", err);
  });
