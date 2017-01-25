$(".btn").hover(function(){
    $(this).css("opacity", "0.5"); 
    $(this).css("color", "white");
    $(this).find('.lb').css("visibility", "visible");
    ('.lb').css("opacity", "1");
}, function(){
    $(this).css("opacity", "1");
    $(this).css("color", "transparent");
    $('.lb').css("visibility", "hidden");
})

$(".btn").click(function(){
    var btnName = $(this).html();
    alert("Navigate to " + btnName);
})