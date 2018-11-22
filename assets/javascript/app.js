$(document).ready(function(){
    
   var topics = ['Minions',"Archer","Futurama","Mermaid","tom and Jerry","inside out","popeye","the lion king","finding nemo","sesame street"];
    
    renderBtn();
   
    
  
    $("#addBtn").on("click",function(){
        event.preventDefault();
        var getUserInp = $("#addInp").val().trim();
        $("#addInp").val("");
        topics.push(getUserInp);
        console.log("getUserInp-",getUserInp);
        console.log("topics -",topics)
        renderBtn();
    });
    
    function renderBtn(){
        $(".main").empty();
        for (x in topics){ 
            var parentDiv = $(".main");
            var newBtn = $("<button>");
            newBtn.text(topics[x]).addClass("btnList btn btn-primary");
            parentDiv.append(newBtn);
        }
        
    }
    
    $(".main").on("click",".btnList",function(){
        searchParam= $(this).text();
        searchQuery =  "http://api.giphy.com/v1/gifs/search?q=cartoons+comics+"+ searchParam + "&limit=10&rating=pg&api_key=UZ94frJzDLfFAxztOhAOuif7KEHeG9u9";
        
          $.ajax({
              url: searchQuery,
              method: "GET"
    }).then(function(response) {
              console.log(response.data);
              displayImg(response);
            
    });
        
    })
    // render appropriate images when respective button is clicked
    function displayImg(getData){
        
        var parentDiv = $(".image");
        parentDiv.empty();
       
     for (i=0;i<10;i++){
        //create div with class thumbnail
        var imgThumbnail = $("<div>");
        //create div with class caption & add rating as text from response
        var imgCaption = $('<div>');
         //get rating to display in DOM
        var imgRating = getData.data[i].rating;
          
        imgCaption.addClass('caption text-center').text("Rating - " +imgRating );
         
         // add div with class thumbnail & append div with class caption as child
        imgThumbnail.addClass('thumbnail').append(imgCaption);
        // create img & add src from api
        var childImg = $("<img>");
        var imgSrcStill = getData.data[i].images.fixed_height_still.url;
        var imgSrcAnimate = getData.data[i].images.fixed_height.url;
         
        //console.log("imgsrc-",imgSrc);
        childImg.attr('src',imgSrcStill) ;
        childImg.attr("data-still",imgSrcStill)
        childImg.attr("data-animate", imgSrcAnimate)
        childImg.attr("data-state", "still")
        childImg.addClass("imgState");
        imgThumbnail.append(childImg);
        //build div with class thumbnail with two child nodes created
        parentDiv.append(imgThumbnail);
              
     }
        
    }
    // toggle image between still and animate url
    $(".image").on("click",".thumbnail img", function(){
    console.log(" Img clicked");
      
    var getImgState = $(this).attr("data-state");
    
             
             if(getImgState == "still"){
                 var getAnimateUrl = $(this).attr("data-animate")
                 $(this).attr("data-state","animate");
                 $(this).attr("src",getAnimateUrl);
                 
             } else {
                 var getStillUrl = $(this).attr("data-still")
                 $(this).attr("data-state","still");
                 $(this).attr("src",getStillUrl);
             }
            
         });
    
    
    
});






