const state = {
    targetMonth: new Date(),
    postAlsoInHoliday: false,
    lastPostDate: 25,
    calendarTitle: "",
    isLoading: false,
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
    },
    calendarTitle(state) {
        return state.calendarTitle
    },
    isLoading(state) {
        return state.isLoading
    },
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
    },
    updateCalendarTitle({ commit }, data) {
        commit('setCalendarTitle', data)
    },
    updateLoading({ commit }, data) {
        commit('setLoading', data)
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
    },
    setCalendarTitle(state, data) {
        state.calendarTitle = data
    },
    setLoading(state, data) {
        state.isLoading = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}