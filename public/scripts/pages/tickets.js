System.import("vue").then(function (Vue) {
    System.import("components/tickets").then(function (TicketsComp) {
           new Vue({
            el: '#app',
               components:{
                   "Tickets":TicketsComp
               }
        })
    })
});