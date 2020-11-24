var app = new Vue ({
    el: '#root',
    data: {

    },
    methods: {

    },
    mounted() {
        const self = this;
        axios.get('https://api.themoviedb.org/3/search/movie',{
                params: {
                    api_key: 'ef9ceb72102dc577a5c353dc8d030bdc',
                    query: 'marco'
                }
            }).then(function(films) {
                console.log(films)
        });
    }
});
