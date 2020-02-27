<template>
    <div class="modal-card add-calendar-modal">
        <header class="modal-card-head">
            <p class="modal-card-title">カレンダー登録</p>

        </header>
        <section class="modal-card-body">
            <template v-if="hasId">
                カレンダーを作成しました。<br>
                <router-link :to="`/view-calendar/${id}`" rel="noopener" target="_blank">閲覧専用カレンダー</router-link>
                <router-link :to="`/view-calendar/${id}/${editKey}`" rel="noopener" target="_blank">参加登録可能カレンダー</router-link>
            </template>
            <template v-else>
                <b-field label="カレンダーのタイトル">
                    {{ calendarTitle }}
                </b-field>

                <b-field label="対象期間">
                    {{ `${targetMonth.getFullYear()}年${targetMonth.getMonth() + 1}月` }}
                    {{ `${lastPostDate}日まで` }}<br>
                    {{ `休日の投稿：${postAlsoInHoliday ? 'あり':'なし'}` }}
                </b-field>
            </template>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="onClose">キャンセル</button>
            <button class="button is-primary" type="button" @click="onRegisterButtonClicked">登録</button>
        </footer>
    </div>
</template>

<script>
export default {
    props: {
        calendarTitle: String,
        targetMonth: Date,
        lastPostDate: Number,
        postAlsoInHoliday: Boolean,
        addCalendar: Function,
    },
    data() {
        return {
            id: "",
            editKey: "",
        }
    },
    methods: {
        onRegisterButtonClicked() {
            const result = this.addCalendar()
            this.id = result.id
            this.editKey = result.editKey
        },
        onClose() {
            this.id = ""
            this.$parent.close()
        },
    },
    computed: {
        hasId() {
            return this.id !== ""
        }
    }
}
</script>

<style scoped>
 .add-calendar-modal {
     width: 20rem;
 }
</style>