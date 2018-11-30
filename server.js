var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  console.log('含查询字符串的路径\n' + pathWithQuery)

  if (path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(
      '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="stylesheet" href="./style"></head><body><script src="./main.js"></script></body></html>'
    )
    response.end()
  } else if (path === '/style') {
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write('* {color: #a37654;}')
    response.end()
  } else if (path === '/main.js') {
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write('alert("test")')
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('Not Found')
    response.end()
  }
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n http://localhost:' + port)
