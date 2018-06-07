var searchElement = (function () {
    function searchElement() { };
    searchElement.prototype.addSearchfunctionality = function () {
        var ySearchElementDv = document.createElement("div");

        var title = document.createElement("h2");
        title.appendChild(document.createTextNode("Youtube Search Application"));

        var ySearchInputTxb = document.createElement("input");
        ySearchInputTxb.setAttribute("id", "ySearchInputTxb");
        ySearchInputTxb.setAttribute("type", "text");

        var ySearchBtn = document.createElement("input");
        ySearchBtn.setAttribute("type", "button");
        ySearchBtn.setAttribute("value", "search");
        ySearchBtn.addEventListener("click", this.mapSearchInputResults);

        var hrElement = document.createElement("hr");

        ySearchElementDv.appendChild(title);
        ySearchElementDv.appendChild(ySearchInputTxb);
        ySearchElementDv.appendChild(ySearchBtn);
        ySearchElementDv.appendChild(hrElement);

        document.body.appendChild(ySearchElementDv);
    }

    searchElement.prototype.mapSearchInputResults = function () {
        var searchText = document.querySelector("#ySearchInputTxb");

        fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=' + searchText.value)
               .then(function (response) {

                   var testDivMain = document.createElement("div");
                   var fragment = document.createDocumentFragment();

                   response.json().then(function (kind) {

                       for (var i = 0 ; i < kind.items.length; i++) {

                           var mainDiv = document.createElement("div");

                           var titleDiv = document.createElement("div");
                           var imageDiv = document.createElement("div");

                           var brElement = document.createElement("br");

                           var title = document.createElement("a");
                           title.setAttribute('href', 'https://www.youtube.com/watch?v=' + kind.items[0].id.videoId);
                           title.appendChild(document.createTextNode(kind.items[i].snippet.title));

                           var imageElement = document.createElement("img");
                           imageElement.setAttribute("src", kind.items[i].snippet.thumbnails.medium.url);
                           imageElement.setAttribute("height", kind.items[i].snippet.thumbnails.medium.height);
                           imageElement.setAttribute("width", kind.items[i].snippet.thumbnails.medium.width);

                           var list = document.createElement('ul');
                           var item = document.createElement('li');
                           item.appendChild(document.createTextNode("Description      : " + kind.items[i].snippet.description));
                           list.appendChild(item);

                           var item1 = document.createElement('li');
                           item1.appendChild(document.createTextNode("Publication date : " + kind.items[i].snippet.publishedAt));
                           list.appendChild(item1);

                           titleDiv.appendChild(imageElement);
                           imageDiv.appendChild(title);

                           mainDiv.appendChild(titleDiv);
                           mainDiv.appendChild(imageDiv);
                           mainDiv.appendChild(list);

                           fragment.appendChild(mainDiv);
                       }

                       testDivMain.appendChild(fragment);
                       document.body.appendChild(testDivMain);
                   });

               }, function (error) {

                   console.log(error);

               });
    }

    return searchElement;
})();

search = new searchElement();
search.addSearchfunctionality();