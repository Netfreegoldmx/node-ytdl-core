const readline = require('readline');
const ytdl     = require('..');
const ffmpeg   = require('fluent-ffmpeg');

let id = 'sDLsSQf3Hc0';

let stream = ytdl(id, {
  quality: 'highestaudio',
  //filter: 'audioonly',
});

let start = Date.now();
ffmpeg(stream)
  .audioBitrate(128)
  .save(`${__dirname}/${id}.mp3`)
  .on('progress', (p) => {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${p.targetSize}kb downloaded`);
  })
  .on('end', () => {
    console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
  });
