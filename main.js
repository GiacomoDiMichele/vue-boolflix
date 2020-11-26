var app = new Vue ({
    el: '#root',
    data: {
        //creo la chiave search_films vuota dove andrò ad inserire il valore che ho inserito nellinput, dando un v-model
        search_films:'',
        //creo la lista film dove andrò ad inserire tutti i risultati(dati) dei film
        list_films: [

        ],
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
                 this.list_films = this.list_films.concat(films.data.results);
                });
               //aggancio la ricerca delle serie tv tramite una nuova api, in modo che la funzione cerchi sia nell'api film che serie tv, applicando gli stessi parametri
               axios.get('https://api.themoviedb.org/3/search/tv', {
                   params: {
                       api_key: 'ef9ceb72102dc577a5c353dc8d030bdc',
                       query: this.search_films,
                   }
              }).then((films) => {
                  //assegno i dati dei risultati dell'api serie tv al nuovo array, che conterrà solo i dati serie tv
                   this.list_films = this.list_films.concat(films.data.results)
                });
                //una volta avviata la ricerca riassegno il valore di base (stringa vuota) al v-model (input)
                this.search_films = '';
            }
         //se cercherò di far partire la ricerca senza aver scritto nulla farò apparire un avviso di mancato inserimento del testo nella barra di ricerca
         else {
             alert('inserisci testo nella barra di ricerca')
         }
     },

        //creo funzione per stabilire quante stelline piene inserire, passandolo al parametro di ogni film
        avgVoteStar(films) {
            //creo una let a cui assegnerò il valore del voto dichiarato nell'api diviso 2 (dato che le stelline avranno un massimo di 5 e non di 10)
            let number_vote = Math.round(films.vote_average / 2);
            //impostata la media del voto la riporto come valore nella funzione e la arrotondo, in modo da ciclare le stelle piene per quanto è il numero della media voto
            return number_vote
        },

        //applico la regola inversa per le stelline vuote
        emptyStar(films) {
            //creo una let che mi dirà il voto restante non assegnato, il quale rappresenterà le stelline vuote
            let rest_vote = 10 - films.vote_average;
            //applico lo stesso concetto delle stelle piene e restituisco il valore ottenuto
            let number_rest_vote = Math.round(rest_vote / 2);
            return number_rest_vote
        },

        //per impostare la copertina di ogni film prendo i parametri, url di base dell'api immagini(inizio), la dimensione dell'immagine presa sul sito in 'poster_size' e la fine dell'url dell'immagine presa dai dati dell'api (finirà sempre con png, jpg, svg)
        getImgPoster(films) {
                    //BASE CHIAMATA IMMAGINI,  //(MEDIA) RISOLUZIONE, //DATO API(FINE URL)
            return 'https://image.tmdb.org/t/p/' + 'w342'  + films.poster_path;
        },
    }
});
