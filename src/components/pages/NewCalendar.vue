<template>
<div>
    <Navbar />
    <div class="container">
        <div class="columns">
            <div class="column page-title is-full is-size-1">
                カレンダーを作る
            </div>
        </div>
        <NewCalendarSetting v-bind="{
            calendarTitle: calendarTitle,
            targetMonth: targetMonth,
            changeTargetMonth: changeTargetMonth,
            lastPostDate: lastPostDate,
            changeLastPostDate: changeLastPostDate,
            lastDate: lastDate,
            postAlsoInHoliday: postAlsoInHoliday,
            togglePostAlsoInHoliday: togglePostAlsoInHoliday,
        }"/>
        <CalendarBoard v-bind="{
            targetMonth: targetMonth, 
            lastPostDate: lastPostDate, 
            firstDate: firstDate, 
            lastDate: lastDate,
            postAlsoInHoliday: postAlsoInHoliday,
        }"/>
        <div class="columns">
            <div class="column is-full has-text-centered button-area">
                <b-button type="is-primary">カレンダーを登録する</b-button>
            </div>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import Navbar from '@/components/globals/Navbar'
import NewCalendarSetting from '@/components/parts/NewCalendarSetting'
import CalendarBoard from '@/components/parts/CalendarBoard'
import Footer from '@/components/globals/Footer'

export default {
    components: {
        Navbar,
        NewCalendarSetting,
        CalendarBoard,
        Footer,
    },
    data() {
        return {
            calendarTitle: "",
        }
    },
    methods: {
        changeTargetMonth(e) {
            this.$store.dispatch('calendar/updateTargetMonth', new Date(e.getFullYear(), e.getMonth()))
        },
        togglePostAlsoInHoliday(e) {
            this.$store.dispatch('calendar/updatePostAlsoInHoliday', e)
        },
        changeLastPostDate(e) {
            this.$store.dispatch('calendar/updateLastPostDate', e)
        }
    },
    computed: {
        targetMonth() {
            return this.$store.state.calendar.targetMonth
        },
        postAlsoInHoliday() {
            return this.$store.state.calendar.postAlsoInHoliday
        },
        firstDate() {
            const date = new Date(this.targetMonth.getFullYear(), this.targetMonth.getMonth());
            date.setDate(1);
            return date;
        },
        lastDate() {
            const date = new Date(this.targetMonth.getFullYear(), this.targetMonth.getMonth() + 1);
            date.setDate(0);
            return date;
        },
        lastPostDate() {
            return this.$store.state.calendar.lastPostDate
        },
    }
}
</script>

<style scoped>
.button-area {
    padding: 30px
}
.container {
    width: fit-content
}
.page-title {
    padding-top: 2rem
}
</style>