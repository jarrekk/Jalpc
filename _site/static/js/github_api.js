$(document).ready(function() {
  users = []
  repos = []
  $(".ghbtn").each( function () {
    var user = $(this).attr('user');
    var repo = $(this).attr('repo');
    repos.push(user + '/' + repo);
      if (users.indexOf($(this).attr('user')) === -1) {
        users.push($(this).attr('user'))
      }
  })
  // console.log(1, users, repos)
  for (var i = 0; i < users.length; i++) {
    $.ajax({
    type: "GET",
    url: "https://api.github.com/users/" + users[i] + "/repos?per_page=100",
    tryCount : 0,
    retryLimit : 3,
    async: true,
    dataType: "json",
    success: function (data) {
      for  (var i = 0; i < data.length; i++) {
        if (repos.indexOf(data[i].full_name) !== -1) {
          x = data[i].name;
          $("div[repo='" + x + "']").children(".star").html('<i class="fa fa-star"></i> ' + data[i].stargazers_count)
          $("div[repo='" + x + "']").children(".fork").html('<i class="fa fa-code-fork"></i> ' + data[i].forks_count)
        }
      }
    }
  })}
});
