document.addEventListener("DOMContentLoaded", function() {
    fetch("posts.json")
    .then(response => response.json())
    .then(data => {

        fetch("users.json")
        .then(response => response.json())
        .then(data2 => {
            const container = document.getElementById("dataContainer");

            // puts the dates in chronological order
            data.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            });

            // loops through posts.json file
            data.forEach(obj => {
                var username = ""
                var picture = ""

                // loops through users.json file and sets username and profile picture to corresponding id number
                data2.forEach(obj2 =>  {
                    if (obj2["id"] == obj["id"]){
                        username = "@" + obj2["username"];
                        picture = obj2["profile_photo"];
                    }
                })

                //adds all content per post to a div
                const postDiv = document.createElement("div");
                postDiv.classList.add("post");

                const picDiv = document.createElement("img");
                picDiv.src = picture;
                postDiv.appendChild(picDiv);

                const userDiv = document.createElement("div");
                userDiv.innerHTML = `<strong>${username}</strong>`;
                postDiv.appendChild(userDiv);

                const dateDiv = document.createElement("div");
                dateDiv.innerHTML = `<i>${formatDate(obj["date"])}</i>`;
                postDiv.appendChild(dateDiv);

                const contentDiv = document.createElement("div");
                contentDiv.innerHTML = obj["content"];
                postDiv.appendChild(contentDiv);

                container.appendChild(postDiv);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
    })
    .catch(error => console.error('Error fetching JSON:', error));
});

// properly formats the date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}
