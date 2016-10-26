module.exports = function (data) {  
    return `
    window.orphio = window.orphio || function() {
    var options = {};

    var defaultOptions = {
      url: '',
      callback: function() {
        console.log('Thank you! Misprint was sent');
      },
      maxLength: 80,
      minLength: 4,
      resource: ''
    };

    var ajaxPost = function(url, data, callback) {
      if (window.XMLHttpRequest == undefined) {
        return;
      }

      var request = new XMLHttpRequest();
      request.open('POST', url, true);

      request.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            var resp = this.responseText;
            if (callback != undefined) {
              callback(resp);
            }
          } else {
            // error callback
          }
        }
      };

      var query = [];
      for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      }

      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send(query.join('&'));
      request = null;
    }

    var getSelectedText = function() {
      var selection = window.getSelection();
      var range = selection.getRangeAt(0);
      var padding = 30;
      var leftStartIdx = range.startOffset - padding;
      var leftEndIdx   = range.startOffset;
      var left  = (range.startContainer.textContent || "").substring(leftStartIdx, leftEndIdx); 
      var rightStartIdx = range.endOffset;
      var rightEndIdx   = range.endOffset + padding;
      var rightContent  = range.endContainer.textContent || "";
      var right = rightContent.substring(rightStartIdx, rightEndIdx);
      return {
        left: left,
        m: selection.toString(),
        right: right
      }
    }
    var getInfo = function() {
      var text = "textContent" in document.body ? "textContent" : "innerText";
      var title = document.getElementsByTagName("h1")[0][text] || document.title
      return {
        window: JSON.stringify(window.screen),
        title: title,
        url: location.href,
        timestamp: new Date().getTime()
        }
    }
    var onKeyPress = function() {
      var e = arguments[0] || window.event;
      var code = e.keyCode ? e.keyCode : (e.which ? e.which : e.charCode);

      if (e.ctrlKey && (code == 13 || code == 10)) {
        sendReport(getSelectedText(),  getInfo());
      }
    }

    var sendReport = function(m, info) {
      if (m !== undefined) {
        options.callback();
        ajaxPost(options.url, {
          url: info.url,
          title: info.title,
          resource: options.resource,
          m: m.m,
          left: m.left,
          right: m.right,
          timestamp: info.timestamp,
          options: info.window
        });
      }
    }

    var init = function(opts) {
      options.url = opts.url || defaultOptions.url;
      options.callback = opts.callback || defaultOptions.callback;
      options.minLength = opts.minLength || defaultOptions.minLength;
      options.maxLength = opts.maxLength || defaultOptions.maxLength;
      options.resource = opts.resource || defaultOptions.resource;
      document.onkeypress = onKeyPress;
    }

    return {
      'init': init
    }
  }();
  try {
    orphio.init(${data})
  } catch (e) {
    console.log(e);
  }`
}