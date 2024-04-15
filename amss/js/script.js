function writeHeader(rootDir){
  $.ajax({
        url: "/amss/js/header.html",
        cache: false,
        async: false,
        success: function(html){

            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        }
    });
}

function writeFooter(rootDir){
  $.ajax({
        url: "/amss/js/footer.html",
        cache: false,
        async: false,
        success: function(html){

            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        }
    });
}


var url = window.location.href;


var paramsToRemove = ['domain=f5si'];

paramsToRemove.forEach(function(param) {
    var regex = new RegExp('[?&]' + param + '=([^&]+)');
    url = url.replace(regex, '');
});


url = url.replace(/[&?]+/, '');

window.location.href = url;
