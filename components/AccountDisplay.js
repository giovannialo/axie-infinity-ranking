app.component('account-display', {
    props: {
        account: Object,
        index: Number
    },
    template:
        `<div class="account">
            <div class="account-position text-secondary text-center" v-html="position"></div>
            <div class="account-data">
                <h6>{{ account.name }}</h6>
                <p class="mb-0">Rank: {{ account.mmr }}</p>
            </div>
            <div class="account-axie ms-auto">
                <div class="account-axie-item" v-for="axie in axies" :key="axie.id">{{ axie.name }}</div>
            </div>
        </div>`,
    data() {
        return {
            axies: [
                {
                    id: 1,
                    name: 'Axie 1'
                },
                {
                    id: 2,
                    name: 'Axie 2'
                },
                {
                    id: 3,
                    name: 'Axie 3'
                }
            ]
        }
    },
    computed: {
        position() {
            const position = this.index + 1;
            return position !== 1 ? position : '&#127942;';
        }
    }
});