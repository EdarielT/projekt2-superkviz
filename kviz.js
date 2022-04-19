//pole otazek a odpovedi 

let otazky = [
    {
        question: 'Kolik srdcí má chobotnice?',
        image: 'obrazky/chobotnice.jpeg',
        answers: ['Jedno', 'Dvě', 'Tři'],
        rightAnswer: 2
    },
    {
        question: 'Jaký je chemický symbol pro stříbro?',
        image: 'obrazky/chemistry.webp',
        answers: ['Ag', 'Sr', 'Au'],
        rightAnswer: 0
    },
    {
        question: 'Jaká národnost byl sochař Alberto Giacometti?',
        image: 'obrazky/Alberto.avif',
        answers: ['Ital', 'Švýcar', 'Španěl'],
        rightAnswer: 1
    }
];

//funkce pro zobrazeni obsahu stranky

let addingContent = i => {
    let kviz = document.querySelector('.kviz');

    //poradi

    let poradi = document.createElement('div');
    poradi.setAttribute('id', 'poradi');
    kviz.appendChild(poradi);
    poradi.innerHTML = `Otázka ${i + 1}/${otazky.length}`;

    //otazka

    let otazka = document.createElement('div');
    otazka.setAttribute('id', 'otazka');
    kviz.appendChild(otazka);
    otazka.innerHTML = otazky[i].question;

    let odpovedAObrazek = document.createElement('div');
    odpovedAObrazek.className = 'obsah';
    kviz.appendChild(odpovedAObrazek);

    //obrazek

    let foto = document.createElement('div');
    foto.className = 'foto';
    odpovedAObrazek.appendChild(foto);

    let obrazek = document.createElement('img');
    obrazek.setAttribute('id', 'obrazek');
    foto.appendChild(obrazek);
    obrazek.src = otazky[i].image;

    //odpovedi
    let moznosti = document.createElement('div');
    moznosti.setAttribute('id', 'moznosti');

    let odpovedi = document.createElement('ul');
    odpovedi.setAttribute('id', 'odpovedi');
    for (let index = 0; index < otazky[i].answers.length; index++) {
        let odpoved = document.createElement('li');
        odpoved.dataset.odpoved = index;
        odpovedi.appendChild(odpoved);
        odpoved.innerHTML = otazky[i].answers[index];
        odpoved.addEventListener('click', () => chosenAnswer(index));
    }
    moznosti.appendChild(odpovedi);
    odpovedAObrazek.appendChild(moznosti);
}

//prvni set se zobrazi pri nacteni stranky
window.addEventListener('load', () => {
    addingContent(0);
});

let userAnswers = [];

let chosenAnswer = index => {
    userAnswers.push(index);

    //odstranujeme vsechno
    let kviz = document.querySelector('.kviz');
    let child = kviz.firstElementChild;
    while (child) {
        kviz.removeChild(child);
        child = kviz.firstElementChild;
    }
    if (otazky.length !== userAnswers.length) {
        //volame dalsi set otazek a odpovedi
        addingContent(userAnswers.length);
    } else {
        results();
    }
}

//vysledky

let results = () => {
    let kviz = document.querySelector('.kviz');
    kviz.className = 'vysledek';

    let hodnoceniNapis = document.createElement('h2');
    kviz.appendChild(hodnoceniNapis);
    hodnoceniNapis.innerHTML = 'Tvoje hodnocení';

    let howManyRightAnswers = 0;

    for (let i = 0; i < otazky.length; i++) {
        //napiseme otazku
        let otazka = document.createElement('h3');
        kviz.appendChild(otazka);
        otazka.innerHTML = `${i+1}. ${otazky[i].question}`;

        //odpoved kterou vybral hrac
        let usersAnswer = document.createElement('p');
        kviz.appendChild(usersAnswer);
        usersAnswer.innerHTML = `Tvoje odpověď: ${otazky[i].answers[userAnswers[i]]}`;

        //byla to spravna odpoved?
        let ourRightAnswer = document.createElement('p');
        kviz.appendChild(ourRightAnswer);
        if (userAnswers[i] === otazky[i].rightAnswer) {
            ourRightAnswer.innerHTML = 'To je SPRÁVNĚ';
            howManyRightAnswers++;
        } else {
            ourRightAnswer.innerHTML = `Správná odpověď: ${otazky[i].answers[otazky[i].rightAnswer]}`;
        }
    }

    let finalResult = document.createElement('h2');
    kviz.appendChild(finalResult);
    finalResult.innerHTML = `Správně ${howManyRightAnswers} ze ${otazky.length} otázek. Úspěšnost ${Math.floor(howManyRightAnswers/otazky.length*100)}%.`;

}
