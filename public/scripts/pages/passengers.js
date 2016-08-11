System.import("vue").then(function (Vue) {
    System.import("components/passengers").then(function (PassComponent) {
           new Vue({
            el: '#app',
               components:{
                   "Passengers":PassComponent
               }
        })
    })
});