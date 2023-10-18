// Background script/ main logic

// Get specific text matches of current tab
function getSpecificText() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        //call injection script    
        chrome.tabs.sendMessage(tabs[0].id, "getAllText", function (response) {
            if(response == undefined) {
                alert("Try reloading the page or closing and reopeing the extension")
            }

            let searchWords = [
                "h1b", "H1B", "H1b", "H1-B", "h1-b", "H1-b", "sponsorship", "sponsor", "cannot sponsor", 
                "no sponsorship", "unable to sponsor", "not able to sponsor", "polygraph", 
                "ts/sci", "poly", "clearance", "Clearance", "security clearance", "Security Clearance", "USC/GC", "US citizen", "US citizenship",
                "We are unable to sponsor H1B visas at this time", "Candidates requiring sponsorship for H1B visas will not be considered",
                "We do not sponsor work visas including H1B, E3, or TN visas", "Candidates must be authorized to work in the United States without sponsorship",
                "We are unable to consider candidates who require visa sponsorship, including H1B", "Unfortunately, we are not able to sponsor H1B visas for this position",
                "Applicants must have valid work authorization in the U.S. that does not require sponsorship",
                "Active security clearance required", "Must have a current or active security clearance",
                "Applicants must be able to obtain and maintain a security clearance", "Candidates must have a Secret/Top Secret/SCI clearance",
                "Security clearance eligibility is required for this position", "The successful candidate must have a background investigation and security clearance",
                "Job requires a security clearance at the Secret/Top Secret/SCI level","Candidates must be US citizens", 
                "US citizenship is required for this position", "Applicants must be eligible to obtain and maintain a US government security clearance",
                "This position is restricted to US citizens only", "Must be a US person",
                "US citizenship or permanent residency is required", "All applicants must be authorized to work in the United States and must be a US citizen",
                "Candidates must be US citizens or lawful permanent residents", "US citizenship or permanent residency is required for this position",
                "Applicants must be eligible to obtain and maintain a US government security clearance and be either a US citizen or a lawful permanent resident",
                "This position is restricted to US citizens and lawful permanent residents only", "Must be a US person, including US citizens and permanent residents",
                "All applicants must be authorized to work in the United States and must be either a US citizen or a lawful permanent resident"
            ]

            let matches = []
            for(let i = 0; i< searchWords.length; ++i) {
                let currentWord = searchWords[i]
                let searchRegex = new RegExp(currentWord, "gi")
                let match = response?.allText.match(searchRegex)
                if(match != null)   
                    matches.push(match)
            }

            // console.log("Matched : ", matches)

            if (matches.length == 0) {
                document.getElementById("text").innerText = "No words found on this page."
                return
            }

            document.getElementById("text").innerText = "Found: " + matches
      })
    })
}
  
document.addEventListener("DOMContentLoaded", function () {
    var printButton = document.getElementById("print-btn")
    printButton.addEventListener("click", getSpecificText)
})

// Get all the text of current tab
function printAllText() {
    console.log("printAllText ")
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {  
        chrome.tabs.sendMessage(tabs[0].id, "getAllText", function (response) {
            if(response == undefined) {
                alert("Try reloading the page or closing and reopeing the extension")
            }
            document.getElementById("text2").innerText = response?.allText
            // console.log(response)
        })
    })
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("print ")
    var printButton = document.getElementById("print-btn2")
    printButton.addEventListener("click", printAllText)
})


function sendEmail() {
    const emailAddress = document.getElementById('emailInput').value
    console.log("Email content ", emailAddress)
    const emailContent = document.getElementById("text2").innerText
    var templateParams = {
        to_email: emailAddress,
        from_name: 'Akash',
        message: emailContent
    }
    emailjs.send('service_6qlnc5s', 'template_8n1x2yf', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text)
           document.getElementById("email-status-text").innerText = "Email sent successfully !!!"
        }, function(error) {
           console.log('FAILED...', error)
           document.getElementById("email-status-text").innerText = "Error: email not sent !!!"
    })
}


// Send text to an email
document.addEventListener('DOMContentLoaded', function() {
    console.log("Email 3.1")
    emailjs.init("0LiICfdS1DZDaOawo")
    const emailButton = document.getElementById('sendEmail-btn')
    emailButton.addEventListener("click", function() { sendEmail() })
})




// ! Not working 
// Get all the images of current tab
function getImages() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {  
        chrome.tabs.sendMessage(tabs[0].id, "getAllImages", async function (response) {
            if(response == undefined) {
                alert("Try reloading the page or closing and reopeing the extension")
            }
            // console.log("Images ", response)
            // Download
            // response.images.forEach(async img => {
            //     await chrome.downloads.download({
            //         url: img.url,
            //         filename: "CE_Downloads_" + img.filename
            //     })
            // })
            // Send to image to text api
            document.getElementById("text3").innerText = response.images
        })
    })
}

document.addEventListener("DOMContentLoaded", function () {
    var printButton = document.getElementById("print-btn3")
    printButton.addEventListener("click", getImages)
})


// // Get all the videos of current tab
function getAllVideos() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {  
        chrome.tabs.sendMessage(tabs[0].id, "getAllVideos", async function (response) {
            // if(response == undefined) {
            //     alert("Try reloading the page or closing and reopeing the extension")
            // }
            // console.log("Vidoes ", response)
            // Download
            // response.images.forEach(async img => {
            //     await chrome.downloads.download({
            //         url: img.url,
            //         filename: "CE_Downloads_" + img.filename
            //     })
            // })
            // Send to image to text api
            document.getElementById("text4").innerText = response.videos
        })
    })
}

document.addEventListener("DOMContentLoaded", function () {
    var printButton = document.getElementById("print-btn4")
    printButton.addEventListener("click", getAllVideos)
})