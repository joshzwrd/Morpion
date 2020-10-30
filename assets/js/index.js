

const statut = document.querySelector("h2");
let jeuActif = true;
let joueurActif = "X";
let etatJeu = ["", "", "", "", "", "", "", "", ""];

// Je définit les conditions de victoire
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Messages 

const gagne = () => `Félicitation Joueur ${joueurActif}, vous avez gagné`;
const egalité = () => "Egalité" 
const tourJoueur = () => `Joueur ${joueurActif} a ton tour`;

statut.innerHTML = tourJoueur();

document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase));


function gestionClicCase(){
    const indexCase = parseInt(this.dataset.index)
    
    if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    }

    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    verifGagne();

    function verifGagne(){
        let tourGagnant = false
    

        for(let conditionVictoire of conditionsVictoire){

            let val1 = etatJeu[conditionVictoire[0]]
            let val2 = etatJeu[conditionVictoire[1]]
            let val3 = etatJeu[conditionVictoire[2]]


            if(val1 === "" || val2 === "" || val3 === ""){
                continue
            }
    
            // Si les 3 cases sont identiques
            if(val1 === val2 && val2 === val3){

                tourGagnant = true
                break
            }
        }
    
        // Si on a gagné
        if(tourGagnant){
            statut.innerHTML = gagne()
            jeuActif = false
            return
        }
    
        // Si toutes les cases sont remplies
        if(!etatJeu.includes("")){
            statut.innerHTML = egalité()
            jeuActif = false
            return
        }

        joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
    
        
    }
    
        // Pour recommencer le jeu

    document.querySelector("#restart").addEventListener("click", restart);

    function restart (){
        joueurActif = "X"
        jeuActif = true
        etatJeu = ["", "", "", "", "", "", "", "", ""]
        statut.innerHTML = tourJoueur()
        document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "" )
    }

}

