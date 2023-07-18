/**
 * Created by root on 8/16/14.
 */

function loadSecurityData() {
    var responseData = {
        errFlag: true,
        errMsg: ""
    };
    var userId = $(".userIdTextField").val();
    var formUrl = $("#forgotPwdForm").attr("jspUrl");
    var servletUrl = $("#forgotPwdForm").attr("servletUrl");

    var params = {
        reqType: 'validateUser',
        userId: userId
    };

    $(".errLabel").text("");
    showLoaderOnLogin("forgotPwdContainer");
    $.ajax({
        type: "POST",
        url: servletUrl,
        dataType: "json",
        data: params,
        success: function(response) {
            onOpenPopUp();
            $(".forgotPassRest").html("");

            if (response.hasOwnProperty("success")) {
                $(".userIdTextField").attr("disabled", "true");
                createOTPField(response);
            } else if (response.hasOwnProperty("error")) {
                $(".errLabel").text(response.error);
            }
            removeLoaderOnLogin();
        },
        failure: function() {
            responseData.errFlag = true;
            responseData.errMsg = "Unexpected error occurred.";
            showPopUpMsg(responseData);
            removeLoaderOnLogin();
        }
    });
}

function createOTPField(response) {

    $(".forgotPassRest").empty();
    $(".changeValidationTypeLink").remove();

    var OTPPanelContainer = document.createElement("div");
    $(OTPPanelContainer).attr("id", "OTPPanelContainer");
    $(OTPPanelContainer).attr("class", "OTPPanelContainer validator");

    if (response.hasOwnProperty("mobile")) {
        var mobileOTPPanelContainer = document.createElement("div");
        $(mobileOTPPanelContainer).attr("id", "mobileOTPPanelContainer");
        $(mobileOTPPanelContainer).attr("class", "mobileOTPPanelContainer validator");

        var mobileOTPLabel = document.createElement("p");
        $(mobileOTPLabel).text("Enter your mobile phone number: " + response.mobile);
        $(mobileOTPLabel).attr("id", "mobileOTPLabel");
        $(mobileOTPLabel).attr("class", "mobileOTPLabel");

        var mobileNumberTextField = document.createElement("input");
        $(mobileNumberTextField).attr("type", "number");
        $(mobileNumberTextField).attr("id", "mobileNumberTextField");
        $(mobileNumberTextField).attr("class", "mobileNumberTextField customText");
        $(mobileNumberTextField).attr("placeholder", "- - - - - - - - - -");
        $(mobileNumberTextField).attr("maxlength", "10");
        $(mobileNumberTextField).attr("max", "9999999999");

        $(mobileOTPPanelContainer).append(mobileOTPLabel);
        $(mobileOTPPanelContainer).append(mobileNumberTextField);
        $(OTPPanelContainer).append(mobileOTPPanelContainer);
    }

    if (response.hasOwnProperty("email")) {
        var emailOTPPanelContainer = document.createElement("div");
        $(emailOTPPanelContainer).attr("id", "emailOTPPanelContainer");
        $(emailOTPPanelContainer).attr("class", "emailOTPPanelContainer validator");

        var emailOTPLabel = document.createElement("p");
        $(emailOTPLabel).text("Enter Your Email ID: " + response.email);
        $(emailOTPLabel).attr("id", "emailOTPLabel");
        $(emailOTPLabel).attr("class", "emailOTPLabel");

        var emailIdTextField = document.createElement("input");
        $(emailIdTextField).attr("type", "text");
        $(emailIdTextField).attr("id", "emailIdTextField");
        $(emailIdTextField).attr("class", "emailIdTextField customText");
        $(emailIdTextField).attr("placeholder", "xxx@xxx.com");
        $(emailIdTextField).attr("maxlength", response.email.length);

        $(emailOTPPanelContainer).append(emailOTPLabel);
        $(emailOTPPanelContainer).append(emailIdTextField);
        $(OTPPanelContainer).append(emailOTPPanelContainer);
    }

    var OTPTextField = document.createElement("input");
    $(OTPTextField).attr("type", "text");
    $(OTPTextField).attr("id", "OTPTextField");
    $(OTPTextField).attr("class", "OTPTextField customText displayNone");
    $(OTPTextField).attr("placeholder", "xxxxxx");
    $(OTPTextField).attr("maxlength", "6");
    $(OTPPanelContainer).append(OTPTextField);

    var requestOtpBtn = document.createElement("button");
    $(requestOtpBtn).attr("id", "requestOtpBtn");
    $(requestOtpBtn).attr("class", "requestOtpBtn");
    $(requestOtpBtn).attr("actionType", "validate");
    $(requestOtpBtn).text("Validate");
    $(OTPPanelContainer).append(requestOtpBtn);

    $(".forgotPassRest").append(OTPPanelContainer);

    var adminRequestPanel = document.createElement("div");
    $(adminRequestPanel).attr("id", "adminRequestPanel");
    $(adminRequestPanel).attr("class", "adminRequestPanel validator");

    var emailContainer = document.createElement("div");
    $(emailContainer).attr("id", "emailContainer");
    $(emailContainer).attr("class", "emailContainer validator");

    var emailLabel = document.createElement("p");
    $(emailLabel).text("Enter your eMail ID:");

    var emailTextField = document.createElement("input");
    $(emailTextField).attr("id", "emailTextField");
    $(emailTextField).attr("type", "text");
    $(emailTextField).attr("placeholder", "Email");
    $(emailTextField).attr("class", "emailTextField customText");
    $(emailTextField).attr("max-length", "150");

    $(emailContainer).append(emailLabel);
    $(emailContainer).append(emailTextField);

    var mobileLabel = document.createElement("p");
    $(mobileLabel).text("Enter your Phone Number:");

    var mobileTextField = document.createElement("input");
    $(mobileTextField).attr("id", "mobileTextField");
    $(mobileTextField).attr("type", "number");
    $(mobileTextField).attr("placeholder", "Phone Number");
    $(mobileTextField).attr("class", "mobileTextField customText");
    $(mobileTextField).attr("max", "9999999999");

    var sendRequest2AdminBtn = document.createElement("button");
    $(sendRequest2AdminBtn).attr("id", "sendRequest2AdminBtn");
    $(sendRequest2AdminBtn).attr("class", "sendRequest2AdminBtn");
    $(sendRequest2AdminBtn).text("Send");

    $(emailContainer).append(mobileLabel);
    $(emailContainer).append(mobileTextField);
    $(emailContainer).append(sendRequest2AdminBtn);

    $(".forgotPassRest").append(emailContainer);

    var changeValidationTypeLink = document.createElement("p");
    $(changeValidationTypeLink).attr("id", "changeValidationTypeLink");
    $(changeValidationTypeLink).attr("class", "changeValidationTypeLink");
    $(changeValidationTypeLink).text("Don't Remember? Send Request to Administration!");
    $(".changeValidationTypeLink").remove();
    $("#changeValidationTypeLink").unbind("click");
    $("#forgotPwdForm").append(changeValidationTypeLink);
    $("#changeValidationTypeLink").attr("next", "admin");
    $("#changeValidationTypeLink").bind("click", slideForgotPasswordPanel);
    $(requestOtpBtn).unbind("click");
    $(requestOtpBtn).bind("click", function(event) {
        event.preventDefault();
        validateAndsendOTP();
    });
    $(".sendRequest2AdminBtn").bind("click", function(event) {
        event.preventDefault();
        sendRequest2Admin();
    });

    if (!response.hasOwnProperty("mobile") && !response.hasOwnProperty("email")) {
        slideForgotPasswordPanel();
        $(".changeValidationTypeLink").remove();
    }

}

