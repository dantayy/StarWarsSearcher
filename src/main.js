const app = new Vue({
	el: '#app',
	data: {
        title: "Vue Ajax",
        q: "",
        a: "",
        copyrightYear: 2019,
        copyrightName: "Nicholas Mercadante"
	},
	methods:{
	search(){
		//if (! this.term.trim()) return;
        let searchStr = `https://swapi.co/api/`;
		fetch("http://igm.rit.edu/~acjvks/courses/2018-fall/330/php/get-a-joke.php")
		.then(response => {
			if(!response.ok){
				throw Error(`ERROR: ${response.statusText}`);
			}
			return response.json();
		})
		.then(json => {
			console.log(json);
            this.q = json.q;
            this.a = json.a;
		})
	   } // end search
	}, // end methods
    created: function(){
        this.search();
    }
});