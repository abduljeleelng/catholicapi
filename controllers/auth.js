const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require('../models/users');
const {sendEmail} = require('../helpers');

exports.signup = async (req,res)=>{
    const userExist = await  User.findOne({email:req.body.email});
    if (userExist) return res.status(400).json({error:"user already exist"});
    const user = await new User (req.body);
    //const user = new User(req.body);
    await user.save((err,user)=>{
        if(err || !user){return res.status(401).json({error:"registration fail, Please try again"})}
        //res.json(user);
        const emailData = {
            from: "noreply@imcatholic.org",
            to: "abduljeleelng@gmail.com",
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
                                                                <p style="font-size: 12px; line-height: 2; word-break: break-word; text-align: center; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 12px; color: #bfa3a4;">Copyright © 2020 I am Catholic, All rights reserved,<br>Washington, DC 20500,Lagos, Nigeria States <br>+23480| info@iamcatholic.org</span></p>
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
            messages: `Dear ${user.firstName}, your registration succeful, you can check your mail for more details`
        });
    })
    //await user.save();
    //res.status(200).json({messages:'account successfully created'});
};

exports.signin=(req,res)=>{
    //find the user by mail
    const {email,password}=req.body;
    User.findOne({email},(err,user)=>{
        if (err || !user){
            return res.status(401).json({error:"email doesn't exist, please SignUp"})
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
        const {_id,email,name}= user;
        return res.status(200).json({token,user:{_id,name,email}})
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