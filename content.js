// injection script

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request === "getAllText") {
        var allText = document.body.innerText
        console.log("content ")
        sendResponse({ allText: allText })
    }
})

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request === "sendEmailBG") {
//         console.log("sendEmailBG ")
//         sendResponse({ result: "success" })
//     }
// })

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log("highlight text ", request)
//     if (request.action === "highlightAllText") {
//         let matches = request.matchedWords
//         if (matches.length > 0) {
//             sendResponse({ message: "Highlighted all occurrences" }) 
//         }
//         else 
//             sendResponse({ message: "No occurrences" })
//     }
//     sendResponse({ message: "Invalid action" })
// })


// ! Not working
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // sendResponse({ message: "Downloaded all images", images: [] })
    if (request === "getAllImages") {
        try {
            const res = downloadImages()
            sendResponse({ message: "Downloaded all images", images: res })
        }
        catch(error) {
            console.log("Error in downloadImages injection script", error)
            sendResponse({ message: "Error in downloadImages" })
        }

    }
})


// Download all the images on the current webpage
function downloadImages() {
    // Get all the images on the page
    let result = []
    const imageTags = Array.from(document.images)
    // Loop through the image tags and add to result the images as jpg and png
    imageTags.forEach(img => {
        if (img && img.src) {
            // extension check
            let tempFileName = getFileName(img.src)
            let hasExtension = false 
            if(tempFileName.endsWith(".jpg") || tempFileName.endsWith(".png") || tempFileName.endsWith(".svg"))
                hasExtension = true

            result.push({
                url: img.src,
                filename: hasExtension ? tempFileName : tempFileName + ".jpg"
            })
            result.push({
                url: img.src,
                filename: hasExtension ? tempFileName : tempFileName + ".png"
            })
        }
    })

    // // Get all the elements on the page
    // const elements = Array.from(document.getElementsByTagName("*"))
    // // Loop through the elements and check for background images
    // elements.forEach(el => {
    //   const style = window.getComputedStyle(el)
    //   const backgroundImage = style.getPropertyValue("background-image")
    //   if (backgroundImage && backgroundImage !== "none") {
    //     const imageUrl = backgroundImage.slice(4, -1).replace(/['"]/g, "")
    //     result.push({
    //         url: imageUrl,
    //         filename: getFileName(imageUrl) + ".png"
    //     })
    //     result.push({
    //         url: imageUrl,
    //         filename: getFileName(imageUrl) + ".jpg"
    //     })
    //   }
    // })

    return result
}

// helper 
function getFileName(url) {
    const urlParts = url.split("/")
    const fileNameWithParams = urlParts[urlParts.length - 1]
    const fileName = fileNameWithParams.split("?")[0]
    return fileName
}


// Download videos
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request === "getAllVideos") {
        // const videoEl = document.querySelector("video")
        const videos = Array.from(document.getElementsByTagName("video"))
        const iframes = document.getElementsByTagName("iframe")
        // let res = ["vid1", "vid2"]
        let res = []
        // videos.forEach(vid => {
        //     res.push(vid)
        // })


        iframes.forEach(iframe => {
            try {
              const iframeDoc = iframe.contentDocument
              const iframeVideos = Array.from(iframeDoc.getElementsByTagName("video"))
              iframeVideos.forEach((video) => {
                if (video) {
                    res.push(video)
                //   downloadVideo(video.src)
                }
              })
            } catch (e) {
              console.error("Error accessing iframe", e)
            }
        })

        // sendResponse({ message: "Downloaded all videos", videos: res })  
        sendResponse({ message: "Downloaded all videos", videos: iframes })  
    } else {
            sendResponse({ message: "Error on videos download" })
    } 
})