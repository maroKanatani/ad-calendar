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
            schedules: schedules,
            addSchedule: addSchedule,
        }"/>
    </div>
    <Footer />
</div>
</template>

<script>
import Navbar from '@/components/globals/Navbar'
import CalendarBoard from '@/components/parts/CalendarBoard'
import Footer from '@/components/globals/Footer'
import db from '@/firebase/firebaseInit'
import firebase from 'firebase'

export default {
    components: {
        Navbar,
        CalendarBoard,
        Footer,
    },
    data() {
        const calendarId = this.$route.params.id
        return {
            calendarTitle: "",
            targetMonth: new Date(),
            lastPostDate: 25,
            postAlsoInHoliday: false,
            schedules: [],
            calendarId: calendarId
        }
    },
    methods: {
        getCalendar() {  
            const calendarRef = db.collection("calendars").doc(this.calendarId);
            calendarRef.get().then(doc => {
                if(doc.exists) {
                    const calendarData = doc.data();
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
        addSchedule(date, author, authorUrl, articleTitle, articleUrl) {
            const calendarRef = db.collection("calendars").doc(this.calendarId)
            calendarRef.update({
                schedules: firebase.firestore.FieldValue.arrayUnion({
                    article_title: articleTitle,
                    article_url: articleUrl,
                    author: author,
                    author_url: authorUrl,
                    post_date: firebase.firestore.Timestamp.fromDate(new Date(this.targetMonth.getFullYear(), this.targetMonth.getMonth(), date))
                })
            })
            
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
    },
    mounted() {
        this.getCalendar()
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