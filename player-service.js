function PlayerService(callback) {
    var playersData = [];
    var myTeam = [];

    function getPlayersById(arr, id) {
        for (var i = 0; i < arr.length; i++) {
            var player = arr[i];
            if (id == player.id) {
                return player;
            }
        }
    }
    function loadPlayersData() {
        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback();
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
        });
    }
    //function to filter by team name
    this.getPlayersByTeam = function getPlayerByTeam(team, callback) {
        // making all data the same
        var team = team.toUpperCase()
        var filteredTeam = playersData.filter(function (player) {
            if (player.pro_team === team) {
                return true;
            }
        })
        callback(filteredTeam)
    }
    this.getPlayersByPosition = function getPlayerByPosition(position, callback) {
        var position = position.toUpperCase()
        var filteredPosition = playersData.filter(function (player) {
            if (player.position === position) {
                return true;
            }
        })
        callback(filteredPosition)
    }
    this.getPlayersByName = function getPlayerByName(callback) {
        var filteredName = playersData.filter(function (player){
            if(player.firstname === name || player.lastname === name || player.fullname === name){
                return true;
            }
        })
        callback(filteredName)
    }
    this.getMyTeam = function getMyTeam() {
        return JSON.parse(JSON.stringify(myTeam))
    }
    this.addToTeam = function addToTeam(id) {
        var player = getPlayersById(playersData, id)
        if (!player || getPlayersById(myTeam, id) || myTeam.length >= 11) { return }
        myTeam.push(player)
    }
    this.removeFromTeam = function removeFromTeam(id) {
        var player = getPlayersById(myTeam, id)
        if (!player) { return }
        var i = myTeam.indexOf(player)
        myTeam.splice(i, 1)
    }
    loadPlayersData();
}