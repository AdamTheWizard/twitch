/* This is very badly written, I know! don't look! */

var usersArr = ["ninja", "dakotaz", "DrDisRespectLIVE", "TSM_Myth", "Loserfruit", "NICKMERCS", "Pineaqples", "CDNThe3rd", "KingRichard"];

var usersUrl = "https://wind-bow.gomix.me/twitch-api/users/";
var streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/";

$("#online").click(function () {


    $("#wrapper").find(".profile").not(".online").slideToggle();

    if ($("#status-btn").css("color") == "rgb(75, 54, 124)") {

        $("#online").html("<i id='status-btn' class='fas fa-circle'></i> Online")
        $("#status-btn").css("color", "#42f459");
    } else {
        $("#online").html("<i id='status-btn' class='fas fa-circle'></i> All")
        $("#status-btn").css("color", "#4B367C");
    }

});
$("#all").click(function () {
    $("#wrapper").empty();
    userRequest();
});

function userRequest() {
    for (let i = 0; i < usersArr.length; i++) {
        $.ajax({
            url: usersUrl + usersArr[i],
            dataType: "jsonp",
            success: function (data) {

                $("#wrapper").append("<div id='profile-" + usersArr[i] + "' class='profile'><a target='_blank' href='https://www.twitch.tv/" + usersArr[i] + "'><img id='logo-" + usersArr[i] + "' class='logo' src='" + data.logo + "'><p id='displayName-" + usersArr[i] + "' class='displayName'>" + data.display_name + "</p><span id='status-" + usersArr[i] + "' class='status'><i class='fas fa-circle'></i></span><span class='game' id='game-" + usersArr[i] + "'></span><span id='bio-" + usersArr[i] + "' class='bio'>" + data.bio + "</span></a></div>");

                checkLiveUser(usersArr[i]);
            }
        });

    }

    function checkLiveUser(user) {
        $.ajax({
            url: streamUrl + user,
            dataType: "jsonp",
            success: function (data2) {
                let status = "#status-" + user;
                let game = "#game-" + user;
                let profileId = "#profile-" + user;
                if (data2.stream === null) {
                    $(status).css("color", "red");
                    $(game).html("CurrentlyOffline");
                    $(profileId).toggleClass("offline");
                } else {
                    $(status).css("color", "#42f459");
                    $(game).html("Currently Playing: " + data2.stream.game);
                    $(profileId).toggleClass("online");
                }
            }
        });
    }
}

$(window).ready(function () {
    $("#wrapper").empty();
    userRequest();
});
