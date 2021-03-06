$(document).ready(function() {
  console.log('document loaded!');

  var $destination,
      $templateEl,
      renderLi,
      renderedHtmlView;

  $destination = $('#spotscontainer');
  $templateEl  = $('#spot-template');
  renderLi = _.template($templateEl.html());
/*
  $.ajax({
    url:"/spots",
    method:'GET',
    dataType: 'json',
    context: document.body
  }).done(
    function(data){
      data = JSON.parse(data);

      data.forEach(function(d)
      {
        renderedHtmlView = renderLi({spot_title:d.title, description:d.description, image_url:d.image_url});
        $destination.append(renderedHtmlView);
      });

    }
  );

  $.ajax({
    url:"/spots/search/all",
    method:'GET',
    dataType: 'json',
    context: document.body
  }).done(
    function(data){
      data = JSON.parse(data);

      data.forEach(function(d)
      {
        renderedHtmlView = renderLi({spot_title:d.title, description:d.description, image_url:d.image_url});
        $destination.append(renderedHtmlView);
      });

    }
  );
*/
  $("#btn-search").on("click", function(evt){
    document.location.href="/spots/search/all?tags=" + $("#input-search").val();
  });

  $("#btn-advanced").on("click", function(evt){
    event.preventDefault();
    var defaultTags = $("[name=tags]:checked").map(function(){
      return $(this).val();
    }).get().join();

    $.ajax({
      url:"/spots/search/advanced",
      method:'GET',
      dataType: 'json',
      data: {"defaultTags":defaultTags, "additionalTags":$("#additional-tags").val()},
      context: document.body
    }).done(
      function(data){
        spots = JSON.parse(data);

        $destination.html("");
        renderedHtmlView = renderLi({tags: spots});
        $destination.append(renderedHtmlView);

      }
    );
  });

  $('#input-search').keypress(function (e) {
    if (e.which == 13) {
      document.location.href="/spots/search/all?tags=" + $("#input-search").val();
      return false;
    }
  });

  $('#upvote').on("click",function(){
    vote($(this).attr("data-id"),$(this).attr("data-value"));
  })

  $('#downvote').on("click",function(){
    vote($(this).attr("data-id"),$(this).attr("data-value"));
  })

  $("[name=btn-advanced-delete]").on("click",function(){
    $.ajax({
      url:"/spots/" + $(this).attr("data-id"),
      method:'DELETE',
    }).done(
      function(data){
        $("#"+JSON.parse(data)).remove();
      }
    );
  })

  $("#btn-advanced-edit").on("click",function(){
    alert("edit")
  })

  function vote(id,value)
  {
    $.ajax({
      url:"/spots/" + id + "/vote",
      method:'GET',
      dataType: 'json',
      data: {"vote": value},
      context: document.body
    }).done(
      function(data){
        rating = JSON.parse(data);

        $destination = $('#rating');
        $destination.html(rating);
      }
    );
  }
})
