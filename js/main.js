var Message = Backbone.Model.extend({
  url : function() {
    return this.id ? '/api/mobile/v1/messages/' + this.id + '.json?api_key=1234' : '/api/mobile/v1/messages.json?api_key=1234';
  },
  content: function(){ return this.get('content'); },
});

var Messages = Backbone.Collection.extend({
  model : Message,
  url : "/api/mobile/v1/messages.json?api_key=1234"
});

window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.SplashView = Backbone.View.extend({

    template:_.template($('#splash').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page1View = Backbone.View.extend({

    template:_.template($('#page1').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page2View = Backbone.View.extend({

    template:_.template($('#page2').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "splash":"splash",
        "page1":"page1",
        "page2":"page2"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },
    splash:function () {
        console.log('#splash');
        this.changePage(new SplashView());
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },

    page1:function () {
        console.log('#page1');
        this.changePage(new Page1View());
    },

    page2:function () {
        console.log('#page2');
        this.changePage(new Page2View());
    },

    changePage:function (page) {
        console.log('page object');
        console.log(page);
        if (this.firstPage) {
            splash_page = new SplashView();
            this.firstPage = false;
            $(splash_page.el).attr('data-role', 'page');
            splash_page.render();
            $('body').append($(splash_page.el));
            var transition = $.mobile.defaultPageTransition;
            transition = 'none';
            $.mobile.changePage($(splash_page.el), {changeHash:false, transition: transition});
        }
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        setTimeout(function(){
            $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
        }, 2000);
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});
