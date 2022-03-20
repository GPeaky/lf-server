const canvas = document.getElementById('canvaz')
const ctx = canvas.getContext("2d");
var image = new Image();
image.onload = function() {
  ctx.drawImage(image, -(1920 / 2), 0);
};

mp.events.add('getBase64cb', (url) => {
    // Convert URL to base64
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            image.src = reader.result;
            mp.events.call('receiveBase64', reader.result)
        }
        reader.readAsDataURL(xhr.response);
    };

    
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
})

// const capture = async () => {
//     let a = 0

//     mp.events.add('renderImage', () => {
//         image.src = `http://screenshots/a.jpg?${a}`
//         a++
//     })
// };

// capture();