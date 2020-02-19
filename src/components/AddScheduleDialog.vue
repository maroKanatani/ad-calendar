<template>
    <section>
        <button class="button is-medium is-dark" @click="prompt">
            Launch prompt (default)
        </button>
    </section>
</template>

<script>
    export default {
        methods: {
            prompt() {
                this.$buefy.dialog.prompt({
                    message: `What's your name?`,
                    inputAttrs: {
                        placeholder: 'e.g. Walter',
                        maxlength: 10
                    },
                    trapFocus: true,
                    onConfirm: (value) => this.$buefy.toast.open(`Your name is: ${value}`)
                })
            },
        }
    }
</script>