function sendRequest2Admin() {
    var servletUrl = $("#forgotPwdForm").attr("servletUrl");
    var params = {
        reqType: "sendRequest2Admin",
    }
    var userId = $("#userIdTextField").val().trim();
    if (userId === undefined || userId === "") {
        $(".errLabel").text("Enter User ID");
        return;
    }
    params["userId"] = userId;
    if ($("#emailTextField") !== undefined && $("#emailTextField").length !== 0) {
        var email = $("#emailTextField").val().trim();
        if (email === "") {
            $(".errLabel").text("Enter your email id.");
            return;
        }
        params["email"] = email;
    }

    if ($("#mobileTextField") !== undefined && $("#mobileTextField").length !== 0) {
        var mobileNo = $("#mobileTextField").val().trim();
        if (mobileNo === "") {
            $(".errLabel").text("Enter your phone number.");
            return;
        }
        params["mobileNo"] = mobileNo;
    }

    showLoaderOnLogin("forgotPwdContainer");
    $.ajax({
        type: "POST",
        url: servletUrl,
        dataType: "json",
        data: params,
        success: function(response) {
            if (response.hasOwnProperty("success")) {
                $(".errLabel").text("A request has been sent to the College Administration. They will be reverting you on the provided contact details.");
            } else if (response.hasOwnProperty("error")) {
                $(".errLabel").text(response.error);
            }
            removeLoaderOnLogin();
        },
        failure: function() {
            $(".errLabel").text("Unexpected Error occurred!");
            removeLoaderOnLogin();
        }
    });

}

