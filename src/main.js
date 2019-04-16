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
        responseStr: "",
        vidSrc = ""
	},
	methods:{
        search(){
            //if (! this.term.trim()) return;
            let swSearchStr = `https://swapi.co/api/`;
            let ytSearchStr = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=[YOUR_API_KEY]`;
            if(this.resourceType == ""){ this.responseStr = "Please specify a category for your search term!"}
            else{
                swSearchStr += this.resourceType + "/";
                if(this.searchTerm != ""){
                    swSearchStr += "?search=" + this.searchTerm;
                }
                else{
                    swSearchStr += (Math.round(Math.random() * 10) + 1) + "/";
                }
                fetch(swSearchStr)
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