<template>
    <div class="root">
        <div class="columns">
            <div class="column is-size-3 has-text-centered">
                {{`${targetMonth.getFullYear()}年${targetMonth.getMonth() + 1}月`}}
            </div>
        </div>
        <div class="columns is-gapless is-size-5 is-mobile bottom0">
            <div v-for="(dayOfWeek, key) in dayOfWeeks" :key="key" class="column has-text-centered table-column">
                {{dayOfWeek}}
            </div>
        </div>
        <div class="columns is-gapless is-mobile bottom0"  v-for="(weeklyDateList, key) in monthlyDateList" :key="key">
            <div v-for="(date, key2) in weeklyDateList" :key="key2" class="column table-column">
                <CalendarElement 
                    v-bind="{
                        date: date, 
                        isPostDate: isPostDate(new Date(targetMonth.getFullYear(), targetMonth.getMonth(), date)),
                        schedule: findSchedule(date)
                    }" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import CalendarElement from './CalendarElement.vue'
import japaneseHolidays from 'japanese-holidays'

export default {
    components: {
        CalendarElement
    },
    props: {
        targetMonth: Date,
        lastPostDate: Number,
        firstDate: Date,
        lastDate: Date,
        postAlsoInHoliday: Boolean,
        schedules: Array,
    },
    data() {
        return {
            dayOfWeeks: ["日", "月", "火", "水", "木", "金", "土"],
        }
    },
    methods: {
        isHoliday(date) {
            let holiday = japaneseHolidays.isHoliday(date);
            if(!holiday) {
                const dayOfWeek = date.getDay();
                if(dayOfWeek === 0) {
                    return "日曜日";
                }
                if(dayOfWeek === 6) {
                    return "土曜日";
                }
            }
            return holiday;
        },
        isPostDate(date) {
            const isOverPostDate = date.getDate() > this.lastPostDate
            if(isOverPostDate) {
                return false
            }
            if(!this.postAlsoInHoliday && this.isHoliday(date)) {
                return false
            }
            return true
        },
        findSchedule(date) {
            const emptySchedule = {
                article_title: '', 
                author: ''
            }
            if(!this.schedules) {
                return emptySchedule
            }
            const filteredSchedule = this.schedules.filter(s => s.post_date.toDate().getDate() === date);
            if(filteredSchedule.length < 1) {
                return emptySchedule
            }
            return filteredSchedule[0];
        }
    },
    computed: {
        monthlyDateList() {
            const firstDate = this.firstDate;
            const lastDate = this.lastDate;
            const firstDateDayOfWeek = firstDate.getDay();

            let monthlyDates = [];
            for(let i = firstDate.getDate(); i <= lastDate.getDate(); i++) {
                monthlyDates.push(i);
            }
            const emptyList = new Array(7).slice(0, firstDateDayOfWeek);
            monthlyDates = emptyList.concat(monthlyDates);
            monthlyDates = monthlyDates.concat(new Array(7));

            const monthlyDatesDivided = [];
            for(let i = 0; i < lastDate.getDate(); i+=7) {
                monthlyDatesDivided.push(monthlyDates.slice(i, i + 7));
            }
            return monthlyDatesDivided;
        },
    }
}
</script>

<style>
.root {
    width: fit-content
}
.bottom0 {
  margin-bottom: 0 !important
}
.table-column {
    border: 1px solid lightgrey;
}
</style>