function validateAndsendOTP() {
    var servletUrl = $("#forgotPwdForm").attr("servletUrl");
    $(".errLabel").text("");
    if ($("#requestOtpBtn").attr("actionType").trim() === "validate") {
        var params = {
            reqType: "validateAndsendOTP",
        }

        var userId = $("#userIdTextField").val().trim();
        if (userId === undefined || userId === "") {
            $(".errLabel").text("Enter User ID");
            return;
        }
        params["userId"] = userId;

        if ($("#mobileNumberTextField") !== undefined && $("#mobileNumberTextField").length !== 0) {
            var mobileNo = $("#mobileNumberTextField").val().trim();
            if (mobileNo === "") {
                $(".errLabel").text("Enter your phone number.");
                return;
            }
            params["mobileNo"] = mobileNo;
        }

        if ($("#emailIdTextField") !== undefined && $("#emailIdTextField").length !== 0) {
            var email = $("#emailIdTextField").val().trim();
            if (email === "") {
                $(".errLabel").text("Enter your email id.");
            }
            params["email"] = email;
        }
        showLoaderOnLogin("forgotPwdContainer");
        $.ajax({
            type: "POST",
            url: servletUrl,
            dataType: "json",
            data: params,
            success: function(response) {
                if (response.hasOwnProperty("success")) {
                    $(".mobileOTPPanelContainer").addClass("displayNone");
                    $(".emailOTPPanelContainer").addClass("displayNone");
                    $(".changeValidationTypeLink").remove();
                    var optSentLabel = document.createElement("p");
                    $(optSentLabel).text("An OTP is sent on the provided contact. Type the OTP below and press Verify");
                    $(optSentLabel).insertBefore("#OTPTextField");
                    $(optSentLabel).css("color", "white");
                    $(optSentLabel).attr("class", "optSentLabel");
                    $(optSentLabel).attr("id", "optSentLabel");

                    $("#requestOtpBtn").attr("actionType", "validateOTP");
                    $("#OTPTextField").removeClass("displayNone");
                    $("#requestOtpBtn").text("Verify");

                    var resendOTPLink = document.createElement("p");
                    $(resendOTPLink).text("Resend OTP");
                    $(resendOTPLink).attr("id", "resendOTPLink");
                    $(resendOTPLink).attr("class", "resendOTPLink");
                    $(resendOTPLink).insertAfter("#OTPTextField");

                    setTimeout(function() {
                        $(resendOTPLink).css("color", "orangered");
                        $(resendOTPLink).css("cursor", "pointer");
                        $(resendOTPLink).css("margin-top", "5px");
                        $(resendOTPLink).bind("click", resendOTP);
                    }, 60000); // The link will be active after 1 minutes.
                } else if (response.hasOwnProperty("error")) {
                    $(".errLabel").text(response.error);
                }
                removeLoaderOnLogin();
            },
            failure: function() {
                $(".errLabel").text("Unexpected Error occurred!");
                removeLoaderOnLogin();
            }
        });
    } else if ($("#requestOtpBtn").attr("actionType").trim() === "validateOTP") {
        var params = {
            reqType: "validateOTP",
        }

        var userId = $("#userIdTextField").val().trim();
        if (userId === undefined || userId === "") {
            $(".errLabel").text("Enter User ID");
            return;
        }
        params["userId"] = userId;

        var otp = $("#OTPTextField").val();
        if (otp === undefined || otp === "") {
            $(".errLabel").text("Enter OTP");
            return;
        }
        params["otp"] = otp;
        showLoaderOnLogin("forgotPwdContainer");
        $.ajax({
            type: "POST",
            url: servletUrl,
            dataType: "json",
            data: params,
            success: function(response) {
                if (response.hasOwnProperty("success")) {
                    $("#optSentLabel").addClass("displayNone");
                    $("#OTPTextField").addClass("displayNone");
                    $("#resendOTPLink").addClass("displayNone");

                    var container = $("#OTPPanelContainer");

                    var newPasswordTextField = document.createElement("input");
                    $(newPasswordTextField).attr("type", "password");
                    $(newPasswordTextField).attr("id", "newPasswordTextField");
                    $(newPasswordTextField).attr("class", "newPasswordTextField customText");
                    $(newPasswordTextField).attr("placeholder", "New Password");

                    var confirmPasswordTextField = document.createElement("input");
                    $(confirmPasswordTextField).attr("type", "password");
                    $(confirmPasswordTextField).attr("id", "confirmPasswordTextField");
                    $(confirmPasswordTextField).attr("class", "confirmPasswordTextField customText");
                    $(confirmPasswordTextField).attr("placeholder", "Confirm New Password");

                    $(newPasswordTextField).insertBefore("#requestOtpBtn");
                    $(confirmPasswordTextField).insertBefore("#requestOtpBtn");
                    $("#requestOtpBtn").attr("actionType", "changePassword");
                    $("#requestOtpBtn").attr("pk", response.rsa_key);
                    $("#requestOtpBtn").text("Change Password");
                    $("#requestOtpBtn").css("width", "150px");
                } else if (response.hasOwnProperty("error")) {
                    $(".errLabel").text(response.error);
                }
                removeLoaderOnLogin();
            },
            failure: function() {
                $(".errLabel").text("Unexpected Error occurred!");
                removeLoaderOnLogin();
            }
        });

    } else if ($("#requestOtpBtn").attr("actionType").trim() === "changePassword") {

        var params = {
            reqType: "changePassword",
        }

        var userId = $("#userIdTextField").val().trim();
        if (userId === undefined || userId === "") {
            $(".errLabel").text("Enter User ID");
            return;
        }
        params["userId"] = userId;


        var newPassword = $("#newPasswordTextField").val().trim();
        var confirmNewPassword = $("#confirmPasswordTextField").val().trim();

        if (newPassword === undefined || newPassword === "") {
            $(".errLabel").text("Password Fields Cannot be empty!" || confirmNewPassword === undefined || confirmNewPassword === "");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            $(".errLabel").text("Passwords do not match!");
            return;
        }

        var rsa = new RSAKey();
        rsa.setPublic($("#requestOtpBtn").attr('pk').trim(), "10001");

        $("#newPasswordTextField").val(rsa.encrypt(calcSHA1Inner($("#newPasswordTextField").val().trim())));
        $("#confirmPasswordTextField").val(rsa.encrypt(calcSHA1Inner($("#confirmPasswordTextField").val().trim())));

        newPassword = $("#newPasswordTextField").val().trim();
        confirmNewPassword = $("#confirmPasswordTextField").val().trim();

        params["newPassword"] = newPassword;
        showLoaderOnLogin("forgotPwdContainer");
        $.ajax({
            type: "POST",
            url: servletUrl,
            dataType: "json",
            data: params,
            success: function(response) {
                if (response.hasOwnProperty("success")) {
                    $(".errLabel").text(response.success);
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                } else if (response.hasOwnProperty("error")) {
                    $(".errLabel").text(response.error);
                }
                removeLoaderOnLogin();
            },
            failure: function() {
                $(".errLabel").text("Unexpected Error occurred!");
                removeLoaderOnLogin();
            }
        });

    }

}

