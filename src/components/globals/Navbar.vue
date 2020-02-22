<template>
    <b-navbar class="navbar is-primary is-size-5">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Top
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Top
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/new-calendar' }">
                カレンダーを作る
            </b-navbar-item>
        </template>
        <template slot="end"></template>
    </b-navbar>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
    height: 4rem;
}
</style>
