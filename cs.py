import execjs
import requests
import urllib.parse
node = execjs.get('Node')  # 获取Node运行时
with open('1.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
songname=input('输入歌曲名:')
ctx = node.compile(js_code)
ik=f'{{"s":"{songname}","limit":"8","csrf_token":"f8ca6f7e8ab34d79642bef1fbbdfacc4"}}'
result = ctx.call('ck', ik)
# print(result)

headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

url="https://music.163.com/weapi/search/suggest/web?csrf_token=f8ca6f7e8ab34d79642bef1fbbdfacc4"
payload = (
    f'params={urllib.parse.quote(result["params"])}'
    f'&encSecKey={urllib.parse.quote(result["encSecKey"])}'
)
# print(payload)
response = requests.request("POST", url, headers=headers, data=payload)
# print(response.json())
songlist = response.json()["result"]["songs"]
length = len(songlist)
a=1
for song in songlist:
    print(a,song["name"],song["artists"][0]["name"])
    a+=1
songid=songlist[int(input(f"请输入歌曲前序号1-{length}:"))-1]["id"]
# print(songid)
#######################################################################
ik2=f'{{"id":"{songid}","lv":-1,"tv":-1,"csrf_token":"f8ca6f7e8ab34d79642bef1fbbdfacc4"}}'
result2 = ctx.call('ck', ik2)
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

url="https://music.163.com/weapi/song/lyric?csrf_token=f8ca6f7e8ab34d79642bef1fbbdfacc4"
payload = (
    f'params={urllib.parse.quote(result2["params"])}'
    f'&encSecKey={urllib.parse.quote(result2["encSecKey"])}'
)
# print(payload)
response = requests.request("POST", url, headers=headers, data=payload)
print(response.text)