function resendOTP() {
    var servletUrl = $("#forgotPwdForm").attr("servletUrl");
    $(".errLabel").text("");
    var params = {
        reqType: "validateAndsendOTP",
    }

    var userId = $("#userIdTextField").val().trim();
    if (userId === undefined || userId === "") {
        $(".errLabel").text("Enter User ID");
        return;
    }
    params["userId"] = userId;

    if ($("#mobileNumberTextField") !== undefined && $("#mobileNumberTextField").length !== 0) {
        var mobileNo = $("#mobileNumberTextField").val().trim();
        if (mobileNo === "") {
            $(".errLabel").text("Enter your phone number.");
            return;
        }
        params["mobileNo"] = mobileNo;
    }

    if ($("#emailIdTextField") !== undefined && $("#emailIdTextField").length !== 0) {
        var email = $("#emailIdTextField").val().trim();
        if (email === "") {
            $(".errLabel").text("Enter your email id.");
        }
        params["email"] = email;
    }
    showLoaderOnLogin("forgotPwdContainer");
    $.ajax({
        type: "POST",
        url: servletUrl,
        dataType: "json",
        data: params,
        success: function(response) {
            if (response.hasOwnProperty("success")) {
                $(".errLabel").text("OTP sent successfully!");
            } else if (response.hasOwnProperty("error")) {
                $(".errLabel").text(response.error);
            }
            removeLoaderOnLogin();
        },
        failure: function() {
            $(".errLabel").text("Unexpected Error occurred!");
            removeLoaderOnLogin();
        }
    });

}

