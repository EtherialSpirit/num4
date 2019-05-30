var board = document.getElementById('board');
var N = 9;
var literals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
for (var i = N - 1; i > 0; i--) {
  for (j = 1; j < N; j++) {
    if (i & 1)
      board.innerHTML += '<div class="field ' + (j & 1 ? 'dark' : 'light') + '" number="' + literals[j - 1] + i + '" id="' + literals[j - 1] + i + '"></div>';
    else
      board.innerHTML += '<div class="field ' + (j & 1 ? 'light' : 'dark') + '" number="' + literals[j - 1] + i + '" id="' + literals[j - 1] + i + '"></div>';
  }
}

board.onclick = function(event) {
  
	var darkField = document.getElementsByClassName('field dark');
	var darkLight = document.getElementsByClassName('field light');
	for(var i1=0;i1<darkField.length;i1++)darkField[i1].style.background='#000000';
	for(var i2=0;i2<darkLight.length;i2++)darkLight[i2].style.background='#FFFFFF';
	  		
  var field = event.target;
  var fieldNumber = field.getAttribute('number');
	var a1 = event.target.style.backgroundColor='blue';  


  //разбиваем позицию фигуры на отдельные значения
  const positionX = (fieldNumber.split(""))[1];
  const positionY = (fieldNumber.split(""))[0];

  const positionY1 = parseInt(letterValue(positionY));
  const positionX1 = parseInt(positionX);
  
  const reg = /^[a-h]{1}[1-8]{1}$/;
	
  //помещаем вычисления хода в массив
  var positionArray = [];
  positionArray[0] = [(String.fromCharCode(96 + (positionY1 - 2))) + (positionX1 - 1)];
  positionArray[1] = [(String.fromCharCode(96 + (positionY1 - 2))) + (positionX1 + 1)];
  positionArray[2] = [(String.fromCharCode(96 + (positionY1 + 2))) + (positionX1 - 1)];
  positionArray[3] = [(String.fromCharCode(96 + (positionY1 + 2))) + (positionX1 + 1)];
  positionArray[4] = [(String.fromCharCode(96 + (positionY1 - 1))) + (positionX1 - 2)];
  positionArray[5] = [(String.fromCharCode(96 + (positionY1 - 1))) + (positionX1 + 2)];
  positionArray[6] = [(String.fromCharCode(96 + (positionY1 + 1))) + (positionX1 - 2)];
  positionArray[7] = [(String.fromCharCode(96 + (positionY1 + 1))) + (positionX1 + 2)];

  //в цикле проверяем регулярным выражением подходит ли нам вычисление хода
  for (var i = 0; i < positionArray.length; i++) {
    var str = String(positionArray[i]);

    var clean = str.search(reg);
    if (clean == -1) {
      positionArray[i] = '';
    }
  }
  var positionArrayFinal = positionArray.filter(element => element !== '');

  for (var a=0;a<positionArrayFinal.length;a++) {
  	
    var elem = String(positionArrayFinal[a]);
  
    document.getElementById(elem).style.background='green';
	 
      
  }

  field.innerHTML = field.getAttribute('number');
}

function letterValue(str) {
  var anum = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8
  }
  
  if (str.length == 1) return anum[str] || ' ';
  return str.split('').map(letterValue);
}

document.querySelector('#close').onclick = function() {
  dialog.close();
};
