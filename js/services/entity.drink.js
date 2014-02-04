define(function(require,exports,module){
  module.exports.listAll=function(callBack){
    var list=[
      {name:"sample drink 0",code:"0"},
      {name:"sample drink 1",code:"1"},
      {name:"sample drink 2",code:"2"},
      {name:"sample drink 3",code:"3"},
      {name:"sample drink 4",code:"4"},
      {name:"sample drink 5",code:"5"},
      {name:"sample drink 6",code:"6"},
      {name:"sample drink 7",code:"7"},
      {name:"sample drink 8",code:"8"},
      {name:"sample drink 9",code:"9"}
    ]
    callBack(list);
  }
})
