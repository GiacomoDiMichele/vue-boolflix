var app = new Vue ({
    el: '#root',
    data: {
        list_films: [

        ]
    },
    methods: {
        researchFilms() {

        }
    },
    mounted() {
        axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: 'ef9ceb72102dc577a5c353dc8d030bdc',
                    query: 'marco'
                }
            }).then((films) => {
                this.list_films = films.data.results;
                console.log(this.list_films);
            });
        }
    });
