<template>
    <div class="container">
        <section>
            <b-field label="Select a date">
                <b-datepicker
                    type="month"
                    placeholder="Click to select..."
                    icon="calendar-today"
                    v-model="targetDate"
                >
                </b-datepicker>
            </b-field>
        </section>
        <div>
            <div class="columns">
                <div class="column">
                    {{`${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月`}}
                </div>
            </div>
            <div class="columns is-gapless is-mobile">
                <div v-for="(dayOfWeek, key) in dayOfWeeks" :key="key" class="column">
                    {{dayOfWeek}}
                </div>
            </div>
            <div class="columns is-gapless is-mobile bottom0"  v-for="(weeklyDateList, key) in monthlyDateList" :key="key">
                <div v-for="(date, key2) in weeklyDateList" :key="key2" class="column">
                    <CalendarElement v-bind="{date: date, author: 'A', title:'B', holiday: isHoliday(new Date(targetDate.getFullYear(), targetDate.getMonth(), date))}" />
                </div>
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
    data() {
        return {
            dayOfWeeks: ["日", "月", "火", "水", "木", "金", "土"],
            targetDate: new Date(),
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
        }
    },
    computed: {
        firstDate() {
            const date = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth());
            date.setDate(1);
            return date;
        },
        lastDate() {
            const date = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth() + 1);
            date.setDate(0);
            return date;
        },
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
        }
    }
}
</script>

<style>
.bottom0 {
  margin-bottom: 0 !important
}
</style>