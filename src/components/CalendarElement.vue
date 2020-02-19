<template>
    <div class="card" v-bind:class="[date ? '':'is-invisible', postAlsoInHoliday && holiday? 'isHoliday':'']">
        <header class="card-header">
            <p class="card-header-title">
                {{date}}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
            </a>
        </header>
        <div class="card-content"  v-bind:class="[postAlsoInHoliday && holiday? 'is-invisible': '' ]">
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
export default {
    props: {
        date: Number,
        author: String,
        title: String,
        holiday: String,
    },
    methods: {
        onJoinButtonClicked() {
            alert("hello")
        }
    },
    computed: {
        postAlsoInHoliday() {
            return this.$store.state.calendar.postAlsoInHoliday
        },
    }
}
</script>

<style>
.isHoliday {
    background-color: lightgrey !important
}
</style>