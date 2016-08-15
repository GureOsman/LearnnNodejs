var Vue = require("vue");
var Moment = require("moment");
require("vueResource");
require("directives/time-format.js");
module.exports = Vue.extend({
    template: require("./main.html!text"),
    data:function () {
        return {
            Planes:[],
            Editing :false
        }
    },
    ready:function () {
        this.$http.get('planes').then(function (res) {
            this.Planes = res.data
        }, function (err) {
        });
    },
    methods:{
        save: function(i) {
            var plane = this.Planes[i];
            console.log("passenger: ",plane);
            this.$http.put('planes/' + plane.id ,plane).then(function(req ,res){
                this.plane = req.data;
                this.Editing =false
            }, function (err) {
            });
        },
        isEditing:function (add) {
            this.Editing = true;
        },
        deleted: function(i) {
            var plane = this.Planes[i];
            console.log("passenger: ",plane);
            this.$http.delete('planes/' + plane.id ,plane).then(function(req ,res){
                this.plane = req.data
                this.Editing = false
            }, function (err) {

            });
        }

    }
});