function slideForgotPasswordPanel() {
    if ($("#changeValidationTypeLink").attr("next").trim() === "admin") {
        $(".forgotPassRest").css("left", "-300px");
        $("#changeValidationTypeLink").text("<< Back");
        $("#changeValidationTypeLink").attr("next", "back");
    } else if ($("#changeValidationTypeLink").attr("next").trim() === "back") {
        $(".forgotPassRest").css("left", "0px");
        $("#changeValidationTypeLink").text("Don't Remember? Send Request to Administration!");
        $("#changeValidationTypeLink").attr("next", "admin");
    }

}

function bindForgotPwdEvents() {
    $(".userIdTextField").unbind();
    $("#btn_validateUser").bind("click", function(event) {
        event.preventDefault();
        loadSecurityData();
    });

}

function showPopUpMsg(responseData) {
    var popUpMsgLabel = $("#errorInfoLabel");
    if (responseData[0]) {
        responseData = responseData[0];
    }

    popUpMsgLabel.text(responseData.errMsg);
    popUpMsgLabel.addClass("showErrorInfoLabel");

    if (responseData.errFlag.toString() === "true") {
        setTimeout(hidePopUpMsg, 3000);
    } else {
        setTimeout(reDirect, 3000);
    }
}

function hidePopUpMsg() {
    var popUpMsgLabel = $("#errorInfoLabel");
    popUpMsgLabel.removeClass("popUpErrLabelShow");
    popUpMsgLabel.text("");
}

function onOpenPopUp() {
    var maskHome = $("#pageMask");
    maskHome.addClass("showPageMask");
    $(".pnlLogInner").css("filter", "blur(3px)");
    //    $("body").addClass("pageNoScroll");
    //    disableScrolling();
}

function onClosePopUp(e) {
    $("#pageMask").removeClass("showPageMask");
    $(".forgotPassPanel").removeClass("showForgotPassPanel");
    $(".pnlLogInner").css("filter", "blur(0px)");
    //    enableScrolling();
    //    $("body").removeClass("pageNoScroll");
    if (e) {
        cancelEvent(e);
    }
}


function reDirect() {
    window.location = window.location.href;
}

$(document).ready(function() {
    $(".errLabel").text("");
    bindForgotPwdEvents();
    bindSubmitAction();
    disableFirstLoginOldPwdField();
    setAccess();
});

function setAccess() {
    if ($("#oldPasswordTxt").length !== 0 && $("#oldPasswordTxt").attr("data-isloginallowed").trim().equalsIgnoreCase("true")) {
        $("#firstLoginChangeForm #cancelBtn").removeClass("displayNone");
    } else {
        $("#firstLoginChangeForm #cancelBtn").addClass("displayNone");
        $("#maskHome").unbind();
    }
}

function chngCaptcha() {
    $("#forgotPassRestPanel #captchaImg")[0].src = $("#forgotPassRestPanel #captchaImg")[0].src.split("?")[0] + "?ver=" + (new Date().getTime());
}

