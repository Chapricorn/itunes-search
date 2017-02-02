
var getPages = function() {
    return Math.ceil(plugin.settings.objElements.length / plugin.settings.elementsPerPage);
};


var displayPage = function(page, effect) {
    if(plugin.settings.currentPage != page) {
        plugin.settings.currentPage = parseInt(page);
        offsetStart = (page - 1) * plugin.settings.elementsPerPage;
        offsetEnd = page * plugin.settings.elementsPerPage;
        if(typeof(effect) != 'undefined') {
            eval("transition_"+effect+"("+offsetStart+", "+offsetEnd+")");
        }else {
            eval("transition_"+plugin.settings.effect+"("+offsetStart+", "+offsetEnd+")");
            }

        plugin.nav.find('.current').removeClass('current');
        plugin.nav.find('a.page:eq('+(page - 1)+')').addClass('current');
                
    };
           
    displayPage(page, 'default');
};
(jQuery);
