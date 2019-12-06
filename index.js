const apiUrl = `https://voorhoede-colibri-api-dfhsziniuf.now.sh/api/v1`

function restRequest(query) {
    return fetch(`${apiUrl}${query}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
}

Promise.all([
    restRequest(`/projects?language=en&limit=10`),
    restRequest(`/team?language=en`),
    restRequest(`/events?language=en&limit=3`),
    restRequest(`/contact?language=en`)
])
    .then(([projects, team, events, contact]) => {
        for (let i = 0; i < projects.length; i++) {
            let pathImg = projects[i].social.image ? projects[i].social.image.url : projects[i].images[0].url;
            let projTitle = projects[i].social.title ? projects[i].social.title : "No title";
            let projDescription = projects[i].social.description ? projects[i].social.description : "No description";
            $('<div class="carousel-item"><img class="media-image" src="' + pathImg + '"><div class="media-body"><h3 class="title">' + projTitle + '</h3><h4 class="subtitle">' + projDescription + '</h4><button class="button media-button">Learn more</button></div></div>').appendTo('.carousel-inner');
        }
        $('.carousel-item').first().addClass('active');
        $('#carousel').carousel();

        $('#slide3 h3').html(team.subtitle);
        $('#slide3 h4').html(team.body);

        //for some reason "limit" didn't work for events
        for (let i = 0; i < 3; i++) {
            let eventTitle = events[i].title;
            let eventUrl = events[i].url;
            let eventDescription = events[i].description;
            $('<article><header><h3><a href="' + eventUrl + '" target="_blank">' + eventTitle + '</a></h3></header><p>' + eventDescription + '</p></article>').appendTo('#rowContent');
        }

        $('#slide5 h3').html(contact.title);
        $('#slide5 h4').html(contact.subtitle);
    })