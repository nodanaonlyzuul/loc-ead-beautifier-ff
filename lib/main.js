var buttons = require('sdk/ui/button/action');
var pageMod = require("sdk/page-mod");
var data    = require("sdk/self").data;

var button = buttons.ActionButton({
  id: "loc-ead-beautifier",
  label: "Loc EAD Beautifier",
  icon: {
    "16":   "./images/icon16.png",
    "48":   "./images/icon48.png",
    "128":  "./images/icon128.png"
  }
});

pageMod.PageMod({
  include: [
    "http://www.loc.gov/ead/tglib/elements/*",
    "http://loc.gov/ead/tglib/elements/*",
    "https://www.loc.gov/ead/tglib/elements/*",
    "https://loc.gov/ead/tglib/elements/*"],
  contentScriptFile: [
    data.url("javascript/jquery-2.1.3.min.js"),
    data.url("javascript/jquery-ext.js"),
    data.url("javascript/highlight-8-4.min.js"),
    data.url("javascript/background.js")],
    contentStyleFile: [data.url("stylesheets/railscasts.css")]
});