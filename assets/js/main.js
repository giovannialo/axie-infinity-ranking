const app = Vue.createApp({
    data() {
        return {
            accounts: []
        }
    },
    async mounted() {
        const ronins = {
            '0x68d489411f5e8213319b3ee7fb83fcd8097e4c34': {
                axies: ['7922511', '10255109', '9401221']
            },
            '0xd5b5d296360435ba23a167e3c9eaf5cfc39ba9d7': {
                axies: ['9573010', '10282946', '9625005']
            },
            '0xbb6a30802bb3f9e5cea8982cefc675a4fdae1eaa': {
                axies: ['6709927', '9610592', '7117921']
            },
            '0xbe49a2c28c33fd2f7a593b721a336b6e12f649a1': {
                axies: ['7399475', '7922703', '10370472']
            },
            '0x9a0b480e2fe5ca1a5ea40b8e54a1873bfcc0b168': {
                axies: ['9028618', '5859924', '8701959']
            },
            '0x2aa48cbe7af6126a92b20ff823c315d7e33f5c2a': {
                axies: ['6827298', '6855383', '7977692']
            },
            '0xfd669b821bd531d056c9dbb9f7f997c1718b3a7e': {
                axies: ['5642214', '5773467', '5527416']
            },
            '0xa71ec1e03171afdce9a904f73599a4dff6349966': {
                axies: ['6993216', '8415410', '8667520']
            },
            '0xc8b3ca557c63530a972847b992887904c3702a4e': {
                axies: ['8890069', '10255047', '9899684']
            },
            '0x148ceec4d5ac66873036f277bf55fb902ab773f5': {
                axies: ['7458139', '9338483', '7117976']
            },
            '0x6e29f554ea59326d54a0de993dee495ea1447253': {
                axies: ['9397974', '6813551', '6587807']
            },
            '0x5826c1de4f2a53791b4a0d770dd292d241d245e9': {
                axies: ['4379575', '9704750', '6746978']
            },
            '0x829a036f1244e5ce9da4d6f688bff542d322bd89': {
                axies: ['10367946', '4671172', '10370452']
            },
            '0xc5c6150d3368288f2c44ef71192b118728d9dae3': {
                axies: ['7547473', '5560344', '7756419']
            }
        };

        if (localStorage.getItem('accounts')) {
            this.accounts = JSON.parse(localStorage.getItem('accounts'));
        }

        let {data} = await axios.get('https://game-api.axie.technology/api/v1/' + Object.keys(ronins).join(','));
        console.log(data);

        const list = [];

        // Organize ronin data
        for (const ronin in data) {
            list.push({
                name: data[ronin].name,
                mmr: data[ronin].mmr,
                axies: ronins[ronin].axies.map(axieId => {
                    return {
                        id: axieId,
                        image: `https://storage.googleapis.com/assets.axieinfinity.com/axies/${axieId}/axie/axie-full-transparent.png`
                    };
                })
            });
        }

        // Sorts in descending order
        list.sort((a, b) => {
            return b.mmr - a.mmr;
        });

        localStorage.setItem('accounts', JSON.stringify(list));

        this.accounts = list;

        const date = new Date();
        const day = ('00' + date.getDate()).slice(-2);
        const month = parseInt(('00' + date.getMonth()).slice(-2)) + 1;
        const year = date.getFullYear();
        const hour = ('00' + date.getHours()).slice(-2);
        const minutes = ('00' + date.getMinutes()).slice(-2);
        const seconds = ('00' + date.getSeconds()).slice(-2);

        const infoCache = document.getElementById('info-cache');

        infoCache.innerText = `Lista atualizada em ${day}/${month}/${year} às ${hour}:${minutes}:${seconds}`;
        infoCache.classList.remove('text-secondary');
        infoCache.classList.add('text-primary');
    }
});