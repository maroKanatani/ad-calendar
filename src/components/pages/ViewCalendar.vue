<template>
<div>
    <Navbar />
    <div class="container">
        <div class="columns">
            <div class="column page-title is-full is-size-1">
                {{calendarTitle}}
            </div>
        </div>
        <CalendarBoard v-bind="{
            targetMonth: targetMonth, 
            lastPostDate: lastPostDate, 
            firstDate: firstDate, 
            lastDate: lastDate,
            postAlsoInHoliday: postAlsoInHoliday,
            schedules: schedules
        }"/>
        <button v-on:click="getCalendar">aaa</button>
        <button v-on:click="checl">aaa</button>
    </div>
    <Footer />
</div>
</template>

<script>
import Navbar from '@/components/globals/Navbar'
import CalendarBoard from '@/components/parts/CalendarBoard'
import Footer from '@/components/globals/Footer'
import db from '@/firebase/firebaseInit'

export default {
    components: {
        Navbar,
        CalendarBoard,
        Footer,
    },
    data() {
        return {
            calendarTitle: "",
            targetMonth: new Date(2020, 2, 1),
            lastPostDate: 25,
            postAlsoInHoliday: false,
            schedules: [],
        }
    },
    methods: {
        getCalendar() { 
            const calendarId = this.$route.params.id
            const calendarRef = db.collection("calendars").doc(calendarId);
            calendarRef.get().then(doc => {
                if(doc.exists) {
                    console.log(doc.id)
                    const calendarData = doc.data();
                    console.log(calendarData)
                    this.calendarTitle = calendarData.name
                    this.postAlsoInHoliday = calendarData.post_also_in_holiday
                    this.lastPostDate = calendarData.post_until
                    this.targetMonth = calendarData.month.toDate()
                    this.schedules = calendarData.schedules
                } else {
                    console.log("No data")
                }
            })
        },
        checl() {
            console.log(this.targetMonth)
            console.log(typeof(this.targetMonth))
            console.log(this.$route.params.id)
        }
    },
    computed: {
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
    }
}
</script>

<style scoped>
.container {
    width: fit-content
}
.page-title {
    padding-top: 2rem
}
</style>