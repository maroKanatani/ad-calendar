const state = {
    targetMonth: new Date(),
    postAlsoInHoliday: false,
    lastPostDate: 25,
}

const getters = {
    targetMonth(state) {
        return state.targetMonth
    },
    postAlsoInHoliday(state) {
        return state.postAlsoInHoliday
    },
    lastPostDate(state) {
        return state.lastPostDate
    }
}

const actions = {
    updatePostAlsoInHoliday({ commit }, data) {
        commit('setPostAlsoInHoliday', data)
    },
    updateTargetMonth({ commit }, data) {
        commit('setTargetMonth', data)
    },
    updateLastPostDate({ commit }, data) {
        commit('setLastPostDate', data)
    }
}

const mutations = {
    setPostAlsoInHoliday(state, data) {
        state.postAlsoInHoliday = data
    },
    setTargetMonth(state, data) {
        state.targetMonth = data
    },
    setLastPostDate(state, data) {
        state.lastPostDate = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}