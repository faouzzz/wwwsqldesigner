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

  newtable.select();
  this.selection.dispatch('dblclik');

};
