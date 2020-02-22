<template>
    <div class="container">
        <section>
            <b-field label="カレンダーのタイトル">
                <b-input size="is-large" v-model="name" required></b-input>
            </b-field>
            <b-field label="対象月">
                <b-datepicker
                    type="month"
                    placeholder="Click to select..."
                    icon="calendar-today"
                    :value="targetMonth"
                    @input="changeTargetMonth"
                >
                </b-datepicker>
            </b-field>
            <b-field label="何日まで投稿するか">
                <b-numberinput min="1" v-bind:max="lastDate.getDate()" v-model="lastPostDate"></b-numberinput>
            </b-field>
            <div class="field">
                <b-checkbox :value="postAlsoInHoliday" @input="togglePostAlsoInHoliday">休日も投稿する</b-checkbox>
            </div>
        </section>
        <CalendarBoard v-bind="{
            targetMonth: targetMonth, 
            lastPostDate: lastPostDate, 
            firstDate: firstDate, 
            lastDate: lastDate}"
        />
    </div>
</template>

<script>
import CalendarBoard from '@/components/parts/CalendarBoard'

export default {
    components: {
        CalendarBoard,
    },
    data() {
        return {
            lastPostDate: 25,
        }
    },
    methods: {
        changeTargetMonth(e) {
            this.$store.dispatch('calendar/updateTargetMonth', new Date(e.getFullYear(), e.getMonth()))
        },
        togglePostAlsoInHoliday(e) {
            this.$store.dispatch('calendar/updatePostAlsoInHoliday', e)
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
    }
}
</script>