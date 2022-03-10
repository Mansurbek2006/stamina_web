const latinLetters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const symbols = ["@", "#", "$", "%", "&", "-", "+", "(", ")", "*", "\"", "'", ":", ";", "!", "?", "~", "`", "\\", "{", "}", "[", "]", "=", "×", "÷", ",", "_", "/", ".", " "];
const cyrillicLetters = ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Ё"];

//get symbols
let all = document.querySelectorAll('.form-check-input');
all.forEach(e => e.addEventListener('click', () => {
	if (!e.hasAttribute('checked')) {
		e.setAttribute('checked', '');
	} else {
		e.removeAttribute('checked');
	}
}))


let allSym = [];
const Comision = () => {
	allSym = [];
	if (document.getElementById('SmallLetters').hasAttribute('checked')) {
		if (document.getElementById('CyrillicLetters').hasAttribute('checked')) {
			cyrillicLetters.map((e) => allSym.push(e.toLowerCase()));
		}
		if (document.getElementById('LatinLetters').hasAttribute('checked')) {
			latinLetters.map((e) => allSym.push(e.toLowerCase()));
		}
	}
	if (document.getElementById('BigLetters').hasAttribute('checked')) {
		if (document.getElementById('CyrillicLetters').hasAttribute('checked')) {
			allSym = allSym.concat(cyrillicLetters);
		}
		if (document.getElementById('LatinLetters').hasAttribute('checked')) {
			allSym = allSym.concat(latinLetters);
		}
	}
	if (document.getElementById('Numbers').hasAttribute('checked')) {
		allSym = allSym.concat(numbers);
	}
	if (document.getElementById('Symbols').hasAttribute('checked')) {
		allSym = allSym.concat(symbols);
	}
}

//get one symbol
oneSym = () => {
	if(allSym[0]){
		return allSym[Math.floor(Math.random() * allSym.length)];
	}else{
		alert("Kechirasiz hurmatli foydalanuvchi, ushbu operatsiyani amalga oshirib bo'lmaydi. Xatolik yuz berdi");
		window.location='/';
		return '';
	}
}

//set sym list one symbol
updateSym = (symList = []) => {
		do {
			symList.push(oneSym());
		} while (symList.length != 15);
		return symList;
}

//Dom elements//
let btnStart = document.querySelector('#start');
let btnExit = document.querySelector('#exit');
let textArea = document.querySelector('#text');

//OneClicking//
click = 0;
let seconds = 0;
btnExit.addEventListener('click', () => {
	if (click == 0) {
		document.body.innerHTML = '<h1>:) TUGADI :P </h1>';
	}

})

document.body.addEventListener('keypress', () => {
	if (click == 0) {
		click += 1;
		Start();
	}
});

btnStart.addEventListener('click', (e) => {
	if (click == 0) {
		click += 1;
		Start()
	} else if (click == 1) {
		localStorage.setItem(time, seconds);
		click += 1;
		e.target.setAttribute('class', 'btnmh');
	} else if (click != 0 && click != 1) {
		seconds = Number(localStorage.getItem(time));
		click = 1;
		e.target.setAttribute('class', 'btnm');
		localStorage.clear();
	}
});

const Start = () => {
	let text = '';
	if (click == 1) {
		Timer();
		Rename();
		Keyboard();
		Comision();
		symList = updateSym();
		symList.map((e) => {
			text += e;
		});
		textArea.value = text;
		Continue()

	} else {
		Continue();
	}
}
const Continue = () => {
	if (click != 1) {
		textArea.value += oneSym();
	}
}

const Rename = () => {
	btnStart.value = 'Pauza';
	btnStart.setAttribute('id', 'pause');
	btnExit.value = "Stop";
	btnExit.setAttribute('id', 'stop');
}
const time = 1;
const Timer = () => {
	setInterval(function() {
		seconds++
	}, 1000);
	return seconds;
}


const getDeviceType = () => {
	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}
	if (
		/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
			ua
		)
	) {
		return "mobile";
	}
	return "desktop";
};

const Keyboard = () => {
	const device = getDeviceType();
	if (device == 'mobile') {
		//open keyboard
	} else if (device == 'tablet') {
		const openKey = confirm("Klaviatura ochilmoqda...");
		if (openKey) {
			//open keyboard
		}
	}
}

let Trues=0;
let Falses=0;
document.querySelector('input').addEventListener('keypress',(e)=>{
	if (e.code==textArea.value[0]){
		alert('snnsn')
	}
})
