
document.addEventListener('DOMContentLoaded', function () {

    // Define the promptInput variable and assign it the prompt input element
    const promptInput = document.getElementById('prompt');
    const cogwheelButton = document.getElementById('cogwheelButton');
    const optionsContainer = document.getElementById('optionsContainer');
    const mainContent = document.getElementById('container');
    const imagineButton = document.getElementById('buttonGen');
    const options = document.querySelectorAll('#optionsContainer button');


    // Function to initialize default selection and add event listeners
    function initializeDefaultSelection() {
        options.forEach(option => {
            option.addEventListener('click', function () {
                // Ensure 'this' and 'this.querySelector' are not null
                if (this && this.querySelector('img')) {
                    // Remove 'selected-option' class from all buttons
                    options.forEach(opt => opt.classList.remove('selected-option'));
                    // Add 'selected-option' class to the clicked button
                    this.classList.add('selected-option');
                    // Save the selection to localStorage
                    localStorage.setItem('selectedOption', this.id);

                }
            });
        });
    }

    // Call initializeDefaultSelection to add the event listeners
    initializeDefaultSelection();

    // Initialize event listeners for option buttons
    const optionButtons = document.querySelectorAll('#optionsContainer button');
    optionButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove 'selected-option' class from all buttons
            optionButtons.forEach(btn => btn.classList.remove('selected-option'));
            // Add 'selected-option' class to the clicked button
            this.classList.add('selected-option');
        });
    });

    // Apply inversion to the initially selected option
    const selectedOptionImage = document.querySelector('.selected-option img');
    if (selectedOptionImage) {
        selectedOptionImage.style.filter = "invert(100%)";
    }

    const customPlaceholder = document.getElementById('customPlaceholder');


    const savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
        optionButtons.forEach(button => {
            if (button.id === savedOption) { // Compare with button's ID
                button.classList.add('selected-option');
            }
        });
    }


    // Hide/show the custom placeholder based on textarea focus
    promptInput.addEventListener('focus', function () {
        customPlaceholder.style.display = 'none';
    });

    promptInput.addEventListener('blur', function () {
        if (promptInput.value.trim() === '') {
            customPlaceholder.style.display = 'block';
        }
    });

    // Function to automatically adjust the height of the textarea based on content
    function autoGrow(element) {
        element.style.height = '5px';
        element.style.height = element.scrollHeight + 'px';
    }

    // Attach the autoGrow function to the input event of the textarea
    promptInput.addEventListener('input', function () {
        autoGrow(this);
    });

    document.addEventListener('DOMContentLoaded', function () {
        // Initialize event listeners for option buttons
        document.querySelectorAll('#optionsContainer button').forEach(button => {
            button.addEventListener('click', function () {
                // Remove 'selected-option' class from all buttons
                document.querySelectorAll('#optionsContainer button').forEach(btn => btn.classList.remove('selected-option'));
                // Add 'selected-option' class to the clicked button
                this.classList.add('selected-option');
                // Save the selection to localStorage using button ID
                localStorage.setItem('selectedOption', this.id);
            });
        });

        // Restore selected option on page load
        const savedOption = localStorage.getItem('selectedOption');
        if (savedOption) {
            const optionButton = document.getElementById(savedOption);
            if (optionButton) {
                optionButton.classList.add('selected-option');
            }
        }
    });

    // Attach the autoGrow function to the input event of the textarea
    promptInput.addEventListener('input', function () {
        autoGrow(this);
    });


});

async function getApiKey() {
    const response = await fetch('/wp-content/themes/gen/get-api-key.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'request_key=specific_value',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.api_key;
}


document.getElementById('confirmSelection').addEventListener('click', function () {
    const selectedButton = document.querySelector('#optionsContainer .selected-option');
    if (selectedButton) {
        // Save the id of the selected button to localStorage
        localStorage.setItem('selectedOption', selectedButton.id);
    }
    // Add any additional actions to take upon confirmation, e.g., closing the options menu
    toggleVisibility(true);
});

// Create SVG element for ripple effect
const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, "svg");
svg.setAttribute("width", "0");
svg.setAttribute("height", "0");
document.body.appendChild(svg);

