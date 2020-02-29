<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">参加登録</p>
            </header>
            <section class="modal-card-body">
                <b-field label="記事を書く人">
                    <b-input
                        type="text"
                        v-model="author"
                        placeholder="名前を入れてね"
                        maxlength="255"
                        required>
                    </b-input>
                </b-field>
                <b-field label="記事を書く人のURL">
                    <b-input
                        type="url"
                        v-model="authorUrl"
                        placeholder="投稿者のURLを貼れます"
                    >
                    </b-input>
                </b-field>

                <b-field label="記事のタイトル">
                    <b-input
                        type="text"
                        v-model="articleTitle"
                        placeholder="タイトルを入れてね"
                        maxlength="255"
                        required>
                    </b-input>
                </b-field>
                <b-field label="記事のURL">
                    <b-input
                        type="url"
                        v-model="articleUrl"
                        placeholder="記事のURLを貼れます"
                    >
                    </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">閉じる</button>
                <button class="button is-primary" type="button" @click="onRegisterButtonClicked">登録</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        date: Number,
        addSchedule: Function,
    },
    data() {
        return {
            author: '',
            authorUrl: '',
            articleTitle: '',
            articleUrl: ''
        }
    },
    methods: {
        async onRegisterButtonClicked() {
            await this.addSchedule(this.date, this.author, this.authorUrl, this.articleTitle, this.articleUrl)
            this.$parent.close()
        },
    }
}
</script>