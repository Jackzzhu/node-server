// 导入http模块:
var http = require('http');
var fs = require('fs');
var newUser = "";
// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
  var url = request.url;
  console.log("url = " + url);
  if (url.indexOf("?") != -1) {
    var strs = url.split("?");
    url = strs[0];
    newUser=decodeURIComponent(strs[1]);
  }
  if (url === '/greet') {
    fs.readFile('./greet.json', function (err, data) {
      if (!err) {
        response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
        response.end(data)
      } else {
        throw err;
      }
    });
  } else if (url === '/greet/add') {
    //先將原本的 json 檔讀出來
    fs.readFile('./greet.json', function (err, userInfo) {
      if (err) {
        return console.error(err);
      }
      //將二進制數據轉換為字串符
      var user = userInfo.toString();
      //將字符串轉換為 JSON 對象
      user = JSON.parse(user);
      //將傳來的資訊推送到數組對象中
      console.log(newUser);
      user.barrages.push(newUser);

      //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
      var str = JSON.stringify(user);
      //將字串符傳入您的 json 文件中
      fs.writeFile('./greet.json', str, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('Add new user to userInfo...')
        response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
        response.end(userInfo)
      })
    })
  } else {
    console.error("111");
  }
});

// 让服务器监听8080端口:
server.listen(8081);

console.log('Server is running at http://127.0.0.1:8081/');