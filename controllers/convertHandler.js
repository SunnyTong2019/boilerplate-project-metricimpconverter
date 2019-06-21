/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    var regExp=/[a-z]/i;
    var firstCharacter=regExp.exec(input);
    var index=input.indexOf(firstCharacter);
    var numString=input.slice(0,index);
    var regExp2=/\//;
    
    if (numString=='')
    { result=1; }
    else
    {
      if (regExp2.test(numString))
      { 
        var fractionIndex=numString.indexOf('/');
        var fractionLastIndex=numString.lastIndexOf('/');
        
        if (fractionIndex==fractionLastIndex)
        {
          var numBefore=numString.slice(0,fractionIndex);
          var numAfter=numString.slice(fractionIndex+1);
          result=numBefore/numAfter;
        }
        else { result=0; } // number=0 is handled as invalid number in routes/api.js.
      }
      else
      { result=parseFloat(numString); } 
     }  
    
    return result;
  };
  
  
  this.getUnit = function(input) {
    var result;
    var regExp=/[a-z]/i;
    var firstCharacter=regExp.exec(input);
    var index=input.indexOf(firstCharacter);
    var unit=input.slice(index);
    var validUnit = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    
    if (validUnit.includes(unit))
    { result=unit.toLowerCase(); }
    else 
    { result='invalid'; }
    
    return result;
    
  };
  
  
  this.getReturnUnit = function(initUnit) {
    var result;
    
    switch(initUnit)
    {
      case 'lbs': result='kg'; break;
      case 'kg': result='lbs'; break;
      case 'mi': result='km'; break;
      case 'km': result='mi'; break;
      case 'gal': result='l'; break;
      case 'l': result='gal'; break;
      default: result='invalid'; break;
    }
    
    return result;
  };
  
    
  this.spellOutUnit = function(unit) {
    var result;
    
    switch(unit)
    {
      case 'lbs': result='pounds'; break;
      case 'kg': result='kilograms'; break;
      case 'mi': result='miles'; break;
      case 'km': result='kilometers'; break;
      case 'gal': result='gallons'; break;
      case 'l': result='liters'; break;
      default: result='invalid'; break;
    }
    
    return result;
  };
  
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    switch(initUnit)
    {
      case 'lbs': result=initNum*lbsToKg; break;
      case 'kg': result=initNum/lbsToKg; break;
      case 'mi': result=initNum*miToKm; break;
      case 'km': result=initNum/miToKm; break;
      case 'gal': result=initNum*galToL; break;
      case 'l': result=initNum/galToL; break;
      default: result=0; break;  
      // Above line is required for the input scenario of invalid unit. 
      // When input unit is invalid, set returnNum to 0, so you won't get an error saying something about "undefined property of toFixed".
      // Because if returnNum is undefined, it will cause error when use returnNum.toFixed(5) (in getString method).
    }
    
    return result;
  };
  
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    result=initNum+" "+this.spellOutUnit(initUnit)+" converts to "+returnNum.toFixed(5)+" "+this.spellOutUnit(returnUnit);
    
    return result;
  };
  
}

module.exports = ConvertHandler;
