/* This is very badly written, I know! don't look! */

var usersArr = ["ninja", "freecodecamp", "medryBW", "DrDisRespectLIVE", "ESL_SC2", "cretetion", "habathcx", "noobs2ninjas", "Pink_Sparkles", "NICKMERCS"];

var usersUrl = "https://wind-bow.gomix.me/twitch-api/users/";
var streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/";

function userRequest(){
  for (let i = 0; i < usersArr.length; i++){
  $.ajax({
    url: usersUrl + usersArr[i],
    dataType: "jsonp",
    success: function(data){
      
      $("#wrapper").append("<div id='profile-" + usersArr[i] + "' class='profile'><a target='_blank' href='https://www.twitch.tv/" + usersArr[i] + "'><img id='logo-" + usersArr[i] + "' class='logo' src='" + data.logo + "'><p id='displayName-" + usersArr[i] + "' class='displayName'>" + data.display_name + "</p><span id='status-" + usersArr[i] + "' class='status'><i class='fas fa-circle'></i></span><span class='game' id='game-" + usersArr[i] + "'></span><span id='bio-" + usersArr[i] + "' class='bio'>" + data.bio + "</span></a></div>");
      
      checkLiveUser(usersArr[i]);
    }
  });
    
  } 
  function checkLiveUser(user){
    $.ajax({
      url: streamUrl + user,
      dataType: "jsonp",
      success: function(data2){
        let status = "#status-" + user;
        let game = "#game-" + user;
        if (data2.stream === null){
          $(status).css("color", "red"); 
          $(game).html("CurrentlyOffline")
        } else {
          $(status).css("color", "#42f459");
          $(game).html("Currently Playing: " + data2.stream.game);
        }
      }
    });
  }
}

$(window).ready(function(){
  $("#wrapper").empty();
  userRequest(); 
});
