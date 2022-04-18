//pole otazek a odpovedi 

let otazky = [
    {
        question: 'To je prvni otazka',
        image: 'obrazky/moncicak.jpg',
        answers: ['Prvni odpoved 1', 'Druha 1', 'Treti 1'],
        rightAnswer: 1
    },
    {
        question: 'To je druha otazka',
        image: 'obrazky/ovoce.jpg',
        answers: ['Prvni odpoved 2', 'Druha 2', 'Treti 2'],
        rightAnswer: 3
    },
    {
        question: 'To je treti otazka',
        image: 'obrazky/pivo.jpg',
        answers: ['Prvni odpoved 3', 'Druha 3', 'Treti 3'],
        rightAnswer: 2
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

    //volame dalsi set otazek a odpovedi
    addingContent(userAnswers.length);
}
