let cards = []
let sum = 0
let isAlive = false
let hasBlackJack = false

let playya = { //this is an object
    Name: "Kimi no nawa",
    chips: 25000,
}
console.log() //object.method
let message = ""

let messageEl = document.getElementById("message-el")

let sumEl = document.querySelector("#sum")
let cardEl = document.querySelector("#card")

let playerEl = document.querySelector(".player")
playerEl.textContent = playya.Name + ": ₹" + playya.chips

let chipsEl = document.getElementById("chips")

function start(){
    if(!isAlive || hasBlackJack){
        cards = []
        hasBlackJack = false

        document
         .getElementById("bet-input")
         .style.display = "none"
        
        document
         .getElementById("bet-btn")
         .style.display = "inline"

        // document
        //  .getElementById("bet-btn")
        //  .style.color = "red"

        chipsEl.style.display = "none"
        document.getElementById("bet-input").value = 0
    } //clear the cards array and start again
    isAlive = true
    let card1 = randomCard()
    let card2 = randomCard()
    
    sum = card1 + card2 //sum is being reassigned anyways
    
    cards.push(card1)
    cards.push(card2)
    
    document
     .getElementById("start-btn")
     .style.display = "none"

    render()
}

function randomCard(){
    // return Math.floor(Math.random() * 10) + 2
    //Math.random() 0 --> 1(exclusive 1)
    //Math.random()*10 0 --> 10 (exclusive 10)
    //Math.floor(Math.random() * 10) 0 --> 9 (only integers)
    //Math.floor(Math.random() * 10) + 2; 2 --> 11 (only integers)
    if(!isAlive || hasBlackJack) return
    let num = Math.floor(Math.random() * 12) + 1
    if(num === 1) return 11
    else if(num > 10) return 10
    return num
}

function showBetInput(){
    
    document
    .getElementById("bet-input")
    .style.display = "inline"

    document
    .getElementById("bet-btn")
    .style.display = "none"
}

function put(event){
   if(event.key == "Enter"){//proceed only if the user has pressed enter
    let x = document.getElementById("bet-input").value//this always gives a string regardless of the input type
    chipsPut = Number(x)
    
    chipsEl.style.display = "inline"
    if(chipsPut > playya.chips) {
        chipsEl.textContent = "Not enough chips!"
    } 

    else{
    chipsEl.textContent = "On Table: ₹" + chipsPut
    
    playya.chips -= chipsPut
    playerEl.textContent = playya.Name + ": ₹" + playya.chips
    }
   }
}

function render(){
    //just runs the game
    cardEl.textContent = "Cards: " 
for(let i = 0;i<cards.length;i++){
    cardEl.textContent += cards[i] + " "
}

  if(sum <= 20){
    message = "Draw?"
}

else if(sum === 21) {
    message = "You Win!"
    hasBlackJack = true
    playya.chips += chipsPut*2
    playerEl.textContent = playya.Name + ": ₹" + playya.chips
    document.
     getElementById("start-btn")
     .style.display = "inline"
} //=== >>>> == (more strict)
else{
    message = "You Lose!"
    isAlive = false
    document.
     getElementById("start-btn")
     .style.display = "inline"
}

    messageEl.textContent = message
    sumEl.textContent ="Sum: " + sum

}

function newCard(){
    if(!isAlive || hasBlackJack) return 
    
    let new_card = randomCard()
    sum += new_card
    cards.push(new_card)
    
    render()
}