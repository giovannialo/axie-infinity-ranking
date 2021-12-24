const app = Vue.createApp({
    data() {
        return {
            accounts: []
        }
    },
    async mounted() {
        const ronins = [
            '0xd5b5d296360435ba23a167e3c9eaf5cfc39ba9d7',
            '0xbb6a30802bb3f9e5cea8982cefc675a4fdae1eaa',
            '0xbe49a2c28c33fd2f7a593b721a336b6e12f649a1',
            '0x68d489411f5e8213319b3ee7fb83fcd8097e4c34',
            '0x9a0b480e2fe5ca1a5ea40b8e54a1873bfcc0b168',
            '0x2aa48cbe7af6126a92b20ff823c315d7e33f5c2a',
            '0xfd669b821bd531d056c9dbb9f7f997c1718b3a7e',
            '0xa71ec1e03171afdce9a904f73599a4dff6349966',
            '0xc8b3ca557c63530a972847b992887904c3702a4e',
            '0x148ceec4d5ac66873036f277bf55fb902ab773f5',
            '0x6e29f554ea59326d54a0de993dee495ea1447253',
            '0x5826c1de4f2a53791b4a0d770dd292d241d245e9',
            '0x829a036f1244e5ce9da4d6f688bff542d322bd89',
            '0xc5c6150d3368288f2c44ef71192b118728d9dae3'
        ];

        if (localStorage.getItem('accounts')) {
            this.accounts = JSON.parse(localStorage.getItem('accounts'));
        }

        const {data} = await axios.get('https://game-api.axie.technology/api/v1/' + ronins.join(','));
        const list = [];

        for (const prop in data) {
            const account = data[prop];

            list.push({
                ronin: prop,
                name: account.name,
                mmr: account.mmr
            });
        }

        list.sort((a, b) => {
            return b.mmr - a.mmr;
        });

        localStorage.setItem('accounts', JSON.stringify(list));

        this.accounts = list;

        const date = new Date();
        const infoCache = document.getElementById('info-cache');

        infoCache.innerText = `Lista atualizada em ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        infoCache.classList.remove('text-secondary');
        infoCache.classList.add('text-primary');
    }
});