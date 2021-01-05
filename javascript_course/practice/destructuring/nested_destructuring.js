var App = {
    model: {
        User: function(){  }
    }
};
// instead of:
// var User = App.model.User;
 var { model: { User } } = App;