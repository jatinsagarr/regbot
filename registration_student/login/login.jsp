<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">





<html lang='en'>
<head>
   <title>Student Portal Login</title>
	<link rel="stylesheet" href="/registration_student/lwt/LWT.css">
	<link rel="stylesheet" href="/registration_student/css/bootstrap/bootstrap.css">
	<link rel="stylesheet" href="/registration_student/css/user.css">

<script>
            context = function(){
                var contextPath = "/registration_student";
               
                return { getContextPath : contextPath };
            };
    </script>
	<script type="text/javascript" src="/registration_student/lwt/js/jquery-1.9.1.min.js" ></script>
	<script type="text/javascript" src="/registration_student/lwt/js/lswt.min.js" ></script>
	<script type="text/javascript" src="/registration_student/js/login/forgotPwd.js" ></script>
	<script type="text/javascript" src="/registration_student/js/login/loginPage.js" ></script>
	<script type="text/javascript" src="/registration_student/js/login.js" ></script>
	<script type="text/javascript" src="/registration_student/js/sha1.js" ></script>
	<script type="text/javascript" src="/registration_student/js/sha256.js" ></script>
	<script type="text/javascript" src="/registration_student/lwt/js/lswt.textField.min.js" ></script>
	<script type="text/javascript" src="/registration_student/js/rsa.js" ></script>
	<script type="text/javascript" src="/registration_student/js/random.js" ></script>
	<script type="text/javascript" src="/registration_student/js/jsbn.js" ></script>

</head>
<body  label="Keep me logged in"  >
<div  id="pnlLoginMain" class="pnlLoginMain" _componentType="12" >

<div  id="maskPanel" class="maskPanel" _componentType="12" >

</div>
<div  id="pnlLogInner" class="pnlLogInner" _componentType="12" >

<div  id="pnlLoginHdr" class="pnlLoginHdr" _componentType="12" >

<p  id="lblLoginHdr" class="lblLoginHdr" _componentType="10" >
Student Portal
</p>
</div>
<div  id="loginPanel" class="loginPanel" _componentType="12" align="center" valign="middle" >

<form  id="loginForm" class="loginFormCls" _componentType="6" action="../LoginServlet" method="POST" enctype="application/x-www-form-urlencoded" align="center" valign="middle" >

<div  id="loginImagePanel" class="loginImagePanel" _componentType="12" >

<img  id="loginImage" class="loginImage" _componentType="8" src="/registration_student/images/profiledemo.png"   />
</div>
<p  id="loginLbl" class="loginLblCls" _componentType="10" align="center" valign="middle"  style="position:relative;">
Student Login
</p>
<input  name="userName" type="text" id="usernameId" class="rectxt1" _componentType="17" data-contenttype="0" placeholder="Login ID" maxlength="20" autocomplete="off"  />
<input  name="password" type="password" id="passwordId" class="rectxt1" _componentType="17" data-contenttype="0" placeholder="Password" maxlength="50" autocomplete="off"  />
<div  id="pnlFrgtPwd" class="pnlFrgtPwd" _componentType="12" >

<div class="loggedIn">
<input  class="loggedIn-selector" type="checkbox" id="loggedIn" _componentType="2"  />
<label  class="loggedIn-label" for="loggedIn" >Keep me logged in</label>
</div>
<a  id="linkForgotPassword" class="linkForgotPassword" _componentType="11" captchamatch="false"  >
Forgot Password

</a>
</div>
<div  id="captchaPnl" class="hide" _componentType="12" >

<div  id="captcha" _componentType="12" >

<img  id="captchaImg" _componentType="8" src="/registration_student/captcha"   />
<div  id="captchaRfrsh" _componentType="12" >

<img  id="Image476" _componentType="8" src="/registration_student/images/pickers/refresh_picker_Normal.png"   />
</div>
</div>
<input  name="captcha" type="text" id="itCaptchaVal" class="rectxt1" _componentType="17" data-contenttype="0"  />
</div>
<div  id="loginBtnPnl" class="loginBtnPnl" _componentType="12" >

<input  value="Log In" type="button" id="submitButton" _componentType="20" src="/registration_student" onclick="submitAction(this)"  style="" />
</div>
<p  id="errorLbl" class="errorField" _componentType="10" align="left"  style="display:none;clear:left;">
null
</p>
<input  value="[B@7a7bc8dd[B@26" type="hidden" id="hiddenSalt" _componentType="17" data-contenttype="0"  />
<input  value="CBCS" name="portalType" type="hidden" id="hi_portalType" _componentType="24"  />
</form>
<div  id="Panel355" _componentType="12" >

<p  id="lblCopyRight" class="lblCopyRight" _componentType="10" >
© <b>LIBSYS Ltd.</b> All rights reserved
</p>
<p  id="lblTrademark" class="lblTrademark" _componentType="10" >
LIBSYS and LSAcademia are registered trademarks of LIBSYS Ltd.
</p>
</div>
<div  id="pnlQRImg" class="pnlQRImg" _componentType="12" >

<p  id="lblScan" class="lblScan lblQRAct" _componentType="10" >
Scan the code for Mobile App
</p>
<img  id="imgMobQR" class="imgMobQR" _componentType="8" src="/registration_student/images/MobileApp.jpeg"   />
<div  id="pnlQR" class="pnlQR" _componentType="12" >

<img  id="imgQR" class="imgQR" _componentType="8" src="/registration_student/images/MobileScanImg.png"   />
<p  id="lblQRAct" class="lblQRAct" _componentType="10" >
Activate App
</p>
</div>
</div>
</div>
<div  id="pnlLogCopyRight" class="pnlLogCopyRight" _componentType="12" >

<img  id="lsAcadImage" class="lsAcadImage" _componentType="8" src="/registration_student/images/lsacademia.png"   />
</div>
<div  id="pnlAppInfo" _componentType="12" >

<a  href="https://play.google.com/store/apps/details?id=com.libsys.LSA_College" target="_blank" id="playstore" _componentType="11"  >


<img  id="playstoreImg" _componentType="8" src="/registration_student/images/playStore.png"   />
</a>
<a  href="https://itunes.apple.com/in/app/lsacademia-college-edition/id1075813490?mt=8" target="_blank" id="appStore" _componentType="11"  >


<img  id="appStoreImg" _componentType="8" src="/registration_student/images/appstore.png"   />
</a>
</div>
</div>
<div  id="forgotPassPanel" class="forgotPassPanel" _componentType="12" >

</div>
<div  id="pageMask" class="pageMask" _componentType="12" >

</div>
</div>
</body>
</html>