SQL.TableManager.prototype.rClick = function(e) {
	OZ.Event.prevent(e);

	var scroll = OZ.DOM.scroll();
	var x = e.clientX + scroll[0];
	var y = e.clientY + scroll[1];

	newtable = this.owner.addTable(_("newtable"),x,y);
	
	var r = newtable.addRow("id",{ai:true});
	var k = newtable.addKey("PRIMARY","");
	k.addRow(r);

	newtable.addRow("created", {type:12, size: "", def: null, nll: false, ai: false, comment: "Date of row creation"});
	newtable.addRow("modified", {type:12,size: "", def: null, nll: false, ai: false, comment: "Date of last row update"});
	newtable.addRow("trashed", {type:12,size: "", def: null, nll: false, ai: false, comment: "Date trashed on"});

};