// 引入依赖：CryptoJS 和 RSA（需事先引入库文件）
const CryptoJS = require('crypto-js');
const { RSAKeyPair, encryptedString, setMaxDigits } = require('./rsa'); // 需自定义或引入模块

function randomString(length) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function aesEncrypt(text, key) {
    const iv = CryptoJS.enc.Utf8.parse("0102030405060708");
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    const textUtf8 = CryptoJS.enc.Utf8.parse(text);
    const encrypted = CryptoJS.AES.encrypt(textUtf8, keyUtf8, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function rsaEncrypt(text, pubKey, modulus) {
    setMaxDigits(131);
    const key = new RSAKeyPair(pubKey, "", modulus);
    return encryptedString(key, text);
}

function asrsea(text, pubKey, modulus, nonce = "0CoJUm6Qyw8W8jud") {
    const secKey = randomString(16);
    const encText = aesEncrypt(aesEncrypt(text, nonce), secKey);
    const encSecKey = rsaEncrypt(secKey, pubKey, modulus);
    return {
        params: encText,
        encSecKey: encSecKey
    };
}


function ck(id){
    // 示例调用
const i2x = '{"ids":"[1394167216]","level":"exhigh","encodeType":"aac","csrf_token":"f8ca6f7e8ab34d79642bef1fbbdfacc4"}';

return  asrsea(i2x, '010001', '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7');

}
// 示例调用
const i2x = {
    "logs": "[{\"action\":\"mobile_monitor\",\"json\":{\"meta._ver\":2,\"meta._dataName\":\"pip_lyric_monitor\",\"action\":\"render\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0\",\"chromeVersion\":136,\"resourceId\":1394167216,\"resourceType\":\"song\",\"mainsite\":\"1\"}}]",
    "csrf_token": "f8ca6f7e8ab34d79642bef1fbbdfacc4"
};
const i1='{"ids":"[1394167216]","level":"exhigh","encodeType":"aac","csrf_token":"f8ca6f7e8ab34d79642bef1fbbdfacc4"}'
const result = asrsea(i1, '010001', '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7');

console.log(result)

