function PlayerController(){
    var loading = true;
    var playerService = new PlayerService(ready)
    var playerResultsElem = document.getElementById('player-results')
    var myTeamElem = document.getElementById('my-team')
    
    function ready(){
        loading = false;

    }
    function drawPlayers(arr){
        var template = ``
        for(var i=0;i<arr.length;i++){
            var player = arr[i];
            player.fullname = player.fullname ? player.fullname : 'No Info Available'
            player.position = player.position ? player.position : 'No Info Available'
            player.pro_team = player.pro_team ? player.pro_team : 'No Info Available'
            template += `
            <div class="col-md-4 col-sm-6 col-xs-12 pt-3">
                <div class="player-card">
                    <div class="player-photo">
                        <img src="${player.photo}">
                    </div>
                    <div class="player-info">
                        <h2><b>Name:</b>${player.fullname}</h2>
                        <h3><b>Team:</b>${player.pro_team}</h3>
                        <h3><b>Position:</b>${player.position}</h3>
                        <button type="button" class="btn btn-primary" onClick="app.controllers.playerController.addToTeam(${player.id})">Add To My Team!</button>
                    </div>
                </div>
            </div>
            `
        }
        playerResultsElem.innerHTML = template
    }
    function drawMyTeam(arr){
        var template = ``
        for(var i=0;i<arr.length;i++){
            var player = arr[i];
            player.fullname = player.fullname ? player.fullname : 'No Info Available'
            player.position = player.position ? player.position : 'No Info Available'
            player.pro_team = player.pro_team ? player.pro_team : 'No Info Available'
            template += `
            <div class="col-md-4 col-sm-6 col-xs-12pt-3">
                <div class="player-card">
                    <div class="player-photo">
                        <img src="${player.photo}">
                    </div>
                    <div class="player-info">
                        <h2><b>Name:</b>${player.fullname}</h2>
                        <h3><b>Team:</b>${player.pro_team}</h3>
                        <h3><b>Position:</b>${player.position}</h3>
                        <button type="button" class="btn btn-danger" onClick="app.controllers.playerController.removeFromTeam(${player.id})">Remove From Team</button>
                    </div>
                </div>
            </div>
            `
        }
        myTeamElem.innerHTML = template
    }
    function getMyTeam(){
        playerService.getMyTeam()
    }
    this.addToTeam = function addToTeam(id){
        playerService.addToTeam(id)
        drawMyTeam(playerService.getMyTeam())
    }
    this.removeFromTeam = function removeFromTeam(id){
        playerService.removeFromTeam(id)
        drawMyTeam(playerService.getMyTeam())
    }
    this.search = function search(event){
        event.preventDefault();
        var formData = event.target;
        var type = formData.type.value
        if(type == 'name'){
            playerService.getPlayersByTeam(formData.search.value, drawPlayers)
        }
        if(type == 'position'){
            playerService.getPlayersByPosition(formData.search.value, drawPlayers)
        }
        if(type == 'team'){
            playerService.getPlayersByTeam(formData.search.value, drawPlayers)
        }
    }

}