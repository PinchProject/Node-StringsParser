#Node-StringsParser

```
npm install node-stringsparser
```

##How to use
```
var StringsParser = require('node-stringsparser');

var parser = new StringsParser('strings here', {
  'onError':function(err){
    //do something
  },
  'onKeyFound':function(key){
    //do something
  },
  'onValueFound':function(value){
    //do something
  },
  'onCommentFound':function(comment){
    //do something
  },
  'onEnd':function(){
    //do something
  }
});
parser.process();
```
