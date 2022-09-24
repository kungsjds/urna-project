const title = document.querySelector('.d-1--left-1 span');
const office = document.querySelector('.d-1--left-2 span');
const numArea = document.querySelector('.d-1--left-3');
const description = document.querySelector('.d-1--left-4');
const info = document.querySelector('.d-2');
const imgArea = document.querySelector('.d-1--right');

let currentPhase = 0;
let typedNumber = '';
let whiteVote = false;

function startVoting() {

    let phase = phases[currentPhase];

    let htmlNumbers = '';

    typedNumber = '';
    whiteVote = false;

    for (let i = 0; i < phase.numbers; i++) {

        if (i === 0) {
            htmlNumbers += '<div class="d-1--left-3--number tic"></div>';
        } else {
            htmlNumbers += '<div class="d-1--left-3--number"></div>';
        };
        
    };

    title.style.display = 'none';
    office.innerHTML = phase.title;
    description.innerHTML = '';
    info.style.display = 'none';
    imgArea.innerHTML = '';
    numArea.innerHTML = htmlNumbers;

};

function screenUpdate() {
    
    let phase = phases[currentPhase];
    let candidate = phase.candidates.filter((item) => item.number === typedNumber)

    if (candidate.length > 0) {

        candidate = candidate[0];
        let htmlImage = '';
        let htmlDesc = `Nome: ${candidate.name} </br>Partido: ${candidate.party}`;

        for (let i in candidate.photos) {

            if (candidate.photos[i].deputy) {
                htmlImage += `<div class="d-1--right-image deputy"><img src="images/${candidate.photos[i].url}" alt="" />${candidate.photos[i].subtitle}</div>`;
                htmlDesc += `</br>Vice-Prefeito: ${candidate.deputyName}`;
            } else {
                htmlImage += `<div class="d-1--right-image"><img src="images/${candidate.photos[i].url}" alt="" />${candidate.photos[i].subtitle}</div>`;           
            };

        };

        title.style.display = 'block';
        info.style.display = 'block';
        imgArea.innerHTML = htmlImage;     
        description.innerHTML = htmlDesc;

    } else {
        description.innerHTML = '<div class="d-1--left-4--nullWhite tic">VOTO NULO</div>';
        info.style.display = 'block';
        title.style.display = 'block';
    };
    
};

function pressed(n) {

    let clickedNum = document.querySelector('.d-1--left-3--number.tic');

    if (clickedNum !== null) {

        clickedNum.innerHTML = n;
        typedNumber = `${typedNumber}${n}`;

        clickedNum.classList.remove('tic');
        if (clickedNum.nextElementSibling !== null) {
            clickedNum.nextElementSibling.classList.add('tic');
        } else {
            screenUpdate();
        };
        
    };

};

function white() {

    whiteVote = true;
    typedNumber = '';
    title.style.display = 'block';
    info.style.display = 'block';
    numArea.innerHTML = '';
    imgArea.innerHTML = '';
    description.innerHTML = '<div class="d-1--left-4--nullWhite tic">VOTO EM BRANCO</div>';

};

function redo() {
    startVoting();
};

function confirm() {

    let confirmmed = false;
    let phase = phases[currentPhase];

    if (whiteVote === true) {
        confirmmed = true;
        console.log('Confirmando como BRANCO...');
    } 
    else if (typedNumber.length === phase.numbers) {
        confirmmed = true;
        console.log('Confirmando como', typedNumber);
    };

    if (confirmmed) {

        currentPhase++

        if (phases[currentPhase] !== undefined) {
            startVoting();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="end-vote tic">FIM</div>'
        };

    };

};

startVoting();