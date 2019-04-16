const app = new Vue({
	el: '#app',
	data: {
        title: "Star Wars Searcher",
        q: "",
        a: "",
        copyrightYear: 2019,
        copyrightName: "Nicholas Mercadante",
        resourceType: "",
        searchTerm: "",
        responseStr: ""
	},
	methods:{
        search(){
            //if (! this.term.trim()) return;
            let searchStr = `https://swapi.co/api/`;
            if(this.resourceType == ""){ this.responseStr = "Please specify a category for your search term!"}
            else{
                searchStr += this.resourceType + "/";
                if(this.searchTerm != ""){
                    searchStr += "?search=" + this.searchTerm;
                }
                else{
                    searchStr += (Math.round(Math.random() * 10) + 1) + "/";
                }
                fetch(searchStr)
                .then(response => {
                    if(!response.ok){
                        this.responseStr = "An error occured!";
                        throw Error(`ERROR: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    if(json.count == 0){
                        this.responseStr = "No results found!  Please make sure you've typed your search term correctly.";
                    } else if (json.results){
                        this.responseStr = "";
                        for(let i = 0; i < 6; i++){
                            this.responseStr+=json.results[0][i] + "\n";
                        }
                    } else {
                        this.responseStr = "";
                        for(let i = 0; i < 6; i++){
                            this.responseStr+=json[i] + "\n";
                        }
                    }
                })
            }
        } // end search
    }, // end methods
    created: function(){
        this.search();
    }
});