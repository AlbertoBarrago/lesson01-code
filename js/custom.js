'use strict'; //Thank Good!

//Const
const body = $('body'),
    personsSize = 8,
    timeoutGetPerson = 500,
    personApiEndpoint = "https://randomuser.me/api/",
    baseTemplate = `<div class="container">
                          <div class="row row-card"></div>
                        </div>`,
    header = `<ul class="nav justify-content-center">
                  <li class="nav-item">
                    <a class="nav-link active" href="#">Active</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                  </li>
                </ul>`;

// Bootstrapping App
$(document).ready(() => {
    console.info("we're on the road!");
    // promptAddName();
    generateBaseTemplate();
})

/*
* Init Application
*
* */
const promptAddName = () => {
    let human = prompt("Inserisci il tuo nome", "Indiana Jhones"),
        id = "greetings",
        template = `<div class="container">
                      <div class="row">
                        <div class="col text-center mt-5" id="${id}">
                          
                        </div>
                      </div>
                    </div>`;

    generateTemplate(template, human);
}

/*
* Generate Template
* @[template, human] html template, promptData
*
* */
const generateTemplate = (template, human) => {
    body.append(template);

    appendContent(human)
}

/*
* Append Content to DOM from prompt
* @[template, human] html template, promptData
*
* */
const appendContent = (human) => {
    let text = `Heyyy ${human}! Come va oggi?`
    $('#greetings').text(text);
}

/*
******************** HTTP METHODS ********************
*
* */

/*
* Fetch Person with jquery HTTP method
*
* */
const fetchPersonInJquery = () => {
    $.ajax({
        url: personApiEndpoint,
        dataType: 'json',
        success: data => {
            // handle the response
            console.log('Ajax HTTP call ->', data);
            populateTemplate(data)
        }
    });
}

/*
* Fetch Person with fetch HTTP method
*
* */
const fetchPerson = () => {
    try {
        fetch(personApiEndpoint)
            .then((response) => {
                // handle json the response
                response.json().then(result => populateTemplate(result));
                return console.log("success");
            })
            .catch((error) => {
                // handle the error
                console.info(error);
            });
    }
    catch (e) {
        console.error(e);
    } finally {
      console.log("job done");
    }
}

/*
* Generate Base Template
*
* */
const generateBaseTemplate = () => {
    body.append(header);
    body.append(baseTemplate);

    getPersons(); //Fetch People
}

/*
* Generate Person
*
* */
const getPersons = () => {
    setTimeout(() => {
        for (let i = 0; i < personsSize; i++) fetchPerson();
    }, timeoutGetPerson)
}

/*
* Append Person Card
*
* */
const appendPersonCard = (e) => {
    let templatePopulated = `<div class="col mt-3 mb-4">
                            <div class="card" style="width: 18rem;">
                              <img src="${e.picture.large}" class="card-img-top" alt="image_card">
                              <div class="card-body">
                                <h5 class="card-title">${e.name.first} - ${e.name.last} </h5>
                                <p class="card-text">
                                    <ul class="list-group">
                                      <li class="list-group-item">Id: ${e.id.value ? e.id.value: "Non disponibile"}</li>
                                      <li class="list-group-item">Gender: ${e.gender}</li>
                                      <li class="list-group-item">Number: ${e.cell}</li>
                                      <li class="list-group-item">Registered: ${e.registered.date}</li>
                                    </ul>
                                </p>
                                <a class="btn btn-info w-100" target="_blank" href="https://www.google.it/maps/@${e.location.coordinates.latitude},${e.location.coordinates.longitude}">Open map</a>
                              </div>
                            </div>
                         </div>`
    $('.row-card').append(templatePopulated);
}


/*
* Populate Template
*
* */
const populateTemplate = (data) => {
    console.log("I'm creating the template...")
    data.results.forEach(arrEl => body.append(appendPersonCard(arrEl)))
}



