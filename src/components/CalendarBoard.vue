<template>
    <div class="container">
        <section>
            <b-field label="Select a Month">
                <b-datepicker
                    type="month"
                    placeholder="Click to select..."
                    icon="calendar-today"
                    :value="targetMonth"
                    @input="changeTargetMonth"
                >
                </b-datepicker>
            </b-field>
            <div class="field">
                <b-checkbox :value="postAlsoInHoliday" @input="togglePostAlsoInHoliday">休日も投稿する</b-checkbox>
            </div>
        </section>
        <div>
            <div class="columns">
                <div class="column">
                    {{`${targetMonth.getFullYear()}年${targetMonth.getMonth() + 1}月`}}
                </div>
            </div>
            <div class="columns is-gapless is-mobile">
                <div v-for="(dayOfWeek, key) in dayOfWeeks" :key="key" class="column">
                    {{dayOfWeek}}
                </div>
            </div>
            <div class="columns is-gapless is-mobile bottom0"  v-for="(weeklyDateList, key) in monthlyDateList" :key="key">
                <div v-for="(date, key2) in weeklyDateList" :key="key2" class="column">
                    <CalendarElement 
                        v-bind="{
                            date: date, 
                            author: 'A', 
                            title:'B', 
                            holiday: isHoliday(new Date(targetMonth.getFullYear(), targetMonth.getMonth(), date))
                        }" 
                    />
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
        }
    },
    methods: {
        changeTargetMonth(e) {
            this.$store.dispatch('calendar/updateTargetMonth', new Date(e.getFullYear(), e.getMonth()))
        },
        togglePostAlsoInHoliday(e) {
            console.log(e)
            this.$store.dispatch('calendar/updatePostAlsoInHoliday', e)
        },
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