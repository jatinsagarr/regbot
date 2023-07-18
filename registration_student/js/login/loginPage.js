/**
 * Created by root on 8/16/14.
 */

function showForgotPwdPopUp() {
    if ($(".linkForgotPassword").attr("captchamatch") == "true") {
        if ($("#itCaptchaVal").val() == "") {
            $("#errorLbl").removeClass("hide");
            $("#errorLbl").css("display", "");
            $("#errorLbl").text("Enter captcha first!!");
            return;
        } else {
            var capParam = {};
            capParam.captchaInternal = $("#itCaptchaVal").val();
            $.ajax({
                type: "POST",
                url: "../LoginServlet",
                dataType: "json",
                data: capParam,
                success: function(response) {
                    if (response.error) {
                        $("#errorLbl").text(response.error);
                        return;
                    } else {
                        $("#errorLbl").text(response.message);
                        $.ajax({
                            type: "POST",
                            url: context().getContextPath + "/login/forgotPwd.jsp",
                            dataType: "html",
                            data: {},
                            success: function(html) {
                                onOpenPopUp();
                                $(".forgotPassPanel")[0].innerHTML = html;
                                $(".forgotPassPanel").removeClass("forgotPassPanelAfter");
                                $(".forgotPassPanel").addClass("showForgotPassPanel forgotPassPanelBefore");
                                $(".pnlLogInner").css("filter", "blur(2px)");
                                $(".userIdTextField").removeAttr("disabled");
                                $("#pageMask").bind("click", onClosePopUp);
                                $(".userIdTextField").unbind();
                                $("#forgotPwdForm").unbind("submit");
                                $(".errLabel").text("");
                                $("#btn_validateUser").bind("click", function(event) {
                                    event.preventDefault();
                                    loadSecurityData();
                                });
                            },
                            failure: function() {
                                //                console.log("Failed");
                            }
                        });
                    }
                },
                failure: function() {
                    responseData.errFlag = true;
                    responseData.errMsg = "Unexpected error occurred.";
                    showPopUpMsg(responseData);
                    removeLoaderOnLogin();
                }
            });
        }
    } else {
        $.ajax({
            type: "POST",
            url: context().getContextPath + "/login/forgotPwd.jsp",
            dataType: "html",
            data: {},
            success: function(html) {
                onOpenPopUp();
                $(".forgotPassPanel")[0].innerHTML = html;
                $(".forgotPassPanel").removeClass("forgotPassPanelAfter");
                $(".forgotPassPanel").addClass("showForgotPassPanel forgotPassPanelBefore");
                $(".pnlLogInner").css("filter", "blur(2px)");
                $(".userIdTextField").removeAttr("disabled");
                $("#pageMask").bind("click", onClosePopUp);
                $(".userIdTextField").unbind();
                $("#forgotPwdForm").unbind("submit");
                $(".errLabel").text("");
                $("#btn_validateUser").bind("click", function(event) {
                    event.preventDefault();
                    loadSecurityData();
                });
            },
            failure: function() {
                //                console.log("Failed");
            }
        });
    }
}

function onOpenPopUp() {
    var maskHome = $("#pageMask");
    maskHome.addClass("showPageMask");
    //    $("body").addClass("pageNoScroll");
    //    disableScrolling();
}

function onClosePopUp(maskHome, e) {
    $("#pageMask").removeClass("showPageMask");
    $(".forgotPassPanel").removeClass("showForgotPassPanel");
    $(".pnlLogInner").css("filter", "blur(0px)");
    //    enableScrolling();
    //    $("body").removeClass("pageNoScroll");
    if (e) {
        cancelEvent(e);
    }
}

function bindLoginPageEvents() {
    $(".linkForgotPassword").bind("click", showForgotPwdPopUp);
}

$(document).ready(function() {
    bindLoginPageEvents();
});

function checksubmit() {
    console.log("submit clicked");

    //$(".userIdTextField").blur();
    if ($("#submitBtn").length > 0) return false;
    else {
        //loadSecurityData();
        //    	$("#forgotPwdContainer").load(context().getContextPath + "/login/forgotPassRest.jsp");
        return false;
    }
}

function showLoaderOnLogin(container) {
    var cont, pnlLoader, loader;
    if (container) {
        cont = $("#" + container);
    } else {
        cont = $('body');
    }

    pnlLoader = document.createElement('div');
    pnlLoader.id = "pnlLoader";
    pnlLoader.className = "pnlLoader";
    loader = document.createElement('div');
    loader.id = "loader";
    loader.className = "loader";
    pnlLoader.appendChild(loader);
    $(cont).append(pnlLoader);

}

function removeLoaderOnLogin() {
    $("#pnlLoader").remove();
}