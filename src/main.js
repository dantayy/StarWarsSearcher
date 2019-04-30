//ES6 class for a user's query
class Query {
    constructor(category, term, vid){
        this.category = category;
        this.term = term;
        this.vid = vid;
    }
}

const app = new Vue({
	el: '#app',
	data: {
        title: "Star Wars Searcher",
        copyrightYear: 2019,
        copyrightName: "Nicholas Mercadante",
        resourceType: "", //var for type of thing user specifies to search for in the select element
        searchTerm: "", //var for user's search term
        vidBool: true, //var for whether or not the YouTube Data API will be pinged for a search
        returnedInfo: [], //var for the info to display
        vidSrc: "https://www.youtube.com/embed/adzYW5DZoWs" //var for youtube url to display in the iframe
	},
	methods:{
        search(){
            //create a new Query object for searching/storing locally
            let q = new Query(this.resourceType, this.searchTerm, this.vidBool);
            localStorage.setItem("local-user-query", JSON.stringify(q));
            //reset returned info array
            this.returnedInfo = [];
            //create the base url for the search string
            let swSearchStr = `https://swapi.co/api/`;
            //make sure a resource type has been specified before searching
            if(q.category == ""){ this.returnedInfo.push("Please specify a category for your search!"); }
            else{
                //append reseource type to search string
                swSearchStr += q.category + "/";
                //use the search functionality of the API if user specifies a search term
                if(q.term != ""){
                    swSearchStr += "?search=" + q.term;
                }
                //push search data to firebase
                let d = new Date();
                let path = `days/${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
                firebase.database().ref(path).push({
                    type: q.category,
                    query: q.term
                });
                //HTTP call with the finished search url
                fetch(swSearchStr)
                .then(response => {
                    //handle errors
                    if(!response.ok){
                        this.returnedInfo.push("An error occured!");
                        throw Error(`ERROR: ${response.statusText}`);
                    }
                    return response.json();
                })
                //handle returned json
                .then(json => {
                    console.log(json);
                    //handle lack of results
                    if(json.results.length == 0){
                        this.returnedInfo.push("No results found!  Please make sure you've typed your search term correctly.");
                    }else{
                        //counter var for number of properties to be added to the display list
                        let propertyCounter = 0;
                        //select the first object in the list returned
                        let objectToLoop = json.results[0];
                        //if no specific query was entered, pick a random object to loop through
                        if(q.term == ""){ objectToLoop = json.results[Math.round(Math.random() * (json.results.length - 1))];}
                        for (let key in objectToLoop) {
                            //stop adding properties to display after adding six
                            if(propertyCounter > 5){ break; }
                            //push the data to the display list
                            this.returnedInfo.push(key + ": " + objectToLoop[key]);
                            //if the key is the title or name of the Star Wars object, look into searching on YouTube
                            if(key == "title" || key == "name"){
                                //only make the API call if the user wants the video, otherwise reset the url to the default video
                                if(q.vid){
                                    //var for YouTube data API call
                                    let ytSearchStr = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=Star%20Wars%20${objectToLoop[key]}%20Lore&key=${ytKey}`;
                                    fetch(ytSearchStr)
                                    .then(ytResponse => {
                                        //handle errors
                                        if(!ytResponse.ok){
                                            this.returnedInfo.push("An error occured!");
                                            throw Error(`ERROR: ${ytResponse.statusText}`);
                                        }
                                        return ytResponse.json();
                                    })
                                    //handle returned json
                                    .then(ytJson => {
                                        //modify the video source var based on what's returned
                                        this.vidSrc = `https://www.youtube.com/embed/${ytJson.items[0].id.videoId}`;
                                    })                                
                                } else { this.vidSrc = `https://www.youtube.com/embed/adzYW5DZoWs`; }
                            }
                            //increase the counter
                            propertyCounter++;
                        }   
                    }
                })
            }
        }, // end search
        pullLocal(){
            if(localStorage.getItem("local-user-query")){
                let qStr = localStorage.getItem("local-user-query");
                let q = JSON.parse(qStr);
                this.resourceType = q.category;
                this.searchTerm = q.term;
                this.vidBool = q.vid;
            }
        } //end pullLocal
    }, // end methods
    created: function(){
        this.pullLocal();
        this.search();
    }
});