function bindSubmitAction() {
    $("#forgotPassRestPanel #captchaRfrsh").click(chngCaptcha);
    var buttons = $(".firstLoginChangeForm .submitBtn"),
        submitBtn, i, resetSubmit = $(".forgotPwdForm .submitBtn");
    if (resetSubmit[0]) {
        bindFormSubmitAction(resetSubmit); //to fetch button of forgot password reset form
    }

    function bindFormSubmitAction(currButton) {
        var form = $(currButton).parents("form");
        var formAction = $(form).attr("servletUrl");

        form.unbind("submit");
        form.bind("submit", function() {
            try {
                if (($("#captchaPnl").attr('class') != 'hide') && $("#captchaImg") != undefined && $("#captchaImg").length != 0 && $("#forgotPassRestPanel #itCaptchaVal")[0].value.trim() == "") {
                    $("#errorInfoPanel")[0].innerHTML = "Enter Captcha Value";
                    $("#errorInfoPanel").css('display', 'block');
                    return;
                }
                var rsa = new RSAKey();
                rsa.setPublic($("#firstLoginPopUp #submitBtn").attr('pk').trim(), "10001");
                if ($("#firstLoginPopUp #newPassTextField").val() !== $("#firstLoginPopUp #cnfrmPassTextField").val()) {
                    $(".errLabel").text("New Password and Confirmed Password do not match!");
                    return;
                }

                if ($("#firstLoginPopUp #oldPasswordTxt").val() === $("#firstLoginPopUp #newPassTextField").val()) {
                    $(".errLabel").text("New Password cannot be same as old password!");
                    return;
                }

                $("#firstLoginPopUp #oldPasswordTxt").val(rsa.encrypt(calcSaltedSHA1Inner($("#firstLoginPopUp #oldPasswordTxt").val())));
                $("#firstLoginPopUp #newPassTextField").val(rsa.encrypt(calcSHA1Inner($("#firstLoginPopUp #newPassTextField").val())));
                $("#firstLoginPopUp #cnfrmPassTextField").val(rsa.encrypt(calcSHA1Inner($("#firstLoginPopUp #cnfrmPassTextField").val())));
                sendPwdChangeRequest(form, formAction);

                return false;
            } catch (e) {
                return false;
            }

        });
    }

    function sendPwdChangeRequest(form, formAction) {
        console.log("before ajax call");
        var ajax, resp, requestType = "" /*form.parents("#Panel90").length > 0 ? "dashboard" : "firstLogin"*/ ;
        if (!formAction) {
            var formAction = $(form).attr("action") + "&" + getFormParams(form[0]);
        }

        $.ajax({
            type: "POST",
            url: formAction,
            dataType: "json",
            data: {},
            success: function(response) {
                //var response = JSON.parse(req);
                if (response.hasOwnProperty("message")) {
                    $(".errLabel").text(response.message);

                    setTimeout(function() {
                        location.reload();
                    }, 2000);

                } else if (response.hasOwnProperty("error")) {
                    $(".errLabel").text(response.error);
                }

                $("#firstLoginChangeForm #oldPasswordTxt").val("");
                $("#firstLoginChangeForm #newPassTextField").val("");
                $("#firstLoginChangeForm #cnfrmPassTextField").val("");

            },
            failure: function() {
                $(".errLabel").text("Something went wrong!");
                $("#firstLoginChangeForm #oldPasswordTxt").val("");
                $("#firstLoginChangeForm #newPassTextField").val("");
                $("#firstLoginChangeForm #cnfrmPassTextField").val("");
            }
        });
    }

    function getFormParams(form) {
        var i, currElement, paramString = "";
        for (i = 0; i < form.elements.length; i++) {
            currElement = form.elements[i];
            if (currElement.type === "text" || currElement.type === "textarea" || currElement.type === "password" || currElement.type === "email") {
                paramString = paramString + currElement.name + "=" + encodeURIComponent(currElement.value);
                if (i !== (form.elements.length - 1)) {
                    paramString += "&";
                }
            } else if (currElement.type === "select-one") {
                paramString = paramString + currElement.name + "=" + encodeURIComponent(currElement.value);
                if (i !== (form.elements.length - 1)) {
                    paramString += "&";
                }
            }
        }
        return paramString;
    }

    function showError(msg, info) {
        //var errlbl = $(".firstLoginChangeContainer").find(".errLabel");
        var errlbl = $(".errLabel");
        errlbl.html(msg);
        if (info) {
            errlbl.addClass("info");
        } else {
            errlbl.removeClass("info");
        }
    }


    for (i = 0; i < buttons.length; i++) {
        submitBtn = $(buttons[i]);
        bindFormSubmitAction(submitBtn);
    }

}

function disableFirstLoginOldPwdField() {
    var oldPwdTxt = $(".firstLoginPopUp .oldPasswordTxt");
    //oldPwdTxt.attr("disabled", "disabled");
}

function escapeKey(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        closePopUp();
    }
}

function calcSHA1Inner(str) {
    var password = calcSHA1(str);
    return password.toString();
}

function calcSaltedSHA1Inner(str) {
    var password = calcSHA1(str);
    var salt = $("#hiddenSalt").val().trim();
    var saltedPassword = sha256(password + salt);
    return saltedPassword.toString();
}


function setPortalMsgErr(data) {
    if (data.message.trim() != "") {
        $("body .mdl-message-container").remove();
        if (data.error == true) {
            $("body").append("<div class='box-shadow-1 mdl-message-container danger' ><img src='/images/mdl/Red Warning.png'/><p class='mdl-message'>" + data.message + "</p></div>");
        } else {
            $("body").append("<div class='box-shadow-1 mdl-message-container infoMsg' ><img src='/images/mdl/Green Warning.png'/><p class='mdl-message'>" + data.message + "</p></div>");
        }
        $(".mdl-message-container").css('transform', 'translate(0px,0px)');
        setTimeout(function() {
            $(".mdl-message-container").css('transform', 'translate(0px,40px)');
        }, 5000);
    }
}