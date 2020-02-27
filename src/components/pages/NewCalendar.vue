<template>
<div>
    <Navbar />
    <div class="container">
        <div class="columns">
            <div class="column page-title is-full is-size-1">
                カレンダーを作る
            </div>
        </div>
        <NewCalendarSetting v-bind="{ ...calendarSettings }"/>
        <CalendarBoard v-bind="{
            targetMonth: targetMonth, 
            lastPostDate: lastPostDate, 
            firstDate: firstDate, 
            lastDate: lastDate,
            postAlsoInHoliday: postAlsoInHoliday,
        }"/>
        <div class="columns">
            <div class="column is-full has-text-centered button-area">
                <b-button @click="onAddButtonClicked" type="is-primary">カレンダーを登録する</b-button>
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
import AddCalendarDialog from '@/components/parts/AddCalendarDialog'
import db from '@/firebase/firebaseInit'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid';

export default {
    components: {
        Navbar,
        NewCalendarSetting,
        CalendarBoard,
        Footer,
    },
    methods: {
        inputCalendarTitle(e) {
            this.$store.dispatch('calendar/updateCalendarTitle', e)
        },
        changeTargetMonth(e) {
            this.$store.dispatch('calendar/updateTargetMonth', new Date(e.getFullYear(), e.getMonth()))
        },
        togglePostAlsoInHoliday(e) {
            this.$store.dispatch('calendar/updatePostAlsoInHoliday', e)
        },
        changeLastPostDate(e) {
            this.$store.dispatch('calendar/updateLastPostDate', e)
        },
        addCalendar() {
            const settings = this.calendarSettings
            const editKey = uuidv4()
            const ref = db.collection('calendars').doc()
            ref.set({
                month: firebase.firestore.Timestamp.fromDate(settings.targetMonth),
                name: settings.calendarTitle,
                post_also_in_holiday: settings.postAlsoInHoliday,
                post_until: settings.lastPostDate,
                edit_key: editKey,
                created_at: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            return {id: ref.id, editKey: editKey}
        },
        onAddButtonClicked() {
            if(this.calendarTitle === "") {
                alert("カレンダーのタイトルが未入力です")
                return ;
            }
            this.$buefy.modal.open({
                parent: this,
                component: AddCalendarDialog,
                hasModalCard: true,
                customClass: 'custom-class custom-class-2',
                trapFocus: true,
                props: {...this.calendarSettings, addCalendar: this.addCalendar}
            })
        },
    },
    computed: {
        calendarTitle() {
            return this.$store.state.calendar.calendarTitle
        },
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
        calendarSettings() {
            return {
                calendarTitle: this.calendarTitle,
                inputCalendarTitle: this.inputCalendarTitle,
                targetMonth: this.targetMonth,
                changeTargetMonth: this.changeTargetMonth,
                lastPostDate: this.lastPostDate,
                changeLastPostDate: this.changeLastPostDate,
                lastDate: this.lastDate,
                postAlsoInHoliday: this.postAlsoInHoliday,
                togglePostAlsoInHoliday: this.togglePostAlsoInHoliday,
            }
        }
    }
}
</script>

<style scoped>
.button-area {
    padding: 30px
}
.container {
    width: 100%
}
.page-title {
    padding-top: 2rem
}
</style>