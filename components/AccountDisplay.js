app.component('account-display', {
    props: {
        account: Object
    },
    template:
        `<div class="account">
        <div class="account-data">
            <h6>{{ account.name }}</h6>
            <p class="mb-0">Rank: {{ account.mmr }}</p>
        </div>
        <div class="account-axie">
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
    }
});