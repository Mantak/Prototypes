function KeyBoard() {
  this.num     = 0;
  this.showing = true;
  this.body      = $('#page');
  this.payZone   = $('#pay-input-zone');
  this.psZone    = $('#ps-input-zone');
  this.board     = $('#pay-board');
  this.numDom    = $('#pay-input');
  this.cleanDom  = $('#pay-input-clean');
  this.submitDom = $('.pay-btn');
  const _this = this;
  if (this.showing) {
    _this.board.addClass('show');
  }
  this.body.on('click', function() {
    _this.hide();
  });
  this.payZone.on('click', function() {
    window.event.stopPropagation();
    _this.show();
  });
  this.psZone.on('click', function() {
    window.event.stopPropagation();
    _this.showPs();
  });
  this.cleanDom.on('click', function() {
    window.event.stopPropagation();
    _this.clean();
  });
  _this.board.on('click', 'i', function() {
    window.event.stopPropagation();
    const num = $(this).data('num');
    switch (num) {
      case 'del':
        _this.delete();
        break;
      case 'submit':
        _this.submit();
        break;
      default:
        _this.add(num);
    }
  });
}
KeyBoard.prototype.show = function() {
  const _this = this;
  if (!_this.showing) {
    _this.showing = true;
    setTimeout(function() {
      _this.board.addClass('show');
    }, 200);
  }
};
KeyBoard.prototype.hide = function() {
  if (this.showing) {
    this.showing = false;
    this.board.removeClass('show');
  }
};
KeyBoard.prototype.add = function(num) {
  const dom = this.numDom;
  const option = { integer: 5, decimal: 2};
  const str = dom.text();
  if (str === '') {
    if (num === '.') {
      dom.text('0.');
      return;
    }
  } else if (str === '0') {
    if (num !== '.') return;
  } else if (str.indexOf('.') > -1) {
    if (num === '.') return;
    if (str.substring(str.indexOf('.') + 1, str.length).length === option.decimal) return;
  } else if (num !== '.') {
    if (str.length === option.integer) return;
  }
  this.num = str + num;
  dom.text(this.num);
  this.submitDom.addClass('active');
};
KeyBoard.prototype.delete = function() {
  const dom = this.numDom;
  const str = dom.text().trim();
  if (str !== '') {
    dom.text(str.substring(0, str.length - 1));
    if (dom.text() === '' || dom.text() === '0.') {
      this.submitDom.removeClass('active');
      this.num = 0;
    } else {
      this.num = dom.text();
    }
  }
};
KeyBoard.prototype.clean = function() {
  this.num = 0;
  this.numDom.text('');
  this.submitDom.removeClass('active');
};
KeyBoard.prototype.showPs = function() {
  $('#ps-input-zone').addClass('ps-input-zone');
  $('#ps-tips').hide();
  $('#ps-input').show().focus();
  this.hide();
};
KeyBoard.prototype.submit = function() {
  if (this.submitDom.hasClass('active')) {
    const mount = parseFloat(this.num);
    alert(mount);
  }
};
