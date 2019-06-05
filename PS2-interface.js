$(document).ready(function() {
  $('#PS2Name').click(function() {
    const character = $('#name').val();
    $('#name').val("");

    let request = new XMLHttpRequest();
    const url = `http://census.daybreakgames.com/s:8080stree/json/get/ps2:v2/character?name.first_lower=${character}&c:resolve=stat, outfit, profile, faction, stat_history`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

   const getElements = function(response) {
      $('.show1').text(`${response.character_list[0].name.first} is from the ${response.character_list[0].faction.name.en}.`);
      $('.show2').text(`They are rank ${response.character_list[0].battle_rank.value} with ${response.character_list[0].times.minutes_played} minutes played.`);
      $('.show3').text(`This character has ${response.character_list[0].certs.available_points} certs to spend.`);
      $('.show4').text(`This character has died ${response.character_list[0].stats.stat_history[2].all_time} times.`);
      $('.show5').text(`This character has killed ${response.character_list[0].stats.stat_history[5].all_time} players. With a max kill streak of ${response.character_list[0].stats.stat_history[5].one_life_max}.`);
      $('.show6').text(`Their most played class is ${response.character_list[0].profile.name.en}.`);
      $('.show7').text(`This character is currently in the ${response.character_list[0].outfit.name} Outfit.`);
    }
  });
});
