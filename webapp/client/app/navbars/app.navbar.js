Template.navbarHeader.events({
  'click #navbarBrandLink':function(){
    //$('#westPanel').sidebar('toggle');
    toggleWestPanel();
  },
  'click #keybindingsLink':function(){
    $('#keybindingsModal').modal("show");
  },
  'click #promptLink':function(){
    $('#promptModal').modal("show");
  },
  'click #confirmLink':function(){
    $('#confirmModal').modal("show");
  },
  'click #errorToggleLink':function(){
    $('#errorPanel').sidebar('toggle');
  },
  'click #eastPanelToggleLink':function(){
    //$('#eastPanel').sidebar('toggle');
    toggleEastPanel();
  }

});


Template.navbarFooter.events({
  'click #westPanelToggle':function(){
    toggleWestPanel();
  },
  'click #eastPanelToggle':function(){
    toggleEastPanel();
  }
});
