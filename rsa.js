// rsa.js
function biFromHex(s) {
    var result = bigInt(s, 16);
    return result;
}

function biToHex(bi) {
    return bi.toString(16);
}

function setMaxDigits(value) {
    // 这个函数可以忽略或保留
}

function RSAKeyPair(encryptionExponent, decryptionExponent, modulus) {
    this.e = bigInt(encryptionExponent, 16);
    this.d = bigInt(decryptionExponent, 16);
    this.m = bigInt(modulus, 16);
}

function reversedText(text) {
    return text.split("").reverse().join("");
}

function encryptedString(key, text) {
    text = reversedText(text);
    const textHex = Buffer.from(text).toString('hex');
    const bigintText = bigInt(textHex, 16);
    const encrypted = bigintText.modPow(key.e, key.m);
    let result = encrypted.toString(16);
    // 补全到256位（和网易云加密要求一致）
    while (result.length < 256) result = '0' + result;
    return result;
}

const bigInt = require("big-integer");

module.exports = {
    RSAKeyPair,
    encryptedString,
    setMaxDigits
};
