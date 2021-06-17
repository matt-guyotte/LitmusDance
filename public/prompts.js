var prompts = [
    {
        number: 0,
        prompt: "A secret..."
    },
    {
        number: 1,
        prompt: "A hope..."
    },
    {
        number: 2,
        prompt: "A fear..."
    },
    {
        number: 3,
        prompt: "Please enter your response."
    }
]

function runPrompts(number) {
    if (number === 1) {
        let currentIndex = 1;   
        var promptContainer = document.getElementById('prompts')
        promptContainer.innerHTML = prompts[0].prompt
        var interval = setInterval(() => {      
            promptContainer.innerHTML= prompts[currentIndex].prompt; 
            currentIndex++;
            if(currentIndex === 4) {
                countdown(121, 1);
                clearInterval(interval);
            }
         }, 2000)
    }
    if (number === 2) {
        let currentIndex = 1;   
        var promptContainer = document.getElementById('prompts2')
        promptContainer.innerHTML = "We can't promise we'll answer. :)";
        countdown(121, 5);
    }
}