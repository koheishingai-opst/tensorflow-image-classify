/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/
'use strict';

;
(function($, window, document, undefined) {
    $('.inputfile').each(function() {
        var $input = $(this),
            $label = $input.next('label'),
            labelVal = $label.html();

        $input.on('change', function(e) {
            var fileName = '';

            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else if (e.target.value)
                fileName = e.target.value.split('\\').pop();

            if (fileName)
                $label.find('span').html(fileName);
            else
                $label.html(labelVal);

            if (fileName.indexOf("jpg") !== -1 || fileName.indexOf("jpeg") !== -1) {
                var fd = new FormData($("#img")[0]);
                console.log(fd);
                $(".keyword > p").html("");
                $(".keyword > img").attr("src", "");
                $(".keyword > .loading").fadeIn();
                $(".box.tag").hide();
                $(".box.keyword").fadeIn();
                $(".box.register").hide();
                $(".box.comment").hide();
                $.ajax({
                        url: "/photos/upload",
                        type: "POST",
                        data: fd,
                        processData: false,
                        contentType: false
                    })
                    .done(function(data) {
                        var output = data.split(")").join(")<br />");
                        $(".keyword > .loading").hide();
                        // $(".keyword > img").attr("src", "http://104.155.201.35:3000/uploads/" +  fileName);
                        window.fileName = fileName;
                        $(".keyword > img").attr("src", "http://localhost:3000/uploads/" + fileName);
                        $(".keyword > p").html(output);
                        $(".box.tag").fadeIn();
                        $(".box.keyword").fadeIn();
                        $(".box.register").fadeIn();
                        $(".box.comment").fadeIn();
                    });
            } else {
                alert("アップロード可能なファイル形式：jpeg");
                $label.html(labelVal);
            }
        });

        // Firefox bug fix
        $input
            .on('focus', function() {
                $input.addClass('has-focus');
            })
            .on('blur', function() {
                $input.removeClass('has-focus');
            });
    });
})(jQuery, window, document);