
const state = {
    seller: {},
    goods: [],
    ratings: []

}

const actions = {
    getData: async ({commit}, data) => {
        const {seller, goods, ratings} = await data // 变量解构
        commit('getSeller', seller)
        commit('getGoods', goods)
        commit('getRatings', ratings)
    }
}

const mutations = {
    getSeller: (state, obj) => state.seller = obj,
    getGoods : (state, obj) => state.goods = obj,
    getRatings: (state, obj) => state.ratings = obj,
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}