var captchaText = $("#ctl00_ContentPlaceHolder1_ctl00_lblCapcha").text();
var captchaInput = $("#ctl00_ContentPlaceHolder1_ctl00_txtCaptcha");
console.log(" CAPTCHA TEXT: " + captchaText);
if (captchaInput.length){
    captchaInput.val(captchaText);
}