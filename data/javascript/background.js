var mayContainHeader      = $("h3:contains('May contain:')").first();
var mayOccurWithinHeader  = $("h3:contains('May occur within:')").first();
var siblingContainers     = $.merge(mayContainHeader.next('p'), mayOccurWithinHeader.next('p'));
var exampleHeader         = $("h3:contains('Example:'), h3:contains('Examples:')").first();
var attributesTable       = $("h3:contains('Attributes:')").siblings('table');
var nonLinkables          = ["#PCDATA", "EMPTY"];
var emptyString           = "";
var nbsp                  = "&nbsp;"

// Remove noise
$('h2:contains(EAD Elements)').remove();
$('h3:contains(Description:)').remove();
$('h1').remove();
$('h2').changeElementType("h1");

// Restyle
$('h3').css("background", "none").css("font-size", "1.25em").css("color", "#333");

// Make element names linkable
siblingContainers.each(function(i, paragraph){
  var paragraph   = $(paragraph);
  var childTerms  = paragraph.text().split(',');
  var linksToTerm = [];

  $.each(childTerms, function(index, childTerm) {
    var childTerm = $.trim(childTerm);

    if (nonLinkables.indexOf(childTerm) == -1 ) {
      var anchorNode = $("<a>", {href: "http://loc.gov/ead/tglib/elements/"+childTerm+".html", text: childTerm} );
      linksToTerm.push(anchorNode);
    }  else {
      var spanNode = $("<span>", {text: childTerm});
      linksToTerm.push(spanNode);
    }
    linksToTerm.push(nbsp);
  });

  paragraph.html(emptyString).append(linksToTerm);
});

// Code highlighting of examples
if (exampleHeader.length > 0) {
  var usageBlock = exampleHeader.siblings("pre");
  if (usageBlock.length > 0) {
    var exampleText = usageBlock.html();
    var codeElement = $("<code>");
    usageBlock.html(emptyString);

    usageBlock.append(codeElement);
    codeElement.addClass("xml").css("font-size", "1.5em");
    codeElement.append(exampleText);
    hljs.highlightBlock(codeElement[0]);
  }
}

if (attributesTable.length > 0) {
  attributesTable.attr("width", "98%").attr("border", "1")
}