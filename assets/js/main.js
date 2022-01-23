const app = Vue.createApp({
    data() {
        return {
            accounts: []
        }
    },
    async mounted() {
        const ronins = {
            '0x68d489411f5e8213319b3ee7fb83fcd8097e4c34': {
                axies: ['10092054', '10255109', '10817174']
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
                axies: ['9028618', '10563534', '8701959']
            },
            '0x2aa48cbe7af6126a92b20ff823c315d7e33f5c2a': {
                axies: ['6827298', '10626104', '7977692']
            },
            '0xfd669b821bd531d056c9dbb9f7f997c1718b3a7e': {
                axies: ['5642214', '5527416', '10887908']
            },
            '0xa71ec1e03171afdce9a904f73599a4dff6349966': {
                axies: ['10711801', '10716102', '10750320']
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
                axies: ['10536851', '9704750', '9401221']
            },
            '0x829a036f1244e5ce9da4d6f688bff542d322bd89': {
                axies: ['10367946', '4671172', '10370452']
            },
            '0xc5c6150d3368288f2c44ef71192b118728d9dae3': {
                axies: ['7547473', '10434677', '7756419']
            },
            '0xe53faf54d82bd948325e34d3855d76a83cc3f12f': {
                axies: ['7229152', '6925357', '7630162']
            },
            '0x583d7c0c8a783cdb7b60fa45b35772c49a60d97c': {
                axies: ['4379575', '10809980', '5336448']
            },
            '0x492e2a7b0cf3393088feb50e08fb61a77ece071a': {
                axies: ['7922511', '8667520', '6746978']
            }
        };

        if (localStorage.getItem('accounts')) {
            this.accounts = JSON.parse(localStorage.getItem('accounts'));
        }

        const list = [];

        for (const ronin in ronins) {
            const {data} = await axios.request({
                method: 'GET',
                url: 'https://axie-infinity.p.rapidapi.com/get-update/' + ronin,
                params: {id: ronin},
                headers: {
                    'x-rapidapi-host': 'axie-infinity.p.rapidapi.com',
                    'x-rapidapi-key': 'e031417413msha47fc868ab91e62p173cfdjsn6c10e9cd12fd'
                }
            });

            list.push({
                name: data.leaderboard.name,
                mmr: data.leaderboard.elo,
                axies: ronins[ronin].axies.map(axieId => {
                    return {
                        id: axieId,
                        image: `https://storage.googleapis.com/assets.axieinfinity.com/axies/${axieId}/axie/axie-full-transparent.png`
                    };
                })
            });

            // Sorts in descending order
            list.sort((a, b) => {
                return b.mmr - a.mmr;
            });
        }

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
