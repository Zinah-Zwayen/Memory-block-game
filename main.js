// Select span and make onclick function on it
document.querySelector(".control-buttons span").onclick = function(){
    let yourName = prompt("What is your name?")
    // Check if the name empty or not
    if (yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = "Unknown";
    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }
    // Remove control screen in both cases
    document.querySelector(".control-buttons").remove();
}

// Set duration time to flip the card as one secound
let duration = 1000;

// Select the memory game blocks
let blocksContainer = document.querySelector(".memory-game-blocks");

// Creat variable of array out of the blockes contaoner and its cards and its childern
let blocks = Array.from(blocksContainer.children);

// Creat variable of extracted array keys of the blocks
let orderRange = [...Array(blocks.length).keys()];// orderRange start from 0 to 19 element

// Add the shuffle function to orderRange here
shuffle(orderRange);


// loop on each block and add 'Order' css property to game blocks
blocks.forEach((block, index)=>{

    // choose index from orderRang and add order style to it
    block.style.order = orderRange[index];

    // Add click event on block
    block.addEventListener('click', function(){

        // Trigger the flip block function
        flipBlock(block);
    });
});

// Creat Flip block function
function flipBlock(selectedBlock){

    // Add class is flipped on the selected block
    selectedBlock.classList.add("is-flipped");

    // Collect all the flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If there is two selected card blocks
    if(allFlippedBlocks.length === 2){

        // Stop clicking function
        stopClicking();

        // Check matcheing blocks function
        checkMatchBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Stop clicking function
function stopClicking(){
    
    // Add class no clicking on main container
    blocksContainer.classList.add('no-clicking');

    // Add setTime out to remove the no clicking class after the duration period whick is defined apove as 1000 whether both cards match or not
    setTimeout(()=>{
        // Remove the no clicking class
        blocksContainer.classList.remove('no-clicking');
    }, duration)
}

// Matching block cards function--
function checkMatchBlocks(firstBlock, secondBlock){
    let triesElement = document.querySelector('.tries span');

    // check between 1st and 2nd block
    if(firstBlock.dataset.cards === secondBlock.dataset.cards){

        // remove class is flipped from both cards
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        // then add class has match to both cards
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        // Adding the success audio
        document.getElementById('success').play();
    }else{
        // if card block not matching 
        // inter number or tries in html increase by 1
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        // Remove the is flipped class back but put duration for it to make wait to check first
        setTimeout(() =>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);

        // Adding the fail audio
        document.getElementById('fail').play();
        
    }
}

// Shuffle function
function shuffle(array){
    // set variables "current for number element in the array"," temp for temprory value", "random index"
    let current = array.length,
    temp,
    random;

    // loop on indexes while the index is more than 0    
    while(current > 0){

        // Get random number from the current array
        random = Math.floor(Math.random()*current);
        
        // Decrease length by one
        current--;

        // Start the shuffling
        //[1] Save current element in the array in stash/temp value
        temp = array[current];

        //[2] Current element = random element
        array[current] = array[random];

        //[3] Random element = get element from stash/temp vlaue
        array[random] = temp;
    }

    return array;

}

