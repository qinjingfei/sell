export default {
    fetch: function(){
        return JSON.parse(window.localStorage.getItem('shopcart'))
    },
    save: function(item){
        window.localStorage.setItem('shopcart', JSON.stringify(item))
    }
}