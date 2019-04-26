const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

proxy.on("proxyRes", (proxyRes, req) => {
  if (req.url === "/") {
    proxyRes.headers["Content-Type"] = "application/vnd.hbbtv.xhtml+xml";
  }
});

const server = http.createServer((req, res) => {
  if (req.method === "HEAD") {
    res.writeHead(200, {
      "Content-Type": "application/vnd.hbbtv.xhtml+xml"
    });

    res.end();

    return;
  }

  proxy.web(req, res, {
    target: "http://127.0.0.1:3000"
  });
});

console.log("listening on port 5050");
server.listen(5050);
