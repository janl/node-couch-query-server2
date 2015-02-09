var ndj = require('ndjson');
var through = require('through2')
 
process.stdin.setEncoding('utf8');
 
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
 
var send = through.obj(function(data, enc, done) {
  // console.error('data: ', data);
  setTimeout(function() {
    send.push(data);
    done()
  }, getRandomInt(1, 100));
});
 
process
  .stdin
  .pipe(ndj.parse())
  .pipe(send)
  .pipe(ndj.serialize())
  .pipe(process.stdout)

// var ndj = require('ndjson');
//
// process.stdin.setEncoding('utf8');
//
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }
//
// var nd_out = ndj.serialize()
//   .pipe(process.stdout);
//
// var send = function(data) {
//   // console.error('data: ', data);
//   setTimeout(function() {
//     nd_out.write(JSON.stringify(data));
//     // process.stdout.write(JSON.stringify(data) + '\n');
//   }, getRandomInt(1, 100));
// };
//
// process
//   .stdin
//   .pipe(ndj.parse())
//   .on('data', send);

// process.stdin.on('data', function(buf) {
//   var chunk = buf.toString();
//   var send = function(data) {
//     setTimeout(function() {
//       process.stdout.write(data + "\n");
//     }, getRandomInt(1, 100));
//   }
//
//     // console.error('incoming: "', chunk, "'");
//     if(chunk) {
//       // console.error('processing: "', chunk, "'");
//       var lines = chunk.split('\n');
//       // console.error(lines);
//       // console.error(typeof lines);
//       lines.forEach(function(line) {
//         if(line === '') { return; }
//         // console.error('parsing line: "%s"', line);
//         var json = JSON.parse(line);
//         json.time =  (new Date()).getTime();
//         var response = JSON.stringify(json);
//         send(response);
//       });
//     }
// });

// process.stdin.on('end', function() {
//   console.err('end');
// });
//
// process.stdin.on('error', function(error) {
//   console.err(error);
// });
