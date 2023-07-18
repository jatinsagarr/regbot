/**
 * Created with IntelliJ IDEA.
 * User: root
 * Date: 9/15/15
 * Time: 12:32 PM
 * To change this template use File | Settings | File Templates.
 */

var BROWSER = {
    isIE: (navigator.appName == "Microsoft Internet Explorer"),
    isCHROME: (navigator.userAgent.toLowerCase().indexOf("chrome") != -1),
    isFIREFOX: (navigator.userAgent.toLowerCase().indexOf("firefox") != -1),
    isOPERA: (navigator.appName == "Opera" || navigator.userAgent.indexOf("Opera") != -1)
};

BROWSER.ver = BROWSER.isIE ? navigator.userAgent.substring(navigator.userAgent.indexOf('MSIE') + 5, navigator.userAgent.indexOf(";", navigator.userAgent.indexOf('MSIE'))) : BROWSER.isFIREFOX ? navigator.userAgent.substr(navigator.userAgent.indexOf('Firefox') + 8) : navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7, navigator.userAgent.indexOf("Safari") - 1);

window.onload = function() {
    $("#usernameId").focus();
}

$().ready(function() {
    $("#pnlQRImg").bind("mouseout", function() {
        $("#pnlQR").removeClass("pnlQRShow");
    });

    $("#captchaRfrsh").click(chngCaptcha);

    var enterActionObj;
    if ($('#captchaPnl').is(':hidden')) {
        enterActionObj = $('#passwordId');
    } else {
        enterActionObj = $('#itCaptchaVal');
    }
    enterActionObj.keydown(function(event) {
        if (event.keyCode == 13) {
            submitAction(this);
        }
    });
});

function keyPressTFNum(e) {
    e = e || window.event;
    var code = BROWSER.isFIREFOX ? e.charCode : e.keyCode;
    if (code != 13 &&
        ((BROWSER.isFIREFOX && e.charCode != 0) || !BROWSER.isFIREFOX)) {
        return !(code < 48 || code > 57);
    }
    return true;
}

function validateEmail(email) {
    var at = email.indexOf("@");
    var dot = email.lastIndexOf(".");
    return !(at < 1 || at + 2 > dot || dot + 2 > email.length);
}

function validatePass() {
    var email = $("#emailIdTextField").val();
    var emailComp = $("#errLabel");
    if ($("11").val() === "" || !validateEmail(email)) {
        emailComp.text("Invalid mail ID");
        emailComp.addClass("show");
        setTimeout(function() {
            emailComp.removeClass("show");
        }, 1500);

        return false;
    }
    return true;
}

function submitAction(e) {
    if ($("#passwordId").val().length < 6) {
        $("#errorLbl").show();
        $("#errorLbl")[0].innerHTML = "Password's length should be greater than 5";
        e.preventDefault();
        return;
    }
    document.getElementById("passwordId").value = calcSaltedSHA1($("#passwordId").val());
    if (($("#captchaPnl").attr('class') != "hide") && $("#itCaptchaVal")[0].value.trim() == "") {
        $("#errorLbl")[0].innerHTML = "Enter Captcha Value";
        $("#errorLbl").css('display', 'block');
    } else {
        var form = document.getElementById("loginForm");
        $(document.activeElement).blur();
        form.submit();
    }
}

function calcSaltedSHA1(str) {
    var password = calcSHA1(str);
    var salt = $("#hiddenSalt").val().trim();
    var saltedPassword = sha256(password + salt);
    return saltedPassword.toString();
}

function chngCaptcha() {
    $("#captchaImg")[0].src = $("#captchaImg")[0].src.split("?")[0] + "?ver=" + (new Date().getTime());
}