const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require('../models/users');
const _ = require('lodash');
const {sendEmail} = require('../helpers');

getReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    for( let i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

exports.signup = async (req,res)=>{
    const userExist = await  User.findOne({email:req.body.email});
    if (userExist) return res.status(400).json({errors:"user already exist"});
    const user = await new User (req.body);
    //const user = new User(req.body);
    await user.save((err,user)=>{
        if(err || !user){return res.status(401).json({error:"registration fail, Please try again"})}
        console.log(JSON.stringify(user))
        const confirmdata = {
            from: "noreply@imcatholic.org",
            to:user.email,
            subject: "Account activation",
            html: `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta http-equiv="x-ua-compatible" content="ie=edge">
              <title>Password Reset</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style type="text/css">
              /**
               * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
               */
              @media screen {
                @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }
            
                @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
              }
            
              /**
               * Avoid browser level font resizing.
               * 1. Windows Mobile
               * 2. iOS / OSX
               */
              body,
              table,
              td,
              a {
                -ms-text-size-adjust: 100%; /* 1 */
                -webkit-text-size-adjust: 100%; /* 2 */
              }
        
              table,
              td {
                mso-table-rspace: 0pt;
                mso-table-lspace: 0pt;
              }
            
              /**
               * Better fluid images in Internet Explorer.
               */
              img {
                -ms-interpolation-mode: bicubic;
              }
            
              /**
               * Remove blue links for iOS devices.
               */
              a[x-apple-data-detectors] {
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                color: inherit !important;
                text-decoration: none !important;
              }
            
              /**
               * Fix centering issues in Android 4.4.
               */
              div[style*="margin: 16px 0;"] {
                margin: 0 !important;
              }
            
              body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
              }
            
              /**
               * Collapse table borders to avoid space between cells.
               */
              table {
                border-collapse: collapse !important;
              }
            
              a {
                color: #1a82e2;
              }
            
              img {
                height: auto;
                line-height: 100%;
                text-decoration: none;
                border: 0;
                outline: none;
              }
              </style>
            
            </head>
            <body style="background-color: #e9ecef;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
            
                <!-- start logo -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="center" valign="top" style="padding: 36px 24px;">
                          <a href="/" target="_blank" style="display: inline-block;">
                            <img src="./img/paste-logo-light@2x.png" alt="I am a Catholic" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                          </a>
                        </td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end logo -->
            
                <!-- start hero -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Activate your Account</h1>
                        </td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end hero -->
            
                <!-- start copy block -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            
                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">your activation code is ${user.activationCode} </p>
                          <p style="margin: 0;"> Or Tap the button below to activate your account. </p>
                        </td>
                      </tr>
                      <!-- end copy -->
            
                      <!-- start button -->
                      <tr>
                        <td align="left" bgcolor="#ffffff">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                      <a href=https://social-app-theta.now.sh/user/activate/${user.activationCode} target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Activate your acoount</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- end button -->
            
                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                          <p style="margin: 0;"><a href=https://social-app-theta.now.sh/user/activate/${user.activationCode}</a></p>
                        </td>
                      </tr>
                      <!-- end copy -->
            
                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                          <p style="margin: 0;">Cheers,<br> Paste</p>
                        </td>
                      </tr>
                      <!-- end copy -->
            
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end copy block -->
            
                <!-- start footer -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            
                      <!-- start permission -->
                      <tr>
                        <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                          <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
                        </td>
                      </tr>
                      <!-- end permission -->
            
                      <!-- start unsubscribe -->
                      <tr>
                        <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                          <p style="margin: 0;">Lekki Phase one, <br /> Lagos, Nigeria.</p>
                        </td>
                      </tr>
                      <!-- end unsubscribe -->
            
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end footer -->
            
              </table>
              <!-- end body -->
            
            </body>
            </html>`
        };
        sendEmail(confirmdata);
        return res.status(200).json({
            messages: `Dear ${user.firstName}, your registration is successful, \n Please check your mail for activation code`
        });
    })
    //await user.save();
    //res.status(200).json({messages:'account successfully created'});
};

exports.activation=(req,res)=>{
  //return res.status(400).json({ error: "Please, enter activation code" });
  if (!req.body) return res.status(400).json({ error: "Please, enter activation code" });
  const {activationCode}=req.body;
  console.log(activationCode)
  User.findOne({activationCode}, (err, user)=>{
    if(err || !user) return res.status(400).json({ error: "invalid activation code !! \n Please conatct support team if your account not yet activated" });
    const updatedFields = {activationCode:'', activated:true};
    user = _.extend(user, updatedFields);
    user.updated = Date.now();
    user.save((err, user) => {
      console.log(JSON.stringify(user));
      if (err || !user) return res.status(400).json({error: err});
      const emailData = {
          from: "noreply@imcatholic.org",
          to: user.email,
          subject: "Welcome to The word of Christ, I am Catholic",
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          
          <head>
              <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
              <meta name="viewport" content="width=device-width">
              <!--[if !mso]><!-->
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <!--<![endif]-->
              <title></title>
              <!--[if !mso]><!-->
              <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css">
              <link href="https://fonts.googleapis.com/css?family=Kaushan+Script&amp;display=swap" rel="stylesheet" type="text/css">
              <link href="&lt;link href=&quot;https://fonts.googleapis.com/css?family=Lobster&amp;display=swap&quot; rel=&quot;stylesheet&quot;&gt;" rel="stylesheet" type="text/css">
              <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css">
              <link href="https://fonts.googleapis.com/css?family=Shrikhand" rel="stylesheet" type="text/css">
              <link href="https://fonts.googleapis.com/css?family=Shrikhand" rel="stylesheet" type="text/css">
              <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" type="text/css">
              <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">
              <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css">
              <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">
              <!--<![endif]-->
              <style type="text/css">
                  body {
                      margin: 0;
                      padding: 0;
                  }
          
                  table,
                  td,
                  tr {
                      vertical-align: top;
                      border-collapse: collapse;
                  }
          
                  * {
                      line-height: inherit;
                  }
          
                  a[x-apple-data-detectors=true] {
                      color: inherit !important;
                      text-decoration: none !important;
                  }
              </style>
              <style type="text/css" id="media-query">
                  @media (max-width: 670px) {
          
                      .block-grid,
                      .col {
                          min-width: 320px !important;
                          max-width: 100% !important;
                          display: block !important;
                      }
          
                      .block-grid {
                          width: 100% !important;
                      }
          
                      .col {
                          width: 100% !important;
                      }
          
                      .col>div {
                          margin: 0 auto;
                      }
          
                      img.fullwidth,
                      img.fullwidthOnMobile {
                          max-width: 100% !important;
                      }
          
                      .no-stack .col {
                          min-width: 0 !important;
                          display: table-cell !important;
                      }
          
                      .no-stack.two-up .col {
                          width: 50% !important;
                      }
          
                      .no-stack .col.num4 {
                          width: 33% !important;
                      }
          
                      .no-stack .col.num8 {
                          width: 66% !important;
                      }
          
                      .no-stack .col.num4 {
                          width: 33% !important;
                      }
          
                      .no-stack .col.num3 {
                          width: 25% !important;
                      }
          
                      .no-stack .col.num6 {
                          width: 50% !important;
                      }
          
                      .no-stack .col.num9 {
                          width: 75% !important;
                      }
          
                      .video-block {
                          max-width: none !important;
                      }
          
                      .mobile_hide {
                          min-height: 0px;
                          max-height: 0px;
                          max-width: 0px;
                          display: none;
                          overflow: hidden;
                          font-size: 0px;
                      }
          
                      .desktop_hide {
                          display: block !important;
                          max-height: none !important;
                      }
                  }
              </style>
          </head>
          
          <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #232323;">
              <!--[if IE]><div class="ie-browser"><![endif]-->
              <table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #232323; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#232323" valign="top">
                  <tbody>
                      <tr style="vertical-align: top;" valign="top">
                          <td style="word-break: break-word; vertical-align: top;" valign="top">
                              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#232323"><![endif]-->
                              <div style="background-color:transparent;">
                                  <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #c00405;">
                                      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#c00405;background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/header-top.png');background-position:center top;background-repeat:no-repeat">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#c00405"><![endif]-->
                                          <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#c00405;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:50px; padding-bottom:0px;"><![endif]-->
                                          <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:50px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 50px; padding-bottom: 0px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:50px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;"><strong><span style="color: #ffffff; font-size: 16px;">It is our time to cheer together </span></strong></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 5px; padding-bottom: 5px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:5px;padding-right:0px;padding-bottom:5px;padding-left:0px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 72px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 86px; margin: 0;"><span style="font-size: 72px;"><strong><span style="color: #ffffff;">I am Catholic<br></span></strong></span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 5px; padding-bottom: 5px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:5px;padding-right:0px;padding-bottom:5px;padding-left:0px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 72px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 86px; margin: 0;"><span style="font-size: 72px;"><strong><span style="color: #ffffff;"><em>Social page</em><br></span></strong></span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;"><span style="color: #ffffff;">Welcome to house of Catholics all over the world <br></span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <div class="button-container" align="center" style="padding-top:10px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://catholic.now.sh/" style="height:31.5pt; width:139.5pt; v-text-anchor:middle;" arcsize="60%" stroke="false" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#c00405; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><a href="https://catholic.now.sh/" target="_blank" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #c00405; background-color: #ffffff; border-radius: 25px; -webkit-border-radius: 25px; -moz-border-radius: 25px; width: auto; width: auto; border-top: 1px solid #ffffff; border-right: 1px solid #ffffff; border-bottom: 1px solid #ffffff; border-left: 1px solid #ffffff; padding-top: 5px; padding-bottom: 5px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>Sign In now  !!</strong></span></span></a>
                                                          <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                                      </div>
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/content-top.png" alt="Image" title="Image" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 650px; display: block;" width="650">
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                      </div>
                                  </div>
                              </div>
                              <div style="background-color:transparent;">
                                  <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                                      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/section-middle-background.png');background-position:center top;background-repeat:no-repeat">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                          <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#ffffff;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                          <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
                                                      <!--<![endif]-->
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 10px; padding-bottom: 0px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 50px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 60px; margin: 0;"><span style="font-size: 50px; color: #fc0306;"><strong>We love you<br></strong></span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 5px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:5px;padding-right:0px;padding-bottom:10px;padding-left:0px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 18px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 22px; margin: 0;"><span style="font-size: 18px; color: #000000;">Join our daily devotion at Sebstain Sanni <br></span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <div class="button-container" align="center" style="padding-top:5px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 5px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="sebastiansanni.org" style="height:31.5pt; width:127.5pt; v-text-anchor:middle;" arcsize="60%" stroke="false" fillcolor="#fc0306"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><a href="sebastiansanni.org" target="_blank" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #fc0306; border-radius: 25px; -webkit-border-radius: 25px; -moz-border-radius: 25px; width: auto; width: auto; border-top: 1px solid #fc0306; border-right: 1px solid #fc0306; border-bottom: 1px solid #fc0306; border-left: 1px solid #fc0306; padding-top: 5px; padding-bottom: 5px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Join  now !!!</span></span></a>
                                                          <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                      </div>
                                  </div>
                              </div>
                              <div style="background-color:transparent;">
                                  <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #c00405;">
                                      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#c00405;background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/snow-background.png');background-position:top left;background-repeat:no-repeat">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#c00405"><![endif]-->
                                          <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#c00405;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                          <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/content-bottom.png" alt="Image" title="Image" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 650px; display: block;" width="650">
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 24px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 29px; margin: 0;"><span style="font-size: 24px;"><strong><span style="color: #ffffff;">Our Mission<br></span></strong></span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                      </div>
                                  </div>
                              </div>
                              <div style="background-color:transparent;">
                                  <div class="block-grid three-up" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #c00405;">
                                      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#c00405;background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/snow-background.png');background-position:top left;background-repeat:no-repeat">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#c00405"><![endif]-->
                                          <!--[if (mso)|(IE)]><td align="center" width="216" style="background-color:#c00405;width:216px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                          <div class="col num4" style="max-width: 320px; min-width: 216px; display: table-cell; vertical-align: top; width: 216px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div></div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td><td align="center" width="216" style="background-color:#c00405;width:216px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                          <div class="col num4" style="max-width: 320px; min-width: 216px; display: table-cell; vertical-align: top; width: 216px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div></div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td><td align="center" width="216" style="background-color:#c00405;width:216px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                          <div class="col num4" style="max-width: 320px; min-width: 216px; display: table-cell; vertical-align: top; width: 216px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div></div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                      </div>
                                  </div>
                              </div>
                              <div style="background-color:transparent;">
                                  <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #c00405;">
                                      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#c00405;background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/snow-background.png');background-position:top left;background-repeat:no-repeat">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#c00405"><![endif]-->
                                          <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#c00405;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                          <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/content-top.png" alt="Image" title="Image" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 650px; display: block;" width="650">
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                      </div>
                                  </div>
                              </div>
                              <div style="background-color:transparent;">
                                  <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                                      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/section-middle-background.png');background-position:center top;background-repeat:no-repeat">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                          <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#ffffff;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                          <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 10px; padding-bottom: 0px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 42px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 50px; margin: 0;"><span style="font-size: 42px; color: #fc0306;"><strong>About I am Catholic<br></strong></span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 5px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:5px;padding-right:0px;padding-bottom:10px;padding-left:0px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 18px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 22px; margin: 0;"><span style="font-size: 18px; color: #000000;">&nbsp;</span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <div class="button-container" align="center" style="padding-top:5px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 5px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://catholic.now.sh/" style="height:31.5pt; width:141.75pt; v-text-anchor:middle;" arcsize="60%" stroke="false" fillcolor="#fc0306"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><a href="https://catholic.now.sh/" target="_blank" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #fc0306; border-radius: 25px; -webkit-border-radius: 25px; -moz-border-radius: 25px; width: auto; width: auto; border-top: 1px solid #fc0306; border-right: 1px solid #fc0306; border-bottom: 1px solid #fc0306; border-left: 1px solid #fc0306; padding-top: 5px; padding-bottom: 5px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Learn  more ...</span></span></a>
                                                          <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                      </div>
                                  </div>
                              </div>
                              <div style="background-color:transparent;">
                                  <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #c00405;">
                                      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#c00405;background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/snow-background.png');background-position:top left;background-repeat:no-repeat">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#c00405"><![endif]-->
                                          <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#c00405;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                          <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/content-bottom.png" alt="Image" title="Image" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 650px; display: block;" width="650">
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/Merry_Christmas.png" alt="Image" title="Image" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 214px; display: block;" width="214">
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/content-top.png" alt="Image" title="Image" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 650px; display: block;" width="650">
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                      </div>
                                  </div>
                              </div>
                              <div style="background-color:transparent;">
                                  <div class="block-grid four-up" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                                      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                          <!--[if (mso)|(IE)]><td align="center" width="162" style="background-color:#ffffff;width:162px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                          <div class="col num3" style="max-width: 320px; min-width: 162px; display: table-cell; vertical-align: top; width: 162px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                          <div style="font-size:1px;line-height:10px">&nbsp;</div><a href="http://www.example.com/" target="_blank" style="outline:none" tabindex="-1"> <img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/Facebook.png" alt="Facebook" title="Facebook" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; width: 100%; max-width: 11px; display: block;" width="11"></a>
                                                          <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td><td align="center" width="162" style="background-color:#ffffff;width:162px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                          <div class="col num3" style="max-width: 320px; min-width: 162px; display: table-cell; vertical-align: top; width: 162px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                          <div style="font-size:1px;line-height:10px">&nbsp;</div><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/Twitter.png" alt="Twitter" title="Twitter" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 19px; display: block;" width="19">
                                                          <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td><td align="center" width="162" style="background-color:#ffffff;width:162px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                          <div class="col num3" style="max-width: 320px; min-width: 162px; display: table-cell; vertical-align: top; width: 162px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                          <div style="font-size:1px;line-height:10px">&nbsp;</div><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/Instagram.png" alt="Instagram" title="Instagram" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 18px; display: block;" width="18">
                                                          <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td><td align="center" width="162" style="background-color:#ffffff;width:162px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                          <div class="col num3" style="max-width: 320px; min-width: 162px; display: table-cell; vertical-align: top; width: 162px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                          <div style="font-size:1px;line-height:10px">&nbsp;</div><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/721/YouTube.png" alt="YouTube" title="YouTube" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 21px; display: block;" width="21">
                                                          <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </div>
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                      </div>
                                  </div>
                              </div>
                              <div style="background-color:transparent;">
                                  <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #6d0001;">
                                      <div style="border-collapse: collapse;display: table;width: 100%;background-color:#6d0001;">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#6d0001"><![endif]-->
                                          <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#6d0001;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                          <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                              <div style="width:100% !important;">
                                                  <!--[if (!mso)&(!IE)]><!-->
                                                  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                      <!--<![endif]-->
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px;">
                                                          <div style="font-size: 14px; line-height: 2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 28px;">
                                                              <p style="font-size: 12px; line-height: 2; word-break: break-word; text-align: center; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 12px; color: #bfa3a4;">Copyright © 2020 I am Catholic, All rights reserved,<br>Lagos, Nigeria States <br>+23480| info@iamcatholic.org</span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                                                          <tbody>
                                                              <tr style="vertical-align: top;" valign="top">
                                                                  <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                                                                      <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #7C1A1B; height: 1px; width: 100%;" align="center" role="presentation" height="1" valign="top">
                                                                          <tbody>
                                                                              <tr style="vertical-align: top;" valign="top">
                                                                                  <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" height="1" valign="top"><span></span></td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                                                      <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                          <div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 17px;">
                                                              <p style="font-size: 12px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 14px; margin: 0;"><span style="font-size: 12px; color: #bfa3a4;">Don’t want to receive emails from us? <a style="text-decoration: underline; color: #bfa3a4;" href="http://www.example.com/" target="_blank" rel="noopener">Unsubscribe</a></span></p>
                                                          </div>
                                                      </div>
                                                      <!--[if mso]></td></tr></table><![endif]-->
                                                      <!--[if (!mso)&(!IE)]><!-->
                                                  </div>
                                                  <!--<![endif]-->
                                              </div>
                                          </div>
                                          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                      </div>
                                  </div>
                              </div>
                              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                          </td>
                      </tr>
                  </tbody>
              </table>
              <!--[if (IE)]></div><![endif]-->
          </body>
          
          </html>`
      };
      sendEmail(emailData);
      return res.status(200).json({
          messages: `Dear ${user.firstName}, you are welcome, \n your account is successfully activated`
      });
    });
  })
};

exports.signin=(req,res)=>{
    //find the user by mail
    const {email,password}=req.body;
    User.findOne({email},(err,user)=>{
        if (err || !user){return res.status(401).json({error:"email doesn't exist, please SignUp"})}
        if (user.activated !== true){
          return res.status(401).json({error:"your account is not yet activated,\n please check your mail and activate \n if you needs support contact support@iamcatholic.net"})
        }
        if (!user.authenticate(password)){
            return res.status(401).json({error:"email and password not match"})
        }
        //generate token
        const token = jwt.sign(
            { _id : user._id},
            process.env.JWT_SECRET
            );
        //set token to the cookies
        res.cookie("t",token,{expre:new Date()+60})
        //send token and user details to the clint
        const {_id,email,firstName, lastName,city, country}= user;
        return res.status(200).json({token,user:{_id,email,firstName,lastName,city,country}})
    })
};

exports.signout=(req,res)=>{
    res.clearCookie("t");
    return res.json({message:"Sign out successfully"});
};

exports.requireSign = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.forgotPassword = (req, res) => {
    if (!req.body) return res.status(400).json({ error: "No request body" });
    if (!req.body.email) return res.status(400).json({ error: "No Email in request body" });
   // console.log("forgot password finding user with that email");
    const { email } = req.body;
    //console.log("signin req.body", email);
    // find the user based on email
    User.findOne({email}, (err, user) => {
        //console.log(JSON.stringify(user))
        // if err or no user
        if (err || !user) return res.status("401").json({error: "User with that email does not exist!, you can signup for a new account"});
        // generate a token with user id and secret
        const token = jwt.sign(
            { _id: user._id, iss: "NODEAPI" },
            process.env.JWT_SECRET
        );

        // email data
        const emailData = {
            from: "noreply@imcatholic.org",
            to: email,
            subject: "Instructions to Reset Password",
            html: `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta http-equiv="x-ua-compatible" content="ie=edge">
              <title>Password Reset</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style type="text/css">
              /**
               * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
               */
              @media screen {
                @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }
            
                @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
              }
            
              /**
               * Avoid browser level font resizing.
               * 1. Windows Mobile
               * 2. iOS / OSX
               */
              body,
              table,
              td,
              a {
                -ms-text-size-adjust: 100%; /* 1 */
                -webkit-text-size-adjust: 100%; /* 2 */
              }
        
              table,
              td {
                mso-table-rspace: 0pt;
                mso-table-lspace: 0pt;
              }
            
              /**
               * Better fluid images in Internet Explorer.
               */
              img {
                -ms-interpolation-mode: bicubic;
              }
            
              /**
               * Remove blue links for iOS devices.
               */
              a[x-apple-data-detectors] {
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                color: inherit !important;
                text-decoration: none !important;
              }
            
              /**
               * Fix centering issues in Android 4.4.
               */
              div[style*="margin: 16px 0;"] {
                margin: 0 !important;
              }
            
              body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
              }
            
              /**
               * Collapse table borders to avoid space between cells.
               */
              table {
                border-collapse: collapse !important;
              }
            
              a {
                color: #1a82e2;
              }
            
              img {
                height: auto;
                line-height: 100%;
                text-decoration: none;
                border: 0;
                outline: none;
              }
              </style>
            
            </head>
            <body style="background-color: #e9ecef;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
            
                <!-- start logo -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="center" valign="top" style="padding: 36px 24px;">
                          <a href="/" target="_blank" style="display: inline-block;">
                            <img src="./img/paste-logo-light@2x.png" alt="I am a Catholic" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                          </a>
                        </td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end logo -->
            
                <!-- start hero -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Your Password</h1>
                        </td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end hero -->
            
                <!-- start copy block -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            
                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">Tap the button below to reset your account password. If you didn't request a new password, you can safely delete this email.</p>
                        </td>
                      </tr>
                      <!-- end copy -->
            
                      <!-- start button -->
                      <tr>
                        <td align="left" bgcolor="#ffffff">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                      <a href=https://socail-media.abduljeleelng.now.sh/user/reset-password/${token} target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset Password</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- end button -->
            
                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                          <p style="margin: 0;"><a href=https://socail-media.abduljeleelng.now.sh/user/reset-password/${token} target="_blank">https://socail-media.abduljeleelng.now.sh/user/reset-password/${token}</a></p>
                        </td>
                      </tr>
                      <!-- end copy -->
            
                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                          <p style="margin: 0;">Cheers,<br> Paste</p>
                        </td>
                      </tr>
                      <!-- end copy -->
            
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end copy block -->
            
                <!-- start footer -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            
                      <!-- start permission -->
                      <tr>
                        <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                          <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
                        </td>
                      </tr>
                      <!-- end permission -->
            
                      <!-- start unsubscribe -->
                      <tr>
                        <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                          <p style="margin: 0;">Lekki Phase one, <br /> Lagos, Nigeria.</p>
                        </td>
                      </tr>
                      <!-- end unsubscribe -->
            
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end footer -->
            
              </table>
              <!-- end body -->
            
            </body>
            </html>`
        };
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ error: err });
            } else {
                sendEmail(emailData);
                return res.status(200).json({
                    message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
                });
            }
        });
    });
};

// to allow user to reset password
// first you will find the user in the database with user's resetPasswordLink
// user model's resetPasswordLink's value must match the token
// if the user's resetPasswordLink(token) matches the incoming req.body.resetPasswordLink(token)
// then we got the right user

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, password2 } = req.body;

    User.findOne({ resetPasswordLink }, (err, user) => {
        // if err or no user
        if (err || !user) return res.status("401").json({error: "Invalid Link!"});
        const updatedFields = {
          password: password2,
          resetPasswordLink: ""
        };

        user = _.extend(user, updatedFields);
        user.updated = Date.now();

        user.save((err, result) => {
            console.log(JSON.stringify(result));
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: `Great! Now you can login with your new password.`
            });
        });
    });
};