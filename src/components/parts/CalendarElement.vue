<template>
    <div class="card" 
         v-bind:class="[date ? '':'is-invisible', !isPostDate ? 'isHoliday':'']">
        <header class="card-header" v-bind:class="[isPostDate ? 'post-date':'' ]">
            <p class="card-header-title">
                {{date}}
            </p>
        </header>
        <div class="card-content"  v-bind:class="[isNewCalendar || !isPostDate? 'is-invisible': '' ]">
            <div class="is-clearfix">
                <a class="is-pulled-left" href="#">{{author}}</a>
            </div>
            <div class="is-clearfix">
                <a class="is-pulled-left" href="#">{{title}}</a>
            </div>
            <button v-if="!author && !title" v-on:click="onJoinButtonClicked" class="button is-primary">参加登録する</button>
        </div>
    </div>
</template>

<script>
import AddScheduleDialog from '@/components/AddScheduleDialog'
import { NEW_CALENDAR } from '@/router/pathStrings'

export default {
    props: {
        date: Number,
        author: String,
        title: String,
        isPostDate: Boolean,
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
                trapFocus: true
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
</style>