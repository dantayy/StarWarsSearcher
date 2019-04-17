const app = new Vue({
	el: '#app',
	data: {
        title: "Star Wars Searcher",
        copyrightYear: 2019,
        copyrightName: "Nicholas Mercadante",
        resourceType: "",
        searchTerm: "",
        returnedInfo: [],
        vidSrc: "https://youtu.be/adzYW5DZoWs"
	},
	methods:{
        search(){
            this.returnedInfo = [];
            let swSearchStr = `https://swapi.co/api/`;
            let ytSearchStr = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=` + ytKey;
            if(this.resourceType == ""){ this.returnedInfo.push("Please specify a category for your search!"); }
            else{
                swSearchStr += this.resourceType + "/";
                if(this.searchTerm != ""){
                    swSearchStr += "?search=" + this.searchTerm;
                }
                fetch(swSearchStr)
                .then(response => {
                    if(!response.ok){
                        this.returnedInfo.push("An error occured!");
                        throw Error(`ERROR: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    if(json.results.length == 0){
                        this.returnedInfo.push("No results found!  Please make sure you've typed your search term correctly.");
                    }else{
                        let propertyCounter = 0;
                        let objectToLoop = json.results[0];
                        if(this.searchTerm == ""){ objectToLoop = json.results[Math.round(Math.random() * (json.results.length - 1))];}
                        for (let key in objectToLoop) {
                            if(propertyCounter > 5){ break; }
                            this.returnedInfo.push(key + ": " + objectToLoop[key]);
                            propertyCounter++;
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