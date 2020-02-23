const state = {
    targetMonth: new Date(),
    postAlsoInHoliday: false,
    lastPostDate: 25,
    calendarTitle: "",
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}