// Create filter for ripple effect
const filter = document.createElementNS(svgNS, "filter");
filter.setAttribute("id", "ripple-effect");
svg.appendChild(filter);

// Create feTurbulence for ripple effect
const feTurbulence = document.createElementNS(svgNS, "feTurbulence");
feTurbulence.setAttribute("type", "fractalNoise");
feTurbulence.setAttribute("baseFrequency", "0.01");
feTurbulence.setAttribute("numOctaves", "2");
feTurbulence.setAttribute("result", "turbulence");
filter.appendChild(feTurbulence);

// Create feDisplacementMap for ripple effect
const feDisplacementMap = document.createElementNS(svgNS, "feDisplacementMap");
feDisplacementMap.setAttribute("in2", "turbulence");
feDisplacementMap.setAttribute("in", "SourceGraphic");
feDisplacementMap.setAttribute("scale", "20");
feDisplacementMap.setAttribute("xChannelSelector", "R");
feDisplacementMap.setAttribute("yChannelSelector", "G");
filter.appendChild(feDisplacementMap);

// Apply filter on button hover for ripple effect
const button = document.getElementById("buttonGen");
button.onmouseover = function () {
    this.style.filter = "url(#ripple-effect)";
};
button.onmouseleave = function () {
    this.style.filter = "";
};

// Initialize variables
let selectedOption = localStorage.getItem('selectedOption') || 'defaultOptionValue';
let currentImageUrl = "https://i.ibb.co/MDrQ6D4/TBWAlogov2.png";
let imageWidth = 768;
let imageHeight = 768;


// Function to update image dimensions
function updateImageDimensions(width, height) {
    imageWidth = width;
    imageHeight = height;
}


// Function to update image URL
function updateImageURL(url) {
    currentImageUrl = url; // Assuming requestData is accessible in this scope
}


