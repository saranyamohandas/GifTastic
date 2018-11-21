$(document).ready(function(){
    
   var topics = ['Minions',"Archer","Futurama"];
    var apiData;
    var searchQuery="minions";
    renderBtn();
    console.log("outside Ajax");
    
  
    $("#addBtn").click(function(){
        event.preventDefault();
        var getUserInp = $("#addInp").val().trim();
        topics.push(getUserInp);
        console.log("getUserInp-",getUserInp);
        renderBtn();
    });
    
    function renderBtn(){
        $(".main").empty();
        for (x in topics){ 
            var parentDiv = $(".main");
            var newBtn = $("<button>");
            newBtn.text(topics[x]).addClass("btnList");
            parentDiv.append(newBtn);
        }
        
    }
    
    $(".btnList").click(function(){
        //"http://api.giphy.com/v1/gifs/search?q=cartoons+comics+"+ searchQuery + "&limit=10&api_key=UZ94frJzDLfFAxztOhAOuif7KEHeG9u9",
        searchParam= $(this).text();
        searchQuery =  "http://api.giphy.com/v1/gifs/search?q=cartoons+comics+"+ searchParam + "&limit=10&api_key=UZ94frJzDLfFAxztOhAOuif7KEHeG9u9";
        console.log("new search",searchQuery)
          $.ajax({
      url: searchQuery,
      method: "GET"
    }).then(function(response) {
      
      console.log(response);
        console.log("inside callback");
        console.log(response.data[0]);
        console.log(response.data[0].images.fixed_height.url);
        
        displayImg(response);
            
    });
        
    })
     
    function displayImg(getData){
        
        var parentDiv = $(".image");
        parentDiv.empty();
       // var imgDataAttr = ""
     for (i=0;i<=10;i++){
        //create div with class thumbnail
        var imgThumbnail = $("<div>");
        //create div with class caption & add rating as text from response
        var imgCaption = $('<div>');
         //
        var imgRating = getData.data[i].rating;
           console.log(imgRating);
        imgCaption.addClass('caption').text(imgRating );
         // add div with class thumbnail & append div with class caption as child
        imgThumbnail.addClass('thumbnail').append(imgCaption);
        // create img & add src from api
        var childImg = $("<img>");
        var imgSrc = getData.data[i].images.fixed_height.url;
        console.log("imgsrc-",imgSrc);
        childImg.attr('src',imgSrc);
        imgThumbnail.append(childImg);
         //build div with class thumbnail with two child nodes created
        parentDiv.append(imgThumbnail);
        
         
//        parentDiv.append(imgRating);
//        newChild.attr("src",imgSrc);
//        imgRating.append(newChild);
//        console.log("image generate");
//        console.log(parentDiv.append(newChild));
         
     }
    }
    
    
    
});




