var Vue = require("vue");
var Moment = require("moment");
require("vueResource");
require("directives/time-format.js");
module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["id"],
    data:function () {
        return {
            Users:[],
            Editing :false
        }
    },
    ready:function () {
        this.$http.get('planes').then(function (res) {
            this.Users = res.data
        }, function (err) {
        });
    },
    methods:{
        save: function(i) {
            var user = this.Users[i];
            console.log("users: ",user);
            this.$http.put('users/' + user.id ,user).then(function(req ,res){
                this.user = req.data;
                this.Editing = false
            }, function (err) {
            });
        },
        isEditing:function (add) {
            this.Editing = true;
        }

    }
});