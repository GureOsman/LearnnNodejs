var Vue = require("vue");
var Moment = require("moment");
require("vueResource");
require("directives/time-format.js");
module.exports = Vue.extend({
    template: require("./main.html!text"),
    data:function () {
        return {
            Tickets:[],
            Editing :false
        }
    },
    ready:function () {
        this.$http.get('tickets').then(function (res) {
            this.Tickets = res.data
        }, function (err) {
        });
    },
    methods:{
        save: function(i) {
            var Ticket = this.Tickets[i];
            console.log("Ticket: ",Ticket);
            this.$http.put('tickets/' + Ticket.id ,Ticket).then(function(req ,res){
                this.Ticket = req.data
            }, function (err) {
            });
        },
        isEditing:function (add) {
            this.Editing = true;
        },
        deleted: function(i) {
            var Ticket = this.Tickets[i];
            console.log("schedule: ",Ticket);
            this.$http.delete('tickets/' + Ticket.id ,Ticket).then(function(req ,res){
                this.Ticket = req.data
            }, function (err) {
            });
        }
    }
});