function downloadImage() {
    const imageUrl = document.getElementById('generatedImage').src;
    const promptText = document.getElementById('prompt').value.trim().replace(/\s+/g, '_'); // Replace spaces with underscores

    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            // Set the download filename using the modified prompt text
            downloadLink.download = `${promptText}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        })
        .catch(error => {
            console.error('Error downloading image:', error);
        });
}


document.querySelectorAll('#optionsContainer button').forEach(button => {
    // Ensure we are only adding listeners to buttons with relevant ids
    if (button.id !== 'confirmSelection') {
        button.addEventListener('click', function () {
            const selectedOptionId = this.id; // Get the id of the clicked button
            console.log('Selected option ID:', selectedOptionId);

            // Proceed only if the clicked button's id is in imageURLs
            const imageURLs = {
                'centerAlignedSquare': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/1x1.png',
                'leftAlignedPortrait': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/9x16_1.png',
                'centeredAlignedPortrait': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/9x16_2.png',
                'rightAlignedPortrait': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/9x16_3.png',
                'leftAlignedLandscape': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/16x9_1.png',
                'centeredAlignedLandscape': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/16x9_2.png',
                'rightAlignedLandscape': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/16x9_3.png',
            };
            
        });
    }
});


async function runModel() {
    const promptInput = document.getElementById('prompt').value.trim();
    const customPlaceholder = document.getElementById('customPlaceholder');

    if (!promptInput) {
        customPlaceholder.classList.add('shake-placeholder');
        setTimeout(() => {
            customPlaceholder.classList.remove('shake-placeholder');
        }, 500);
        return;
    }


    // Fetch the latest selected option
    const selectedOption = localStorage.getItem('selectedOption') || 'centerAlignedSquare';



    const imageURLs = {
        'centerAlignedSquare': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/1x1.png',
        'leftAlignedPortrait': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/9x16_1.png',
        'centeredAlignedPortrait': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/9x16_2.png',
        'rightAlignedPortrait': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/9x16_3.png',
        'leftAlignedLandscape': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/16x9_1.png',
        'centeredAlignedLandscape': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/16x9_2.png',
        'rightAlignedLandscape': 'https://www.floridomeacci.com/wp-content/uploads/2024/03/16x9_3.png',
    };


    const settings = {
        'centerAlignedSquare': { url: 'https://www.floridomeacci.com/wp-content/uploads/2024/03/1x1.png', width: 768, height: 768 },
        'leftAlignedPortrait': { url: 'https://www.floridomeacci.com/wp-content/uploads/2024/03/9x16_1.png', width: 768, height: 1365 },
        'centeredAlignedPortrait': { url: 'https://www.floridomeacci.com/wp-content/uploads/2024/03/9x16_2.png', width: 768, height: 1365 },
        'rightAlignedPortrait': { url: 'https://www.floridomeacci.com/wp-content/uploads/2024/03/9x16_3.png', width: 768, height: 1365 },
        'leftAlignedLandscape': { url: 'https://www.floridomeacci.com/wp-content/uploads/2024/03/16x9_1.png', width: 1365, height: 768 },
        'centeredAlignedLandscape': { url: 'https://www.floridomeacci.com/wp-content/uploads/2024/03/16x9_2.png', width: 1365, height: 768 },
        'rightAlignedLandscape': { url: 'https://www.floridomeacci.com/wp-content/uploads/2024/03/16x9_3.png', width: 1365, height: 768 },
    };

    // Then in your runModel function, you can access the settings like this:
    const selectedSettings = settings[selectedOption];
    if (selectedSettings) {
        currentImageUrl = selectedSettings.url;
        imageWidth = selectedSettings.width;
        imageHeight = selectedSettings.height;
    } else {
        console.error('Unknown option selected:', selectedOption);
        return;
    }

    const titleContainer = document.getElementById('titleContainer');
    const promptTextarea = document.getElementById('prompt');
    const buttonGen = document.getElementById('buttonGen');
    const cogwheelButton = document.getElementById('cogwheelButton');

    titleContainer.classList.add('scale-down');
    promptTextarea.classList.add('scale-down');
    buttonGen.classList.add('scale-down');
    cogwheelButton.classList.add('scale-down');

    setTimeout(async () => {
        titleContainer.style.display = 'none';
        promptTextarea.style.display = 'none';
        buttonGen.style.display = 'none';
        cogwheelButton.style.display = 'none';

        document.getElementById('loader-container').style.display = 'flex';
        document.getElementById('loader-container').classList.add('scale-up');

        console.log('Running model...');
        console.log('Prompt:', promptInput);

        const apiUrl = 'https://api.replicate.com/v1/predictions';
        const apiToken = "r8_ecMvHyF0GofDpc0OfV0BrROJOelQZcS1sS1Ac";
        const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

        const requestData = {
            version: "3c64e669051f9b358e748c8e2fb8a06e64122a9ece762ef133252e2c99da77c1",
            input: {
                seed: -1,
                image: currentImageUrl,
                border: 1,
                width: imageWidth,
                height: imageHeight,
                prompt: promptInput,
                num_outputs: 1,
                guidance_scale: 7.5,
                negative_prompt: "ugly, disfigured, low quality, blurry, nsfw",
                qr_code_content: "",
                qrcode_background: "gray",
                num_inference_steps: 100,
                controlnet_conditioning_scale: 1.2
            }
        };

        try {
            console.log('Sending request...');
            const response = await fetch(corsAnywhereUrl + apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${apiToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            console.log('Request sent');

            const data = await response.json();
            console.log('Response received:', data);
            if (data.id) {
                console.log('Checking prediction status...');
                await checkPredictionStatus(data.id);
            }
        } catch (error) {
            console.error('Error initiating prediction:', error);
            document.getElementById('loader-container').style.display = 'none';
            document.getElementById('title').style.display = 'block';
            document.getElementById('prompt').style.display = 'block';
            document.getElementById('buttonGen').style.display = 'block';
        }
    }, 500);
}

async function checkPredictionStatus(predictionId) {
    console.log('Checking prediction status for ID:', predictionId);
    const apiUrl = 'https://api.replicate.com/v1/predictions';
    const apiToken = "r8_ecMvHyF0GofDpc0OfV0BrROJOelQZcS1sS1Ac";
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
        const statusResponse = await fetch(corsAnywhereUrl + apiUrl + '/' + predictionId, {
            headers: {
                'Authorization': `Token ${apiToken}`
            }
        });
        const statusData = await statusResponse.json();
        console.log('Status data:', statusData);

        if (statusData.status === 'completed' || statusData.status === 'succeeded') {
            const imageUrl = statusData.output[0];
            console.log('Generated image URL:', imageUrl);
            await applyNSFWFilter(imageUrl);
        } else if (statusData.status === 'failed') {
            console.error('Prediction failed:', statusData.error);
            document.getElementById('loader-container').style.display = 'none';
        } else {
            console.log('Prediction is still in progress. Checking again in 5 seconds.');
            let progress = 0;
            if (statusData.logs) {
                progress = extractProgressFromLogs(statusData.logs);
                console.log('Progress:', progress);
            }
            updateLoaderProgress(progress * 100);
            setTimeout(() => checkPredictionStatus(predictionId), 1000);
        }
    } catch (error) {
        console.error('Error checking prediction status:', error);
        document.getElementById('loader-container').style.display = 'none';
    }
}

function refreshPage() {
    // Apply scale-down animation to main container
    const mainContainer = document.getElementById('container'); // Adjust the ID as necessary
    mainContainer.classList.add('scale-down');

    // Delay the page reload to allow animation to complete
    setTimeout(() => {
        window.location.reload();
    }, 500); // Match this with the duration of your scale-down animation
}





function retryPrompt() {
    // Apply scale-down animation to the output container
    const outputContainer = document.getElementById('output');
    outputContainer.classList.add('scale-down');

    // Delay hiding the output and showing the loader to allow the animation to complete
    setTimeout(() => {
        // Hide output
        outputContainer.style.display = 'none';

        // Reset the output container by removing the 'scale-down' class to prepare it for the next time it's shown
        outputContainer.classList.remove('scale-down');

        // Show loader
        const loaderContainer = document.getElementById('loader-container');
        
        // Reset any classes or styles that might have hidden the loader
        loaderContainer.classList.remove('hidden'); // If you used 'hidden' class to hide it
        loaderContainer.style.display = 'flex'; // Display the loader
        loaderContainer.style.opacity = '1'; // Reset opacity in case it was changed
        loaderContainer.style.transform = 'scale(1)'; // Reset transform in case it was changed

        // Call runModel() function again with the same prompt
        runModel();
    }, 500); // Match this with the duration of your scale-down animation
}




function extractProgressFromLogs(logs) {
    // Extracting the progress from the logs
    const regex = /(\d+)%\|/g;
    let match;
    let progress = 0;

    // Find the last match to get the latest progress
    while ((match = regex.exec(logs)) !== null) {
        progress = parseInt(match[1]);
    }

    // Return the progress as a decimal percentage
    return progress / 100;
}

function updateLoaderProgress(progress) {
    // Get the loader text and video elements
    const loaderText = document.getElementById('loader-text');
    const loaderAnimation = document.getElementById('loader-animation');

    // Check if the loader text element exists and progress is a valid number
    if (loaderText && typeof progress === 'number' && !isNaN(progress)) {
        if (progress === 0) {
            loaderText.textContent = 'Starting engine...';
            // Ensure the video is playing from the start
            if (loaderAnimation.paused) {
                loaderAnimation.play();
            }
        } else {
            // Round the progress to remove decimal places and update loader progress text
            loaderText.textContent = `Loading... ${Math.round(progress)}%`;
        }
    }

    // Assuming the video should always loop during the loading process
    // There's no need to explicitly manage it here unless you want to stop it at 100%
    // For that case, you could add:
    if (typeof progress === 'number' && !isNaN(progress) && progress >= 100) {
        // Stop and reset the video when loading is complete, if desired
        loaderAnimation.pause();
        loaderAnimation.currentTime = 0; // Reset to start
    }
}





async function checkPredictionStatus(predictionId) {
    console.log('Checking prediction status for ID:', predictionId);
    const apiUrl = 'https://api.replicate.com/v1/predictions';
    const apiToken = "r8_ecMvHyF0GofDpc0OfV0BrROJOelQZcS1sS1Ac";
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
        const statusResponse = await fetch(corsAnywhereUrl + apiUrl + '/' + predictionId, {
            headers: {
                'Authorization': `Token ${apiToken}`
            }
        });
        const statusData = await statusResponse.json();
        console.log('Status data:', statusData);

        if (statusData.status === 'completed' || statusData.status === 'succeeded') {
            const imageUrl = statusData.output[0];
            console.log('Generated image URL:', imageUrl);
            await applyNSFWFilter(imageUrl);
        } else if (statusData.status === 'failed') {
            console.error('Prediction failed:', statusData.error);
            document.getElementById('loader-container').style.display = 'none';
        } else {
            console.log('Prediction is still in progress. Checking again in 1 seconds.');
            let progress = 0;
            if (statusData.logs) {
                progress = extractProgressFromLogs(statusData.logs);
                console.log('Progress:', progress);
            }
            updateLoaderProgress(progress * 100);
            setTimeout(() => checkPredictionStatus(predictionId), 1000);
        }
    } catch (error) {
        console.error('Error checking prediction status:', error);
        document.getElementById('loader-container').style.display = 'none';
    }
}

async function applyNSFWFilter(imageUrl) {
    const apiUrl = 'https://api.replicate.com/v1/predictions';
    const apiToken = "r8_ecMvHyF0GofDpc0OfV0BrROJOelQZcS1sS1Ac";
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const nsfwModelVersion = "88c3624a13d60bb5ecd0cb215e49e39d2a2135c211bcb94fc801d3def46803c4";

    try {
        console.log('Applying NSFW filter...');

        const nsfwFilterData = {
            version: nsfwModelVersion,
            input: {
                image: imageUrl
            }
        };

        console.log('Request data:', nsfwFilterData);

        const nsfwFilterResponse = await fetch(corsAnywhereUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${apiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nsfwFilterData)
        });

        const nsfwData = await nsfwFilterResponse.json();
        console.log('NSFW filter response:', nsfwData);

        // Assuming nsfwData represents the JSON response structure you provided
        if (nsfwData.status === 'completed' || nsfwData.status === 'succeeded') {
            if (nsfwData.output.nsfw_detected) {
                console.log('NSFW content detected. Not displaying the image.');
                handleNSFWContentDetected();
                document.getElementById('loader-container').style.display = 'none';
                // Optional: Notify the user about NSFW content detection
            } else {
                // No NSFW content detected
                console.log('No NSFW content detected. Displaying the image.');
                // Actions to take if the image is safe, e.g., display the image
                displayGeneratedImage(imageUrl);
            }
        } else {
            // If the filter's status is not 'completed' or 'succeeded', handle accordingly
            console.log('NSFW filter is still in progress. Checking again in 1 seconds.');
            // Example: Set a timeout to recheck the NSFW filter status
            setTimeout(() => checkNSFWFilterStatus(nsfwData.id, imageUrl), 1000);
        }

    } catch (error) {
        console.error('Error applying NSFW filter:', error);
        document.getElementById('loader-container').style.display = 'none';
    }
}



async function checkNSFWFilterStatus(predictionId, imageUrl) {
    const apiUrl = 'https://api.replicate.com/v1/predictions';
    const apiToken = "r8_ecMvHyF0GofDpc0OfV0BrROJOelQZcS1sS1Ac";
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
        const statusResponse = await fetch(corsAnywhereUrl + apiUrl + '/' + predictionId, {
            headers: {
                'Authorization': `Token ${apiToken}`
            }
        });
        const statusData = await statusResponse.json();
        console.log('Status data:', statusData);

        // Use statusData instead of nsfwData
        if (statusData.status === 'completed' || statusData.status === 'succeeded') {
            if (statusData.output && statusData.output.nsfw_detected) {
                console.log('NSFW content detected. Not displaying the image.');
                handleNSFWContentDetected();
            } else {
                console.log('No NSFW content detected.');
                displayGeneratedImage(imageUrl);
            }
        } else {
            console.log('NSFW filter is still in progress. Checking again in 1 second.');
            setTimeout(() => checkNSFWFilterStatus(predictionId, imageUrl), 1000);
        }
    } catch (error) {
        console.error('Error checking NSFW filter status:', error);
        document.getElementById('loader-container').style.display = 'none';
    }
}



function displayGeneratedImage(imageUrl) {
    const outputContainer = document.getElementById('output');
    const generatedImage = document.getElementById('generatedImage');
    const loaderContainer = document.getElementById('loader-container');

    // Function to hide loader and show image
    const hideLoaderAndShowImage = () => {
        // Add hidden class to loader to start transition
        loaderContainer.classList.add('hidden');

        // After the loader has finished transitioning, display the image
        setTimeout(() => {
            outputContainer.style.display = 'block';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    outputContainer.classList.add('visible');
                });
            });
        }, 500); // This timeout should match the duration of the loader's transition
    };

    // Preload the image
    const img = new Image();
    img.onload = function() {
        // Set the image source once it's loaded
        generatedImage.src = imageUrl;

        // Hide the loader and then display the image
        hideLoaderAndShowImage();
    };
    img.onerror = function() {
        console.error('Failed to load the generated image.');
    };
    img.src = imageUrl; // Start loading the image
}







function handleNSFWContentDetected() {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) { // Check if the element exists
        messageContainer.innerText = "The prompt violates our content policy";

        // Prepare message container for animation
        messageContainer.classList.remove('scale-down');
        messageContainer.style.display = 'block';

        // Apply scale-up animation
        setTimeout(() => {
            messageContainer.classList.add('scale-up');
        }, 10); // Short delay to ensure the class is properly applied

        document.getElementById('loader-container').style.display = 'none';
        const generatedImage = document.getElementById('generatedImage');
        if (generatedImage) {
            generatedImage.style.display = 'none';
        }

        setTimeout(() => {
            // Consider applying a scale-down effect before hiding
            messageContainer.classList.add('scale-down');
            setTimeout(() => {
                messageContainer.style.display = 'none';
                refreshPage();
            }, 500); // Match the animation duration
        }, 5000);
    } else {
        console.error('Message container not found in the DOM.');
    }
}





function toggleVisibility(shouldHide) {
    if (shouldHide) {
        optionsContainer.classList.remove('scale-up');
        setTimeout(() => {
            optionsContainer.style.display = 'none';
        }, 500);

        // Reset the #container element to ensure it reappears correctly
        container.classList.remove('scale-down'); // Remove any scale-down effect
        container.style.display = 'block'; // Ensure it is visible

        // Ensure the "Imagine" button reappears correctly
        buttonGen.classList.remove('scale-down'); // Remove any scale-down effect
        buttonGen.style.display = 'block'; // Make sure it's visible

        // Apply scale-up-content animation to start screen elements
        buttonGen.classList.add('scale-up');
    } else {
        optionsContainer.style.display = 'block';
        setTimeout(() => {
            optionsContainer.classList.add('scale-up');
        }, 10);

        // Apply scale-down effect to the #container to smoothly transition it out
        container.classList.add('scale-down');
        buttonGen.classList.add('scale-down'); // Also apply scale-down to the "Imagine" button
        setTimeout(() => {
            container.style.display = 'none'; // Hide after animation completes
            buttonGen.style.display = 'none'; // Also hide the "Imagine" button after animation
        }, 500);
    }
}

document.addEventListener('keydown', function(event) {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        // Prevent the default action to stop form submission or any other default behavior
        event.preventDefault();

        // Check if buttonGen is not null to avoid errors in case the button is not found
        if (buttonGen) {
            // Simulate a click on the buttonGen button
            buttonGen.click();
        }
    }
});



cogwheelButton.addEventListener('click', function () {
    // If the optionsContainer is hidden, show it; otherwise, do nothing here
    if (!optionsContainer.style.display || optionsContainer.style.display === 'none') {
        toggleVisibility();
    }
});