<template>
    <div class="card calendar-element" 
         v-bind:class="[date ? '':'is-invisible', !isPostDate ? 'isHoliday':'']">
        <header class="card-header" v-bind:class="[isPostDate ? 'post-date':'' ]">
            <p class="card-header-title">
                {{date}}
            </p>
        </header>
        <div class="card-content card-content-element"  v-bind:class="[isNewCalendar || !isPostDate? 'is-invisible': '' ]">
            <div class="is-clearfix">
                <a class="is-pulled-left" v-if="schedule.author_url" :href="schedule.author_url">{{schedule.author}}</a>
                <div v-else>{{schedule.author}}</div>
            </div>
            <div class="is-clearfix">
                <a class="is-pulled-left" v-if="schedule.article_url" :href="schedule.article_url">{{schedule.article_title}}</a>
                <div v-else>{{schedule.article_title}}</div>
            </div>
            <button v-if="!schedule.author && !schedule.article_title && canEditSchedules" v-on:click="onJoinButtonClicked" class="button is-primary">参加登録する</button>
        </div>
    </div>
</template>

<script>
import AddScheduleDialog from '@/components/parts/AddScheduleDialog'
import { NEW_CALENDAR } from '@/router/pathStrings'

export default {
    props: {
        date: Number,
        author: String,
        title: String,
        isPostDate: Boolean,
        schedule: Object,
        addSchedule: Function,
        canEditSchedules: Boolean,
    },
    data() {
        return {
            isNewCalendar: NEW_CALENDAR === this.$route.path
        }
    },
    methods: {
        onJoinButtonClicked() {
            this.$buefy.modal.open({
                parent: this,
                component: AddScheduleDialog,
                hasModalCard: true,
                customClass: 'custom-class custom-class-2',
                trapFocus: true,
                props: {
                    date: this.date,
                    addSchedule: this.addSchedule
                }
            })
        },
    },
}
</script>

<style>
.isHoliday {
    background-color: lightgrey !important
}
.post-date{
    background-color: #f3ce96
}
.calendar-element {
    height: 100%;
    word-break: break-all;
}
.card-content-element {
    padding: 0.75rem;
    height: 10rem;
    width: 9rem;
}
</style>