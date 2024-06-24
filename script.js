let filterAelem = document.querySelector('#A');
let filterBelem = document.querySelector('#B');
let filterCelem = document.querySelector('#C');

let filtersContainer = document.querySelector('.filter-container');

//Initially i used the fetch API to get the data from my local json file,
//but in order to avoid CORS issues and setting up a local server, I decided to include the data directly into the JS file

// fetch("tableData.json")
// .then(function(response){
//     return response.json();
// })
// .then(function(data){
//     populateTable(data);
//     filterJson(data);
// })

const data = [
    { "A": "A1", "B": "B1", "C": "C1" },
    { "A": "A1", "B": "B1", "C": "C2" },
    { "A": "A1", "B": "B1", "C": "C3" },
    { "A": "A1", "B": "B2", "C": "C4" },
    { "A": "A1", "B": "B2", "C": "C5" },
    { "A": "A1", "B": "B3", "C": "C6" },
    { "A": "A2", "B": "B4", "C": "C7" },
    { "A": "A2", "B": "B5", "C": "C8" },
    { "A": "A2", "B": "B5", "C": "C9" },
    { "A": "A3", "B": "B6", "C": "C10"}
]
function initiatePage (data){
    populateTable(data);
    filterJson(data);
}
function filterJson(data)
{
    let filteredData = data;

    filtersContainer.addEventListener('change', (event) => {
        if(event.target.classList.contains('filter')) {
            if(event.target.value !== "all") {
                let filterID = event.target.id
                filteredData = data.filter(function (i){
                    return i[filterID]===event.target.value;
                });
            }else {
                filteredData = data; 
            }
            populateTable(filteredData);
        }
    })
    
}


function populateFilters(filterObject) {
    for(let key in filterObject) {
        let out = '';
        for(let option of filterObject[key].options){
            out +=  `<option value="${option}">${option}</option>`
        }
        out += `<option value="all">All</option>`
        filterObject[key].element.innerHTML = out;
    }
}

function populateTable(data) {

    let placeholder = document.querySelector('#dataOutput');
    let out = '';

    let filterObject = {
        filterA: {
            options: [],
            element: filterAelem
        },
        filterB: {
            options: [],
            element: filterBelem
        },
        filterC: {
            options: [],
            element: filterCelem
        }
    }

    for(let value of data){
        out += 
        `<tr>
            <td>${value.A}</td>
            <td>${value.B}</td>
            <td>${value.C}</td>
        </tr>`;

        if (filterObject.filterA.options.indexOf(value.A) === -1) filterObject.filterA.options.push(value.A);
        if (filterObject.filterB.options.indexOf(value.B) === -1) filterObject.filterB.options.push(value.B);
        if (filterObject.filterC.options.indexOf(value.C) === -1) filterObject.filterC.options.push(value.C);
    }

    placeholder.innerHTML = out;
    populateFilters(filterObject);
}

initiatePage(data);
