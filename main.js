var app = new Vue ({
    el: '#root',
    data: {
        //creo la chiave search_films vuota dove andrò ad inserire il valore che ho inserito nellinput, dando un v-model
        search_films:'',
        //creo la lista film dove andrò ad inserire tutti i risultati(dati) dei film
        list_films: [

        ]
    },
    methods: {
        //creo una funzione al click che mi andrà a cambiare dinamicamente, attraverso il valore di v-model, la query, e quindi il risultato dei film visualizzato in pagina
        searchTypeFilms() {
            //se scriverò qualcosa e non lascerò la barra vuota cambio il parametro della query
             if(this.search_films != '') {
               axios.get('https://api.themoviedb.org/3/search/movie', {
                 params: {
                   api_key: 'ef9ceb72102dc577a5c353dc8d030bdc',
                   query: this.search_films,
                 }
            //prendo tutta l'api con i dati dei film
             }).then((films) => {
                 //pusho o assegno nella lista film tutti i risultati(dati) dell'api
                 this.list_films = films.data.results;
                 console.log(this.list_films);
               });
               this.search_films = '';
             }
         },
        avgVoteStar(films) {
            let number_vote = Math.floor(films.vote_average / 2);
                return number_vote
        },
        emptyStar(films) {
            let empty_vote = Math.floor(10 - films.vote_average)s
        }
    }
});
