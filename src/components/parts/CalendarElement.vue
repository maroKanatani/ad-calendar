<template>
    <div class="card calendar-element" 
         v-bind:class="[date ? '':'is-invisible', !isPostDate ? 'isHoliday':'']">
        <header class="card-header" v-bind:class="[isPostDate ? 'post-date':'' ]">
            <p class="card-header-title">
                {{date}}
            </p>
            <button class="button edit-button" @click="onEditButtonClicked" v-if="isPostDate && canEditSchedules && schedule.author && schedule.article_title ">
                <b-icon pack="fas" icon="edit" size="is-small"></b-icon>
            </button>
        </header>
        <div class="card-content card-content-element"  v-bind:class="[isNewCalendar || !isPostDate? 'is-invisible': '' ]">
            <div class="is-clearfix author">
                <a class="is-pulled-left" v-if="schedule.author_url" :href="schedule.author_url">{{schedule.author}}</a>
                <div v-else>{{schedule.author}}</div>
            </div>
            <div class="is-clearfix article-title">
                <a class="is-pulled-left" v-if="schedule.article_url" :href="schedule.article_url">{{schedule.article_title}}</a>
                <div v-else>{{schedule.article_title}}</div>
            </div>
            <button v-if="!schedule.author && !schedule.article_title && canEditSchedules" v-on:click="onJoinButtonClicked" class="button is-primary">参加登録する</button>
        </div>
    </div>
</template>

<script>
import AddScheduleDialog from '@/components/parts/AddScheduleDialog'
import CurrentScheduleDialog from '@/components/parts/CurrentScheduleDialog'
import { NEW_CALENDAR } from '@/router/pathStrings'

export default {
    props: {
        date: Number,
        author: String,
        title: String,
        isPostDate: Boolean,
        schedule: Object,
        addSchedule: Function,
        updateSchedule: Function,
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
        onEditButtonClicked() {
            this.$buefy.modal.open({
                parent: this,
                component: CurrentScheduleDialog,
                hasModalCard: true,
                customClass: 'custom-class custom-class-2',
                trapFocus: true,
                props: {
                    date: this.date,
                    dialogData: {
                        id: this.schedule.id,
                        author: this.schedule.author,
                        authorUrl: this.schedule.author_url,
                        articleTitle: this.schedule.article_title,
                        articleUrl: this.schedule.article_url,
                    },
                    updateSchedule: this.updateSchedule
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
.edit-button {
    background-color: transparent;
    border-color: transparent;
}
.author {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    height: 1.8em;
    line-height: 1.8; 
}
.article-title {
    -webkit-line-clamp: 2;
    overflow: hidden;
    /* height: 3.6em; */
    line-height: 1.5;
    font-size: 0.1em;
    display: -webkit-box;
}
</style>