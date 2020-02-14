<template>
    <div class="card">
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
        <div class="card-content">
            <div class="content">
            {{author}}
            </div>
            <div class="content">
            {{title}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        date: Number,
        author: String,
        title: String,
    }
}
</script>