const aValues  = [6, 7, 8, 9];
const abSums   = [11, 12, 13, 14];
const getRandEl = arr => arr[Math.floor(Math.random()*arr.length)];

const a = getRandEl(aValues);
const bValues = abSums.map(el => el - a);
const b = getRandEl(bValues);

const example = document.querySelector('.addition-numbers__example');
const firstInput = document.querySelector('.addition-numbers__first-element');
const secondInput = document.querySelector('.addition-numbers__second-element');

const firstTagSpan = document.createElement("span");
const secondTagSpan = document.createElement("span");
const thirdTagSpan = document.createElement("span");

const firstHandleInputKeyUp = (e) => {
    const value = e.target.value;
    if (a == value) { 
        firstInput.style.color="#000";
        secondInput.style.display="inline-block";
        
        firstTagSpan.innerHTML = value;
        firstInput.parentNode.replaceChild(firstTagSpan, firstInput);

        const elem = document.getElementById("addition-number__first");
        elem.classList.remove("addition-numbers__valid");
    }
    else {
        firstInput.style.color="#ea2439";

        const elem = document.getElementById("addition-number__first");
            elem.classList.add("addition-numbers__valid");
    }
}

example.innerHTML = '<span id="addition-number__first">' + a + '</span>' + ' + ' + '<span id="addition-number__second">' + b + '</span>' + ' = ' + '<span>' + '?' + '</span>';
firstInput.addEventListener('keyup', firstHandleInputKeyUp);

const secondHandleInputKeyUp = (e) => {
    const value = e.target.value;
    if (b == value) {
        secondInput.style.color="#000";

        secondTagSpan.innerHTML = value;
        secondInput.parentNode.replaceChild(secondTagSpan, secondInput);

        const elem = document.getElementById("addition-number__second");
        elem.classList.remove("addition-numbers__valid");

        example.innerHTML = '<span>' + a + '</span>' + ' + ' + '<span>' + b + '</span>' + ' = ' + '<input class="addition-numbers__result" id="result">';
        document.querySelector('.addition-numbers__result').style.display="inline-block";

        const resultInput = document.querySelector('.addition-numbers__result');

        const resultHandleInputKeyUp = (e) => {
        const value = e.target.value;
        if (a + b == value) {
            resultInput.style.color="#000";

            thirdTagSpan.innerHTML = value;
            resultInput.parentNode.replaceChild(thirdTagSpan, resultInput);

        }
        else {
            resultInput.style.color="#ea2439";
        }
    }

    resultInput.addEventListener('keyup', resultHandleInputKeyUp);

    }
    else {
        secondInput.style.color="#ea2439";

        const elem = document.getElementById("addition-number__second");
            elem.classList.add("addition-numbers__valid");
    }
}

secondInput.addEventListener('keyup', secondHandleInputKeyUp);