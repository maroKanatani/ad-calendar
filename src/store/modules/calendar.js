const state = {
    targetMonth: new Date(),
    postAlsoInHoliday: false,
}

const getters = {
    targetMonth(state) {
        return state.targetMonth
    },
    postAlsoInHoliday(state) {
        return state.postAlsoInHoliday
    }
}

const actions = {
    updatePostAlsoInHoliday({ commit }, data) {
        commit('setPostAlsoInHoliday', data)
    },
    updateTargetMonth({ commit }, data) {
        commit('setTargetMonth', data)
    },
}

const mutations = {
    setPostAlsoInHoliday(state, data) {
        state.postAlsoInHoliday = data
    },
    setTargetMonth(state, data) {
        state.targetMonth = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}