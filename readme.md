# ffprobe-win

Get stream/format informations of audio/video files on Windows with <a href="http://ffmpeg.zeranoe.com/builds/" target="_blank">ffprobe version git-10012fa (2014-06-14) 64bit</a>

## Install

Install with <a href="http://nodejs.org/" target="_blank">npm</a> directly from the <a href="https://github.com/jeromedecoster/ffprobe-win" target="_blank">github repository</a>

```
npm install --save-dev jeromedecoster/ffprobe-win
```

## API

```js
streams(src, cb(err, streams));
```

or

```js
format(src, cb(err, format));
```

## Example

```js
var ffprobe = require('ffprobe-osx');

function done(err, streams) {
  if (err) throw err;
  console.log(streams);
}

ffprobe.streams('./source.mkv', done);
```

Output:

```js
[ { index: 0,
    codec_name: 'h264',
    codec_long_name: 'H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10',
    codec_type: 'video',
    width: 1920,
    height: 800,
    duration: 'N/A',
    tag_language: 'eng' },
  { index: 1,
    codec_name: 'dca',
    codec_long_name: 'DCA (DTS Coherent Acoustics)',
    profile: 'DTS',
    codec_type: 'audio',
    sample_rate: 48000,
    channels: 6,
    duration: 'N/A',
    tag_language: 'fre',
    tag_title: 'french' },
  { index: 2,
    codec_name: 'dca',
    codec_long_name: 'DCA (DTS Coherent Acoustics)',
    profile: 'DTS',
    codec_type: 'audio',
    sample_rate: 48000,
    channels: 6,
    duration: 'N/A',
    tag_language: 'eng',
    tag_title: 'english' },
  { index: 3,
    codec_name: 'subrip',
    codec_long_name: 'SubRip subtitle',
    codec_type: 'subtitle',
    tag_language: 'fre',
    tag_title: 'french forced' },
  { index: 4,
    codec_name: 'subrip',
    codec_long_name: 'SubRip subtitle',
    codec_type: 'subtitle',
    tag_language: 'fre',
    tag_title: 'french' } ]
```

or

```js
var ffprobe = require('ffprobe-osx');

function done(err, format) {
  if (err) throw err;
  console.log('format:', format);
}

ffprobe.format('./source.mp3', done);
```

Output:

```js
{ nb_streams: 1,
  format_name: 'mp3',
  format_long_name: 'MP2/3 (MPEG audio layer 2/3)',
  duration: 15.098776,
  size: 605439,
  tag_artist: 'CSS',
  tag_album: 'Cansei De Ser Sexy',
  tag_title: 'Let\'s Make Love And Listen To Death From Above' }
```
