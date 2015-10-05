SQL.Row.prototype.toggleCollapsed = function() {
	if (!this.expanded) {
		this.expand();
	} else {
		this.collapse();
	}
}

SQL.TableManager.prototype.rClick = function(e) {

  OZ.Event.prevent(e);

  var scroll = OZ.DOM.scroll();
  var x = e.clientX + scroll[0];
  var y = e.clientY + scroll[1];

  var newtable = this.owner.addTable(_('newtable'), x, y);

  var typeOwner = this.owner.options.owner.options.owner;

  var r = newtable.addRow('id', {
		size: 11,
    ai: true,
    nll: false,
    type: typeOwner.getTypeIndex('Int')
  });
  var k = newtable.addKey('PRIMARY', '');
  k.addRow(r);

  newtable.addRow('name', {
    type: typeOwner.getTypeIndex('nVarchar'),
    size: '150',
    def: null,
    nll: false,
    ai: false,
  });
  newtable.addRow('description', {
    type: typeOwner.getTypeIndex('nVarchar'),
    size: 'MAX',
    def: null,
    nll: true,
    ai: false,
  });
  newtable.addRow('created', {
    type: typeOwner.getTypeIndex('Datetime'),
    def: null,
    nll: true,
    ai: false,
    comment: 'Date of row creation'
  });
  newtable.addRow('modified', {
    type: typeOwner.getTypeIndex('Datetime'),
    def: null,
    nll: true,
    ai: false,
    comment: 'Date of last row update'
  });
  newtable.addRow('trashed', {
    type: typeOwner.getTypeIndex('Datetime'),
    def: null,
    nll: true,
    ai: false,
    comment: 'Date trashed on'
  });

  this.select(newtable);
  newtable.owner.tableManager.selection[0].owner.tableManager.edit();

};

SQL.TableManager.prototype.press = function(e) {
	var target = OZ.Event.target(e).nodeName.toLowerCase();
	if (target == "textarea" || target == "input") { return; } /* not when in form field */

	if (this.owner.rowManager.selected) { return; } /* do not process keypresses if a row is selected */

	// if (!this.selection.length) { return; } /* nothing if selection is active */

	switch (e.keyCode) {
    case 65:
      if (e.ctrlKey) {
        alert('ok');
        var tables = this.owner.tables;
        for (var i = 0; i<tables.length; i++){
          tables[i].select();
        }
        this.processSelection();
        break;
      }
		case 46:
      if (this.selection.length) {
  			this.remove();
  			OZ.Event.prevent(e);
      }
		break;
	}
}

SQL.TableManager.prototype.conception = function(e) {
	return true;
}

SQL.RowManager.prototype.press = function(e) {
	if (!this.selected) { return; }

	var target = OZ.Event.target(e).nodeName.toLowerCase();
	if (target == "textarea" || target == "input") { return; } /* not when in form field */

	switch (e.keyCode) {
    case 65:
      this.owner.tableManager.addRow();
      OZ.Event.prevent(e);
		case 38:
      if (e.ctrlKey) {
  			this.up();
  			OZ.Event.prevent(e);
      }
		break;
		case 40:
      if (e.ctrlKey) {
  			this.down();
  			OZ.Event.prevent(e);
      }
		break;
		case 46:
			this.remove();
			OZ.Event.prevent(e);
		break;
		case 13:
		case 27:
			this.selected.collapse();
		break;
	}
}
