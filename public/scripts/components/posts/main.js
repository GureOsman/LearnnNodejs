var Vue = require("vue");
var Moment = require("moment");
require("vueResource");
require("directives/time-format.js");
module.exports = Vue.extend({
    template: require("./main.html!text"),
    data:function () {
        return {
            Posts:[]
        }
    },
    ready:function () {
        this.$http.get('posts/summary').then(function (res) {
            this.Posts = res.data
        }, function (err) {
            
        });

    }



});
