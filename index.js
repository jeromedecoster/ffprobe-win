var exec = require('child_process').exec;
var exists = require('fs').existsSync;
var ffprobe = __dirname + '/ffprobe.exe';

function video(o) {
  var obj = {};
  obj.index = parseFloat(o.index);
  obj.codec_name = o.codec_name;
  obj.codec_long_name = o.codec_long_name;
  obj.codec_type = o.codec_type;
  obj.width = parseFloat(o.width);
  obj.height = parseFloat(o.height);
  obj.duration = (o.duration != 'N/A') ? parseFloat(o.duration) : 'N/A';
  if (o.tag_language) obj.tag_language = o.tag_language;
  return obj;
}

function audio(o) {
  var obj = {};
  obj.index = parseFloat(o.index);
  obj.codec_name = o.codec_name;
  obj.codec_long_name = o.codec_long_name;
  obj.profile = o.profile;
  obj.codec_type = o.codec_type;
  obj.sample_rate = parseFloat(o.sample_rate);
  obj.channels = parseFloat(o.channels);
  obj.duration = (o.duration != 'N/A') ? parseFloat(o.duration) : 'N/A';
  if (o.tag_language) obj.tag_language = o.tag_language;
  if (o.tag_title) obj.tag_title = o.tag_title;
  return obj;
}

function subtitle(o) {
  var obj = {};
  obj.index = parseFloat(o.index);
  obj.codec_name = o.codec_name;
  obj.codec_long_name = o.codec_long_name;
  obj.codec_type = o.codec_type;
  if (o.tag_language) obj.tag_language = o.tag_language;
  if (o.tag_title) obj.tag_title = o.tag_title;
  return obj;
}

function parseStreams(str) {
  return str.split('[STREAM]').filter(function(e) {
      return e.length > 0;
    }).map(function(e) {
      return e.split('\n').slice(0, -1).map(function(e) {
        return e.trim().split('=');
      });
    }).map(function(e) {
      var obj = {};
      for (var k in e) {
        obj[e[k][0].toLowerCase().replace(/\W/g, '_')] = e[k][1];
      }
      switch(obj.codec_type) {
        case 'video':
          return video(obj);
        case 'audio':
          return audio(obj);
        case 'subtitle':
          return subtitle(obj);
      }
    });
}

function format(o) {
  var obj = {};
  obj.nb_streams = parseFloat(o.nb_streams);
  obj.format_name = o.format_name;
  obj.format_long_name = o.format_long_name;
  obj.duration = parseFloat(o.duration);
  obj.size = parseFloat(o.size);
  var tmp = [o.tag_artist, o.tag_band, o.tag_author].filter(function(e) {
    return typeof e == 'string' && e.length > 0;
  });
  if (tmp.length > 0) obj.tag_artist = tmp[0];
  if (o.tag_album) obj.tag_album = o.tag_album;
  if (o.tag_title) obj.tag_title = o.tag_title;
  return obj;
}

function parseFormat(str) {
  var obj = {};
  str.split('\n').filter(function(e) {
    return e.indexOf('=') != -1;
  }).map(function(e) {
    return e.trim().split('=');
  }).forEach(function(e) {
    obj[e[0].toLowerCase().replace(/[\W]/g, '_')] = e[1];
  });
  return format(obj);
}

exports.streams = function(src, cb) {
  if (!exists(src)) {
    cb(new Error('ffprobe-win: source not found'));
    return;
  }

  exec(ffprobe + ' -i "' + src + '" -show_streams -v error',
    function (err, stdout, stderr) {
    if (err !== null) {
      cb(new Error('ffprobe-win: parsing error'));
      return;
    }
    cb(null, parseStreams(stdout));
  })
}

exports.format = function(src, cb) {
  if (!exists(src)) {
    cb(new Error('ffprobe-win: source not found'));
    return;
  }

  exec(ffprobe + ' -i "' + src + '" -show_format -v error',
    function (err, stdout, stderr) {
    if (err !== null) {
      cb(new Error('ffprobe-win: parsing error'));
      return;
    }
    cb(null, parseFormat(stdout));
  })
}
