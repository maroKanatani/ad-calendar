<template>
    <div>
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
                    {{`${targetDate.getMonth() + 1}月`}}
                </div>
            </div>
            <div class="columns">
                <div v-for="(dayOfWeek, key) in dayOfWeeks" :key="key" class="column">
                    {{dayOfWeek}}
                </div>
            </div>
            <div class="columns" v-for="(weeklyDateList, key) in monthlyDateList" :key="key">
                <div v-for="(date, key2) in weeklyDateList" :key="key2" class="column">
                    {{date}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dayOfWeeks: ["日", "月", "火", "水", "木", "金", "土"],
                targetDate: new Date(),
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