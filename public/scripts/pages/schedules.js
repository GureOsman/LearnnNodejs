System.import("vue").then(function (Vue) {
    System.import("components/schedules").then(function (Schedule) {
           new Vue({
            el: '#app',
               components:{
                   "Schedules":Schedule
               }
        })
    })
});