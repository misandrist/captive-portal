//Desired dom element
var previewBody = $('body').minimap();

var Minimap = $( "#minimap" ).minimap( previewBody );

// 'element' is desired dom element 
var minimap = new MiniMap(
    previewBody, 
    {
    top: 0.035, 
    height:0.5, 
    allowClick:false, 
    fadeHover:true,
    hoverOpacity:0.7, 
    hoverFadeSpeed:0.4, 
    touch: true, 
    disableFind:true,
    position:'right',
    smoothScroll:true,
    smoothScrollDelay: 400,
    animation:true,
    onPreviewChange: function(minimap, scale){
        minimap.previewBody.setSmoothScrollDelay(400);
        minimap.scale = 0.6;
}
});
minimap.show();

