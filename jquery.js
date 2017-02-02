
var getPages = function() {
    return Math.ceil(plugin.settings.objElements.length / plugin.settings.elementsPerPage);
};

var displayNav = function() {
    htmlNav = '<div class="paginateNav">';

    if(plugin.settings.firstButton) {
    htmlNav += '<a href="#'+plugin.settings.hashPage+':1" title="First page" rel="1" class="first">'+plugin.settings.firstButtonText+'</a>';
    }

    if(plugin.settings.prevButton) {
    htmlNav += '<a href="" title="Previous" rel="" class="prev">'+plugin.settings.prevButtonText+'</a>';
    }

        for(i = 1;i <= plugin.settings.pages;i++) {
        htmlNav += '<a href="#'+plugin.settings.hashPage+':'+i+'" title="Page '+i+'" rel="'+i+'" class="page">'+i+'</a>';
        };

        if(plugin.settings.nextButton) {
        htmlNav += '<a href="" title="Next" rel="" class="next">'+plugin.settings.nextButtonText+'</a>';
        }

        if(plugin.settings.lastButton) {
        htmlNav += '<a href="#'+plugin.settings.hashPage+':'+plugin.settings.pages+'" title="Last page" rel="'+plugin.settings.pages+'" class="last">'+plugin.settings.lastButtonText+'</a>';
        }

        htmlNav += '</div>';
        plugin.nav = $(htmlNav);
        plugin.nav.css({
            'width': plugin.el.width()
        });
        plugin.el.after(plugin.nav);
        };

var displayPage = function(page, forceEffect) {
    if(plugin.settings.currentPage != page) {
        plugin.settings.currentPage = parseInt(page);
        offsetStart = (page - 1) * plugin.settings.elementsPerPage;
        offsetEnd = page * plugin.settings.elementsPerPage;
        if(typeof(forceEffect) != 'undefined') {
            eval("transition_"+forceEffect+"("+offsetStart+", "+offsetEnd+")");
        }else {
            eval("transition_"+plugin.settings.effect+"("+offsetStart+", "+offsetEnd+")");
            }

        plugin.nav.find('.current').removeClass('current');
        plugin.nav.find('a.page:eq('+(page - 1)+')').addClass('current');
                
    };
           
    displayPage(page, 'default');
};
(jQuery);
