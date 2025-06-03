​
🎵 使用 Python + ExecJS 获取网易云音乐歌曲歌词
在本篇博客中，我们将通过一个完整的 Python 脚本，利用 execjs 模块调用 JavaScript 代码，成功获取网易云音乐的歌曲歌词。整个过程涵盖了加密参数的生成、API 请求发送与歌词提取，适合有一定爬虫基础的同学参考与实践。

📦 环境准备
🐍 Python 库依赖
请先确保安装了以下依赖：

pip install requests PyExecJS

💻 Node.js 环境
由于网易云的加密参数是通过 JavaScript 实现的，我们需要借助 Node.js 来执行 JS 代码。请确保你已安装 Node，并且 execjs 能正常调用：

node -v  # 确认安装成功
📄 核心代码解析
下面是核心脚本的关键步骤及代码解释。

1️⃣ 读取加密逻辑
网易云音乐使用了前端加密，我们将其 JavaScript 加密逻辑（比如 RSA/AES 混合加密）保存为 1.js 文件：

import execjs

node = execjs.get('Node')  # 获取 Node.js 运行环境
with open('1.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
ctx = node.compile(js_code)
2️⃣ 获取歌曲列表
我们通过网易云的搜索接口 https://music.163.com/weapi/search/suggest/web，发送带加密参数的 POST 请求：

songname = input('输入歌曲名: ')
ik = f'{{"s":"{songname}","limit":"8","csrf_token":"f8ca6f7e8ab34d79642bef1fbbdfacc4"}}'
result = ctx.call('ck', ik)

headers = {'Content-Type': 'application/x-www-form-urlencoded'}
url = "https://music.163.com/weapi/search/suggest/web?csrf_token=f8ca6f7e8ab34d79642bef1fbbdfacc4"
payload = (
    f'params={urllib.parse.quote(result["params"])}'
    f'&encSecKey={urllib.parse.quote(result["encSecKey"])}'
)

response = requests.post(url, headers=headers, data=payload)
songlist = response.json()["result"]["songs"]

显示搜索结果并选择歌曲：

for i, song in enumerate(songlist, 1):
    print(i, song["name"], song["artists"][0]["name"])

choice = int(input(f"请输入歌曲前序号1-{len(songlist)}: "))
songid = songlist[choice - 1]["id"]
3️⃣ 获取歌词
搜索接口拿到 songid 后，我们通过另一个接口获取歌词内容：

ik2 = f'{{"id":"{songid}","lv":-1,"tv":-1,"csrf_token":"f8ca6f7e8ab34d79642bef1fbbdfacc4"}}'
result2 = ctx.call('ck', ik2)

url = "https://music.163.com/weapi/song/lyric?csrf_token=f8ca6f7e8ab34d79642bef1fbbdfacc4"
payload = (
    f'params={urllib.parse.quote(result2["params"])}'
    f'&encSecKey={urllib.parse.quote(result2["encSecKey"])}'
)

response = requests.post(url, headers=headers, data=payload)
print(response.text)

💡 小贴士



{
  "lrc": {
    "lyric": "[00:00.000] 歌词内容..."
  }
}
✅ 最终效果
通过本脚本，你可以：




​
