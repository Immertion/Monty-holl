sessionStorage.setItem('numberOfGames', 0);
sessionStorage.setItem('choiceMade', 'undefined');

let stateManager = {
    changeChoice: {
        totalTry: 0,
        successTry: 0,
        unsuccessTry: 0,
    },
    notChangeChoice: {
        totalTry: 0,
        successTry: 0,
        unsuccessTry: 0,
    },
}

console.log(stateManager);
sessionStorage.setItem('stateManager', stateManager.changeChoice.successTry);

let numberOfGames = document.getElementsByName('numberOfGames');
numberOfGames[0].innerHTML = '0';



function load_image() {
    let content = document.getElementsByClassName('door');

    for (let element of content) {
        const door = document.createElement('img');
        door.src = '../content/images/door.png';
    
        door.style.width = door.style.height = '300px';
    
        element.appendChild(door);
        
        const random = Math.floor(Math.random() * 3);
        sessionStorage.setItem('carItem', random);

        element.addEventListener("click", () => {
            action(content, element);
        });
    }
}



load_image();

let choicefirst; 

function action(content, choice) {
    let choiceMade = sessionStorage.getItem('choiceMade');
    const random = sessionStorage.getItem("carItem");

    

    if (choiceMade == 'undefined') {
        for (let item of content) {
            if (item.id != random && item != choice) {
                choicefirst = choice;
                item.children[0].src = "../content/images/goat.png";
                sessionStorage.setItem('choiceMade', item.id);
                break;
            }
        }
    }
    else {
        for (let item of content) {
            if (item.id != choiceMade) {
                if (item.id == random) {
                    item.children[0].src = "../content/images/rune.png";
                }
                else {
                    item.children[0].src = "../content/images/goat.png";
                }
            }
        }
        
        if (choice == choicefirst){
            stateManager.notChangeChoice.totalTry++;
            document.getElementsByName("lTotalTry_nochange")[0].innerHTML =
            stateManager.notChangeChoice.totalTry;
            if (choice.id == random){
                stateManager.notChangeChoice.successTry++;
                document.getElementsByName("lSuccessTry_nochange")[0].innerHTML =
                stateManager.notChangeChoice.successTry;

                
            }
            else{
                stateManager.notChangeChoice.unsuccessTry++;
                document.getElementsByName("lUnsuccessTry_nochange")[0].innerHTML =
                stateManager.notChangeChoice.unsuccessTry;

            }

        }
        else{
            stateManager.changeChoice.totalTry++;
            document.getElementsByName("lTotalTry_change")[0].innerHTML =
            stateManager.changeChoice.totalTry;
            if (choice.id == random){
                stateManager.changeChoice.successTry++;
                document.getElementsByName("lSuccessTry_change")[0].innerHTML =
                stateManager.changeChoice.successTry;

            }
            else{
                stateManager.changeChoice.unsuccessTry++;
                document.getElementsByName("lUnsuccessTry_change")[0].innerHTML =
                stateManager.changeChoice.unsuccessTry;

            }
        }

        document.getElementById('A').style.display = 'block';
    }
}

document.getElementById("A").onclick = update;

function update() {
    document.getElementById('A').style.display = 'none';
    let content = document.getElementsByClassName("door");

    let stateManager = sessionStorage.getItem('stateManager');
    console.log(stateManager);

    sessionStorage.setItem('choiceMade', 'undefined');

    for (let element of content) {
        element.children[0].src = "../content/images/door.png";


        const random = Math.floor(Math.random() * 3);
        sessionStorage.setItem("carItem", random);
    }

    let numberOfGames = sessionStorage.getItem("numberOfGames");
    numberOfGames++;

    document.getElementsByName("numberOfGames")[0].innerHTML =
        numberOfGames.toString();
    sessionStorage.setItem("numberOfGames", numberOfGames);
}
