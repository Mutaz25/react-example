
var   quiz$= [
   {
     id: "",
     quizText: "",
     question: "",
     answers: [
       {
         id: "",
         ansText: ""
       }
       
     ],
     correctAns: ""
   
   }
 ];

if (!library)
var library = {};

library.json = {
replacer: function(match, pIndent, pKey, pVal, pEnd) {
   var key = '<span class=json-key>';
   var val = '<span class=json-value>';
   var str = '<span class=json-string>';
   var r = pIndent || '';
   if (pKey)
      r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
   if (pVal)
      r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
   return r + (pEnd || '');
   },
prettyPrint: function(obj) {
   var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
   return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(jsonLine, library.json.replacer);
   }
};


// $('#account').html(library.json.prettyPrint(account));
// $('#planets').html(library.json.prettyPrint(planets));


// remove all child nodes from a HTML node
function removeAllChildNodes(parent) {

    if (parent?.firstChild) {
        while (parent.firstChild) {
           parent.removeChild(parent.firstChild);
      }
    }
    
    
  }
  

  
 // Add new css classes, append or overwrite the current css classes
 // this could apply for any objects (HTML DOM)
 function addCssClass(_obj, cssClass, overwrite = false){

    if (overwrite) {
      _obj.className = '';


      if (Array.isArray(cssClass)) {
          cssClass.forEach( _cssClass => {
            _obj.classList.add(_cssClass);
          });
      }else {
        _obj.className = cssClass;
        
      }
      
    }else {

        if (Array.isArray(cssClass)) {
            cssClass.forEach( _cssClass => {
                _obj.classList.add(_cssClass);
              });
        }else {
            _obj.className = _obj.className + ' ' + cssClass;
        }
        
    }
    
  }



  function shuffleArray(array) {

      for (let i = array.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         let temp = {...array[i]};
         array[i] = {...array[j]};
         array[j] = {...temp};
      }
      return array;
  }
 
