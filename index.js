const latinLetters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const symbols = ["@", "#", "$", "%", "&", "-", "+", "(", ")", "*", "\"", "'", ":", ";", "!", "?", "~", "`", "\\", "{", "}", "[", "]", "=", "×", "÷", ",", "_", "/", ".", " "];
const cyrillicLetters = ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Ё"];
let alls=0;
let Time;

//get symbols
let all = document.querySelectorAll('.form-check-input');
all.forEach(e => e.addEventListener('click', () => {
	if (!e.hasAttribute('checked')) {
		e.setAttribute('checked', '');
		e.parentElement.querySelector('.text-muted').innerHTML = 'Yoqil.';
	} else {
		e.removeAttribute('checked');
		e.parentElement.querySelector('.text-muted').innerHTML = "O'chir.";
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
	if (allSym[0]) {
		return allSym[Math.floor(Math.random() * allSym.length)];
	} else {
		alert("Kechirasiz hurmatli foydalanuvchi, ushbu operatsiyani amalga oshirib bo'lmaydi. Xatolik yuz berdi.");
		window.location = '/';
		return '';
	}
}

//set sym list one symbol
updateSym = (symList = []) => {
	do {
		symList.push(oneSym());
	} while (symList.length != (Math.floor(Number(window.innerWidth) / 2) / 20));
	return symList;
}

//Dom elements//
let btnStart = document.querySelector('#start');
let btnStop = document.querySelector('#stop');
let textArea = document.querySelector('#text');
let timeBody = document.querySelector('.time .time_body');
//OneClicking//
let click = 0;
let seconds = 0;
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
		localStorage.setItem('time', seconds);
		click += 1;
		btnStart.innerHTML = '<i class="fa-solid fa-play"></i>';
	} else if (click != 0 && click != 1) {
		seconds = Number(localStorage.getItem('time'));
		click = 1;
		btnStart.innerHTML = '<i class="fa-solid fa-pause"></i>';
		localStorage.clear();
	}
});

btnStop.addEventListener('click',()=>{
	results();
	True=0;
	False=0;
	alls=0;
	click=0;
	localStorage.clear();
	textArea.innerHTML='';
	timeBody.parentElement.setAttribute('class','d-none');
	btnStart.innerHTML='Yana boshlash';
	btnStart.style.color='lime';
	btnStart.style.borderColor='lime';
	btnStop.setAttribute('class','d-none');
	seconds=0;
})

const Start = () => {
	if (click == 1) {
		Timer();
		Rename();
		Keyboard();
		Comision();
		symList = updateSym();
		symList.map((e) => {
			let txt = document.createTextNode(e);
			let p = document.createElement('p');
			p.append(txt);
			textArea.appendChild(p);
		});
		Continue()

	} else {
		Continue();
	}
}
const Continue = () => {
	if(alls==200){
		results();
	}
	if (click != 1) {
		let p = document.createElement('p');
		let txt = document.createTextNode(oneSym());
		p.appendChild(txt)
		textArea.appendChild(p);
		alls+=1;
	}
}

const Rename = () => {
	btnStart.innerHTML = '<i class="fa-solid fa-pause"></i>';
	btnStart.style.color = 'limegreen';
	btnStart.setAttribute('id', 'pause');
	btnStop.setAttribute('class', 'btnm d-inline-block');
	btnStop.style.color = 'crimson';
	timeBody.parentNode.setAttribute('class', 'time d-inline-block')
}
const Timer = () => {
	setInterval(function() {
		seconds++
		if (localStorage.getItem('time')) {
			timeBody.innerHTML = `${Math.floor(Number(localStorage.getItem('time'))/60)}:${Number(localStorage.getItem('time'))%60}`;
			Time=timeBody.textContent;
		} else {
			timeBody.innerHTML = `${Math.floor(seconds/60)}:${seconds%60}`;
			Time=timeBody.textContent;
		}
	}, 1000);
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

let True = 0;
let False = 0;
document.addEventListener('keypress', (e) => {
	if (localStorage.getItem('time') != 0) {
		if (textArea.textContent[-1] == e.code) {
			True += 1;
		} else {
			False += 1;
		}
		Continue()
	}
})


results=()=>{
	let div=document.createElement('div')
	div.setAttribute('class','col-10 col-md-4 col-xl-3');
	let trueText=document.createTextNode(True+' ta');
	let trueP=document.createElement('p')
	trueP.innerText="Tog'ri belgilar:";
	let trueSpan=document.createElement('span');
	trueSpan.appendChild(trueText);
	trueP.appendChild(trueSpan);
	div.appendChild(trueP);
	let falseText=document.createTextNode(False+' ta');
	let falseP=document.createElement('p')
	falseP.innerText="Notog'ri belgilar:";
	let falseSpan=document.createElement('span');
	falseSpan.appendChild(falseText);
	falseP.appendChild(falseSpan);
	div.appendChild(falseP);
	let timeText=document.createTextNode(Time);
	let timeP=document.createElement('p')
	timeP.innerText="Vaqt:";
	let timeSpan=document.createElement('span');
	timeSpan.appendChild(timeText);
	timeP.appendChild(timeSpan);
	div.appendChild(timeP);
	let allText=document.createTextNode(alls+' ta');
	let allP=document.createElement('p')
	allP.innerText="Jami belgilar:";
	let allSpan=document.createElement('span');
	allSpan.appendChild(allText);
	allP.appendChild(allSpan);
	div.appendChild(allP);
	document.querySelector('.row').appendChild(div);
}
