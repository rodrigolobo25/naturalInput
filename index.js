const translate = require('@vitalets/google-translate-api');
const natural = require('natural');
var classifier = new natural.BayesClassifier();

var trainingData = [
  {text:'go up', key: 'UP'},
  {text:'go north', key: 'UP'},
  {text:'Go North', key: 'UP'},
  {text:'Go Up', key: 'UP'},
  {text:'above', key: 'UP'},
  {text:'above', key: 'UP'},
  {text:'above', key: 'UP'},
  {text:'above', key: 'UP'},
  {text:'above', key: 'UP'},
  {text:'above', key: 'UP'},
  {text:'go above', key: 'UP'},
  {text:'upwards', key: 'UP'},
  {text:'top', key: 'UP'},

  {text:'go down', key: 'DOWN'},
  {text:'down', key: 'DOWN'},
  {text:'go south', key: 'DOWN'},
  {text:'below', key: 'DOWN'},
  {text:'move downwards', key: 'DOWN'},
  {text:'bottom', key: 'DOWN'},
  {text:'the lowest', key: 'DOWN'},

  {text:'go east', key: 'RIGHT'},
  {text:'go right', key: 'RIGHT'},
  {text:'go to the right', key: 'RIGHT'},
  {text:'move right', key: 'RIGHT'},
  {text:'move to the right', key: 'RIGHT'},
  {text:'to the rightmost', key: 'RIGHT'},
  {text:'right-handed', key: 'RIGHT'},

  {text:'go west', key: 'LEFT'},
  {text:'move left', key: 'LEFT'},
  {text:'move to the left', key: 'LEFT'},
  {text:'to the leftmost', key: 'LEFT'},
  {text:'left-handed', key: 'LEFT'},

  {text:'run away!', key: 'RUN'},
  {text:'get out of there', key: 'RUN'},
  {text:'do not go that way', key: 'RUN'},
  {text:'escape from there', key: 'RUN'},
  {text:'escape', key: 'RUN'},
  {text:'flee', key: 'RUN'},
  {text:'evade the sitation', key: 'RUN'},

  {text:'pause', key: 'PAUSE'},
  {text:'pause', key: 'PAUSE'},
  {text:'pause', key: 'PAUSE'},
  {text:'pause', key: 'PAUSE'},
  {text:'pause', key: 'PAUSE'},
  {text:'pause', key: 'PAUSE'},
  {text:'pause', key: 'PAUSE'},

  {text:'enter', key: 'ENTER'},
  {text:'start', key: 'ENTER'},
  {text:'start game', key: 'ENTER'},
  {text:'enter', key: 'ENTER'},
  {text:'start', key: 'ENTER'},
  {text:'start game', key: 'ENTER'},

  {text:'quit', key: 'QUIT'}
]

trainingData.forEach(item =>{
  classifier.addDocument(item.text, item.key);
});
classifier.train();

var testData = [
  'arriba',
  'pausa',
  'go right',
  'get the left pill',
  'escapa'
]

testData.forEach(item=>{
  translate(item, {to:"en"}).then(res=>{
    //returns an object which holds an array of keys to values(which is a integer of how sure the intent was capture)
    var dirGuess = classifier.getClassifications(res.text);
    
    //finding the key with the maxt value and checking if it passes our tresshold
    var max={label:'',value:0};
    dirGuess.forEach(guess=>{
      if(guess.value > max.value){
        max = guess;
      }
    })
    if(max.value < 0.02){
      console.log(item, ' -->', 'NO INSTRUCTION CAPTURED','\n');
    }else{
      console.log(item, ' ', res.text, ' -->', max.label, ' ', max.value, '\n');
    }
  });
})
