var Vue = require("vue");
var Moment = require("moment");
require("vueResource");
require("directives/time-format.js");
module.exports = Vue.extend({
    template: require("./main.html!text"),
    data:function () {
        return {
            Schedules:[],
            Editing :false
        }
    },
    ready:function () {
        this.$http.get('schedules').then(function (res) {
            this.Schedules = res.data
        }, function (err) {
        });
    },
    methods:{
        save: function(i) {
            var schedule = this.Schedules[i];
            console.log("passenger: ",schedule);
            this.$http.put('schedules/' + schedule.id ,schedule).then(function(req ,res){
                this.schedule = req.data
            }, function (err) {
            });
        },
        isEditing:function (add) {
            this.Editing = true;
        },
        deleted: function(i) {
            var schedule = this.Schedules[i];
            console.log("schedule: ",schedule);
            this.$http.delete('schedules/' + schedule.id ,schedule).then(function(req ,res){
                this.schedule = req.data
            }, function (err) {
            });
        }

    }
    
    
});