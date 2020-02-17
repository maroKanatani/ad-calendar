const state = {
    targetMonth: new Date(),
    postAlsoHoliday: false,
}

const getters = {}

const actions = {}

const mutations = {
    setPostAlsoHoliday (state, value) {
        state.postAlsoHoliday = value
      },    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}