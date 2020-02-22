<template>
<div>
    <div class="columns is-mobile">
        <div class="column is-full">
            <b-field label="カレンダーのタイトル">
                <b-input size="is-large" v-model="calendarTitle" required></b-input>
            </b-field>
        </div>
    </div>
    <div class="columns is-mobile">
        <div class="column is-half">
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
        </div>
    </div>
    <div class="columns is-mobile">
        <div class="column is-half">
            <b-field label="何日まで投稿するか">
                <b-numberinput
                    min="1" 
                    v-bind:max="lastDate.getDate()" 
                    :value="lastPostDate" 
                    @input="changeLastPostDate"
                >
                </b-numberinput>
            </b-field>
        </div>
    </div>
    <div class="columns is-mobile">
        <div class="field">
            <b-checkbox :value="postAlsoInHoliday" @input="togglePostAlsoInHoliday">休日も投稿する</b-checkbox>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        calendarTitle: String,
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