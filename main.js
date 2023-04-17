const keyboard = document.querySelector('.keyboard');
const buttons = keyboard.querySelectorAll('.button__letter')
const newWordButton = document.querySelector('.new-word__button');

const exampleWord = document.querySelector('.example__word');
const inputScreen = document.querySelector('.screen__inside');
const inputLetterTemplate = document.querySelector('#input__letter-template').content.querySelector('.input__letter');


const FINAL_WORDS = [{
    word: 'олег',
    desc: 'Имя мужское'
    }, {
    word: 'пятница',
    desc: 'День недели'
    }, {
    word: 'май',
    desc: 'Месяц'
    }, {
    word: 'рубашка',
    desc: 'Одежда'
    }, {
    word: 'телефон',
    desc: 'С него звонят'
    }, {
    word: 'ауди',
    desc: 'Марка машины'
    }, {
    word: 'тыква',
    desc: 'Овощ'
    }, {
    word: 'пугало',
    desc: 'Стоит на огороде'
    }, {
    word: 'моргенштерн',
    desc: 'Рэпер'
    }, {
    word: 'киркоров',
    desc: 'Певец'
    }, {
    word: 'тяги',
    desc: 'Бархатные'
    }, {
    word: 'инстасамка',
    desc: 'Певица'
    }, {
    word: 'норвегия',
    desc: 'Страна'
    }, {
    word: 'текила',
    desc: 'Алкоголь'
    }, {
    word: 'лиза',
    desc: 'Имя женское'
    }, {
    word: 'гусли',
    desc: 'Музыкальный инструмент'
    }, {
    word: 'фортепиано',
    desc: 'Музыкальный инструмент'
    }, {
    word: 'юнга',
    desc: 'На корабле он есть'
    }, {
    word: 'цезарь',
    desc: 'Салат'
    }, {
    word: 'тюрьма',
    desc: 'Место чтоб сидеть'
    }, {
    word: 'диван',
    desc: 'Место чтоб сидеть'
    }, {
    word: 'окно',
    desc: 'Проем в стене'
}];



const getRandomNumber = (min, max) => {
    const result = Math.random() * (max - min + 1) + min;
    return Math.floor(result);
};


function createIdGenerator (min, max) {
    const previousValues = [];
  
    return function () {
      let currentValue = getRandomNumber(min, max);
      if (previousValues.length > (max - min + 1)) {
        console.error('Исчерпан лимит уникальных идентификаторов');
        return null;
      }
      while (previousValues.includes(currentValue)) {
        currentValue = getRandomNumber(min, max);
      }
      previousValues.push(currentValue);
      return currentValue;
    };
}

const generateIdPhoto = createIdGenerator(1, FINAL_WORDS.length - 1);




const drawInputLetters = (letter) => {
    const letterElement = inputLetterTemplate.cloneNode(true);
    letterElement.querySelector('.input__letter-once').textContent = letter;
    letterElement.setAttribute('data-value', letter);
    inputScreen.append(letterElement);
}


const drawBaseLetters = (word) => {
    for (let i = 0; i < word.length; i++) {
        drawInputLetters(word[i]);
    }
}

let wrongCounter = -1;


const wrongContainer = document.querySelector('.wrong__collector');
const wrongOnce = wrongContainer.querySelectorAll('.wrong__cube');


const clickButtonKeyboardHandler = (evt) => {
    const liveLetters = inputScreen.querySelectorAll('.input__letter');
    let currentWord = [];
    liveLetters.forEach((elem) => {
        currentWord.push(elem.getAttribute('data-value'));
    })
    currentWord = currentWord.join('');

    if (currentWord.includes(evt.target.value)) {
        nowContainer = document.querySelector('.screen__inside');
        drawedElements = nowContainer.querySelectorAll('div');
   
        for (let i = 0; i < drawedElements.length; i++) {
            if (drawedElements[i].getAttribute('data-value') == evt.target.value) {
                drawedElements[i].querySelector('.input__letter-once').style.opacity = '1';
            }
        }
    } else {
        console.log('Ошибка. Не та буква')
        wrongCounter++;
        wrongOnce[wrongCounter].style.backgroundColor = 'red';
    }
    console.log(wrongCounter);
}


const newWord = (time) => {
    exampleWord.textContent = FINAL_WORDS[time]['desc'];
    drawBaseLetters(FINAL_WORDS[time]['word']);


    buttons.forEach((button) => {
        button.addEventListener('click', clickButtonKeyboardHandler)
    })
}




newWord(0);





newWordButton.addEventListener('click', () => {
    let test1 = exampleWord.querySelectorAll('div');
    let test2 = inputScreen.querySelectorAll('div');
    test1.forEach(elem => {
        elem.remove();
    });
    test2.forEach(elem => {
        elem.remove();
    });
    buttons.forEach((button) => {
        button.removeEventListener('click', clickButtonKeyboardHandler)
    })
    wrongOnce.forEach(elem => {
        elem.style.backgroundColor = ('white');
    })
    wrongCounter = -1;

    newWord(generateIdPhoto());
})




