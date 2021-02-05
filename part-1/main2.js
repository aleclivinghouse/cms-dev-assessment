function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const createGrid = (data) => {
    if(document.querySelector(".container")){
        removeAllChildNodes(document.querySelector(".container"));
    }
    let container = document.createElement('div');
    container.className = 'container';
 
    document.querySelector("#append").appendChild(container);
    let theRow;
    let rowCount = 0;
    let boxCount = 1;
    var uniqueId = "index-1"
    var queryId = "#index-1" 
    data.map((item, index) => {
        const descriptionStart = item.description.substring(0, 75);
        const descriptionEnd = item.description.substring(75);
        if(index%3===0){
            rowCount++;
            theRow =  document.createElement('div');
            theRow.className = 'row'
            theRow.id = "index-" + rowCount.toString();
            queryId = "#index-" + rowCount.toString();
            document.querySelector(".container").appendChild(theRow);
            console.log("the rowCount is incrementing " + rowCount);
        }

        if(boxCount === 1) {
            toInsert =  `
            <div class="col-6">
            <img src="${item.mediaurl}" 
                  onError="this.src = '../comps/fallback.jpg'"
            ></img>
            <h1>${item.title}</h1>
            <p>${descriptionStart}</p>
            </div>
        `;
        } else if(boxCount === 6){
               toInsert =  `
                <div class="col-3">
                  <div class="image-container">
                    <img src="${item.mediaurl}" 
                        onError="this.src = '../comps/fallback.jpg'"
                        ></img>
                  </div>
                </div>
                <div class="col-3">
                    <h1>${item.title}</h1>
                    <p>${descriptionStart}</p>
                 </div>
            `;
        } else {
            toInsert =  `
            <div class="col-3">
                <img src="${item.mediaurl}" 
                    onError="this.src = '../comps/fallback.jpg'"
                ></img>
                <h1>${item.title}</h1>
                <p>${descriptionStart}</p>
            </div>
        `;
        }
        if(boxCount === 6){
            boxCount = 1;
        } else {
            boxCount++;
        }
        uniqueId= "index-" + rowCount.toString();
        queryId = "#index-" + rowCount.toString();
        document.querySelector(queryId).insertAdjacentHTML("beforeend", toInsert);
    })
}

async function fetchListings(){
    const response = await fetch("https://sv-reqres.now.sh/api/listings", {mode: 'cors'});
    const toJson = await response.json();
    const data = toJson.data;
    console.log("this is the data async", data);
    //we need to change this to get all
    const finished =  await createGrid(data);

}

async function fetchEvents(){
    const response = await fetch("https://sv-reqres.now.sh/api/events", {mode: 'cors'});
    const toJson = await response.json();
    const data = toJson.data;
    console.log("this is the events", data);
    const finished =  await createGrid(data);

}


async function fetchOffers(){
    const response = await fetch("https://sv-reqres.now.sh/api/offers", {mode: 'cors'});
    const toJson = await response.json();
    const data = toJson.data;
    console.log("this is the events", data);
    const finished = await createGrid(data);

}

async function fetchAll(){
    const listingsResponse = await fetch("https://sv-reqres.now.sh/api/listings", {mode: 'cors'});
    const listingsJSON = await listingsResponse.json();
    const listingsData = listingsJSON.data;

    const eventsResponse = await fetch("https://sv-reqres.now.sh/api/events", {mode: 'cors'});
    const eventsJSON = await eventsResponse.json();
    const eventsData = eventsJSON.data;

    const offersResponse = await fetch("https://sv-reqres.now.sh/api/offers", {mode: 'cors'});
    const offersJSON = await offersResponse.json();
    const offersData = offersJSON.data;
    const data = [...offersData, ...eventsData, ...listingsData];
    console.log("this is all the data in fetchAll ", data);
    const finished =  await createGrid(data);
}
const unnapend = true;
fetchListings();

console.log("loaded");


function eventsTrigger(){
    fetchEvents();
}

function listingsTrigger(){
    fetchListings();
}

function offersTrigger(){
    fetchOffers();
}

function allTrigger(){
    fetchAll();
}

// document.addEventListener('click', function (event) {
//     event.preventDefault();
// 	// If the clicked element doesn't have the right selector, bail
// 	if (event.target.matches(".listings")){
//         fetchLists();
//     } else if(event.target.matches(".events")){
//         fetchEvents();
//     } else if(event.target.matches(".offers")){
//         fetchOffers();
//     } else if(event.target.matches(".all")){
//         fetchLists();
//         unnappend=false;
//         fetchEvents(unnappend);
//         fetchOffers(unnappend);
//     } else {
//         return;
//     }


	// Log the clicked element in the console
// 	console.log(event.target);

// }, false);