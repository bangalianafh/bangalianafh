// DOM Ready
$(function() {

    var $el, leftPos, newWidth;
        $mainNav2 = $("#main-menu ul");

	$mainNav2.append("<li id='magic-line-two'></li>");
    
    var $magicLineTwo = $("#magic-line-two");
    
    $magicLineTwo
        .width($(".current_page_item").width())
        .height($mainNav2.height())
        .css("left", $(".current_page_item a").position().left)
        .data("origLeft", $(".current_page_item a").position().left)
        .data("origWidth", $magicLineTwo.width());
                
    $("#main-menu ul li a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
		
        $magicLineTwo.stop().animate({
            left: leftPos,
            width: newWidth
        })
    }, function() {
        $magicLineTwo.stop().animate({
            left: $(".current_page_item a").position().left,
            width: $(".current_page_item").width()
        });    
    });
    
    /* Kick IE into gear */
    $(".current_page_item a").mouseenter();    
});