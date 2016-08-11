var Vue = require("vue");
var Moment = require("moment");
require("vueResource");
require("directives/time-format.js");
module.exports = Vue.extend({
    template: require("./main.html!text"),
    data:function () {
        return {
            post:{id:0, user:{}}
        }
    },
    ready:function () {
        console.log(this.id);
        var path = location.pathname.split("/");
        this.$http.get('posts/' + path[path.length-1]).then(function (res) {
            this.$set("post", res.data);
            this.post.id = res.data.id
        }, function (err) {
        });
    },
    components:{
        "comments": require("components/comments"),
        "likes": require("components/likes")
    }
});
