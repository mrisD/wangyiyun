import execjs
import requests
import urllib.parse
node = execjs.get('Node')  # 获取Node运行时
with open('1.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

ctx = node.compile(js_code)
result = ctx.call('ck', '2695944873')
print(result)
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

url="https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token=f8ca6f7e8ab34d79642bef1fbbdfacc4"
payload = (
    f'params={urllib.parse.quote(result["params"])}'
    f'&encSecKey={urllib.parse.quote(result["encSecKey"])}'
)
print(payload)
response = requests.request("POST", url, headers=headers, data=payload)
print(response.content)
