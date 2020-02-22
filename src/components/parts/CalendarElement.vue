<template>
    <div class="card" 
         v-bind:class="[date ? '':'is-invisible', !isPostDate ? 'isHoliday':'']">
        <header class="card-header">
            <p class="card-header-title">
                {{date}}
            </p>
        </header>
        <div class="card-content"  v-bind:class="[!isPostDate? 'is-invisible': '' ]">
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
import AddScheduleDialog from '@/components/AddScheduleDialog.vue'

export default {
    props: {
        date: Number,
        author: String,
        title: String,
        isPostDate: Boolean,
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
</style>