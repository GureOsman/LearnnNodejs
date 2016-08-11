var Vue = require("vue");
var Moment = require("moment");
require("vueResource");
require("directives/time-format.js");
module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["id"],
    data:function () {
        return {
            Passengers:[],
            Editing :false
        }
    },
    ready:function () {
        this.$http.get('passengers').then(function (res) {
            this.Passengers = res.data
        }, function (err) {
        });
    },
    methods:{
        save: function(i) {
            var passenger = this.Passengers[i];
            console.log("passenger: ",passenger);
            this.$http.put('passengers/' + passenger.id ,passenger).then(function(req ,res){
                this.passenger = req.data
            }, function (err) {
            });
        },
        isEditing:function (add) {
            this.Editing = true;
        },
        deleted: function(i) {
            var passenger = this.Passengers[i];
            console.log("passenger: ",passenger);
            this.$http.delete('passengers/' + passenger.id ,passenger).then(function(req ,res){
                this.passenger = req.data;
                this.Editing = false;
            }, function (err) {
            });
        }

    }
});