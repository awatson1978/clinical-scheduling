

$(window).resize(function(evt) {
  try{
    Session.set("resized", new Date());
  }catch(err){
    console.log(err);
  }
});
