// Generáló gomb működtetése:
document.getElementById("generateBtn").onclick = handleClick;

function handleClick() {
    const values = getInputValues();
    const readyPassword = getPassword(values);
    console.log(readyPassword);
}

// Üzenetet küldő eljárás:
function sendMessage(message) {
    alert(message);
}

// Értékek kinyerése. Ha hiányzik érték az inputból, akkor üzenetet küldünk, input-ra helyezzük a fókszt, és üres listát adunk vissza.
function getInputValues() {
    const inputValues = [];
    const inputElements = document.querySelectorAll("input");
    if (inputElements.length > 0) {
        for (let element of inputElements) {
            if (element.value === "") {
                sendMessage("Minden mezőt szükséges kitölteni!");
                element.focus();
                return [];
            }
            inputValues.push(parseInt(element.value))
        }
        return inputValues;
    }
}
// A jelszó számok része:
function getNumberSection(numCount) {
    const nums = [];
    for (let i = 0; i < numCount; i++) {
        nums.push(Math.floor(Math.random() * 10));
    }
    return nums;
}
// A jelszó kisbetűs része:
function getLowerCaseLetters(lowerCount) {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const lettersList = [];
    for (let i = 0; i < lowerCount; i++) {
        lettersList.push(letters[Math.floor(Math.random() * letters.length)])
    }
    return lettersList;
}

// A jelszó nagybetűs része:
function getUpperCaseLetters(upperCount) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lettersList = [];
    for (let i = 0; i < upperCount; i++) {
        lettersList.push(letters[Math.floor(Math.random() * letters.length)])
    }
    return lettersList;
}

// Speciális karakterek rész:
function getSpecLetters(specCount) {
    const letters = "§~^%/=()<>#&@{}[]$*!?_";
    const lettersList = [];
    for (let i = 0; i < specCount; i++) {
        lettersList.push(letters[Math.floor(Math.random() * letters.length)])
    }
    return lettersList;
}
function mixingPasswordChar(completedPassword) {
    return completedPassword.sort(() => Math.random() - 0.5);
}

// Jelszó karaktereinek generálása:
function getPassword(numbersList) {
    if (numbersList.length > 0) {
        let [pwdLength, pwdCount, numCount, lowerCount, upperCount, specCount] = numbersList;
        numCount = numCount === 0 ? 1 : numCount;
        const pwdNumbersPart = getNumberSection(numCount);
        lowerCount = lowerCount === 0 ? 1 : lowerCount;
        const lowerLettersPart = getLowerCaseLetters(lowerCount);
        upperCount = upperCount === 0 ? 1 : upperCount;
        const upperLettersPart = getUpperCaseLetters(upperCount);
        specCount = specCount === 0 ? 1 : specCount;
        const specLettersPart = getSpecLetters(specCount);
        // A jelszórészek összefűzése és összekeverés + jelszó hossza???, jelszavak száma - mindig más...
        pwdCount = pwdCount === 0 ? 1 : pwdCount;
        pwdLength = pwdLength === 0 ? 8 : pwdLength;  // Mi van, ha a megadott kritériumok szerint ettől hosszabb a jelszó, vagy a felhasználó adott meg kisebb méretet???
        console.log(pwdLength);
        // Összefűzés:
        let passwdSupplement = [];
        const rawPassword = [...pwdNumbersPart, ...lowerLettersPart, ...upperLettersPart, ...specLettersPart];
        if (rawPassword.length > pwdLength) pwdLength = rawPassword.length;

        if (rawPassword.length < pwdLength) {
            const diff = pwdLength - rawPassword.length;
            passwdSupplement = getLowerCaseLetters(diff);
        }
        const completedPassword = [...passwdSupplement, ...rawPassword];
        return mixingPasswordChar(completedPassword).join("");
    }
}

// Több jelszó esetén több, de egészen más jelszót kell generálni, tehát a getPassword függvényt kell többször futtatni.
// A jelszavak megjelenítésekor a .passwords + .passwords_padding

