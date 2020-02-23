<template>
<div>
    <div class="columns is-mobile">
        <div class="column is-half">
            <b-field label="カレンダーのタイトル">
                <b-input size="is-large" :value="calendarTitle" @input="inputCalendarTitle" required></b-input>
            </b-field>
        </div>
    </div>
    <div class="columns is-mobile">
        <div class="column is-one-fifth">
            <b-field label="対象月">
                <b-datepicker
                    type="month"
                    placeholder="Click to select..."
                    icon="calendar-alt"
                    :value="targetMonth"
                    @input="changeTargetMonth"
                    size="is-medium"
                >
                </b-datepicker>
            </b-field>
        </div>
    </div>
    <div class="columns is-mobile">
        <div class="column is-one-fifth">
            <b-field label="何日まで投稿するか">
                <b-numberinput
                    min="1" 
                    v-bind:max="lastDate.getDate()" 
                    :value="lastPostDate" 
                    @input="changeLastPostDate"
                    size="is-medium"
                >
                </b-numberinput>
            </b-field>
        </div>
    </div>
    <div class="columns is-mobile">
        <div class="column is-half field">
            <b-checkbox :value="postAlsoInHoliday" @input="togglePostAlsoInHoliday">休日も投稿する</b-checkbox>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        calendarTitle: String,
        inputCalendarTitle: Function,
        targetMonth: Date,
        changeTargetMonth: Function,
        lastPostDate: Number,
        lastDate: Date,
        changeLastPostDate: Function,
        postAlsoInHoliday: Boolean,
        togglePostAlsoInHoliday: Function,
    },
}
</script>