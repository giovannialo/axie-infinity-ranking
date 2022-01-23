app.component('account-display', {
    props: {
        account: Object,
        index: Number
    },
    template:
        `<div class="account">
            <div class="account-position text-secondary text-center" v-html="position"></div>
            <div class="account-data">
                <h6 class="mb-1">{{ account.name }}</h6>
                <p class="mb-0">Rank: {{ account.mmr }}</p>
                <p class="mb-0">SLP: {{ account.slp }}</p>
            </div>
            <div class="account-axie ms-auto">
                <div class="account-axie-item" v-for="axie in account.axies" :key="axie.id" :style="{ backgroundImage: 'url(' + axie.image + ')' }"></div>
            </div>
        </div>`,
    computed: {
        position() {
            const position = this.index + 1;
            return position !== 1 ? position : '&#127942;';
        }
    }
});
