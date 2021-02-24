const { ipcRenderer } = require('electron')

var tracklist = document.getElementById("tracklist")

var root = document.getElementById("root")

var audio = null

var volume = 100

ipcRenderer.invoke('startup', undefined)

require("electron").ipcRenderer.on("load", (event, message) => {
    console.log(message)
    for (let i = 0; i < message.length; i++) {
        var item = document.createElement("li")
        var name = document.createElement("a")
        var playButton = document.createElement("button")
        var group = document.createElement("div")

        name.id = "trackname"
        playButton.id = "trackplaybutton"
        item.id = "trackitem"
        group.id = "trackgroup"

        playButton.innerHTML = "play"
        name.innerHTML = message[i]

        playButton.onclick = function() {
            ipcRenderer.invoke("play", {"trackname": message[i]})
            try {
                audio.pause()
            } catch (error) {
            }
            audio = new Audio(`./tracks/${message[i]}`);
            audio.volume = volume / 100
            console.log(`Volume is: ${audio.volume}`)
            audio.play();
            
        }

       
        item.appendChild(name)
        item.appendChild(playButton)
        group.appendChild(item)


        tracklist.appendChild(group)
    }
    var stopButton = document.createElement("button")
    stopButton.id = "trackstopbutton"
    stopButton.innerHTML = "Stop playing"
    stopButton.onclick = function() {
        audio.pause()
    }

    var sliderdiv = document.createElement("div")
    var sliderinput = document.createElement("input")
    sliderinput.type = "range"
    sliderinput.min = "1"
    sliderinput.max = "100"
    sliderinput.value = "50"
    sliderinput.id = "sliderinput"
    sliderinput.onchange = function () {
        volume = this.value
    }

    sliderdiv.appendChild(sliderinput)

    root.appendChild(sliderdiv)
    root.appendChild(stopButton)

})
