let filterAelem = document.querySelector('#A');
let filterBelem = document.querySelector('#B');
let filterCelem = document.querySelector('#C');

let filtersContainer = document.querySelector('.filter-container');
fetch("tableData.json")
.then(function(response){
    return response.json();
})
.then(function(data){

    populateTable(data);
    filterJson(data);
})

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

