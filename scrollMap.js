//Desired dom element
var previewBody = $('#top').minimap();

// 'element' is desired dom element 
var minimap = new MiniMap(previewBody, {height:0.7, 
    allowClick:false, 
    fadeHover:true,
    hoverOpacity:0.7, 
    hoverFadeSpeed:0.4, 
    touch:true, 
    disableFind:true,
    position:'right',
    smoothScroll:true,
    smoothScrollDelay: 400,
    onPreviewChange: function(minimap, scale){

}
});
minimap.show();

