var matrixType = (function() {
    var text;
    var domElement;
    var speed;

    // methods
    var isNodeElement = function(elem) {
        return (elem && elem.nodeType);
    };

    var elementDefined = function() {
        return isNodeElement(domElement);
    };

    var setElement = function(elem) {
        if (isNodeElement(elem)) {
            domElement = elem;
        }
    };

    var setSpeed = function(spd) {
        speed = spd || CONFIG.getDefault('speed');
    };

    var setText = function(txt) {
        text = txt || CONFIG.getDefault('text');
    };

    var run = function(element, speed, text) {
        setElement(element);
        setText(text);
        setSpeed(speed);

        if (elementDefined()) {
            domElement.innerText = nextFrame();
        }
    };

    var nextFrame = function() {
        var frameText = '';

        for(var i = 0; i < text.length; i++) {
            frameText += randomLetter();
        }
    };

    var randomLetter = function() {
        return String.fromCharCode(Math.floor(Math.random() * asciiRange()) + CONFIG.getDefault('ascii_min'));
    };

    var asciiRange = function() {
        return CONFIG.getDefault('ascii_max') - CONFIG.getDefault('ascii_min');
    };

    // public interface
    return {
        run: run
    }
}());


// Config
// ----------------------------------------------------------
var CONFIG = (function() {
    var defaults = {
        'speed': '10',
        'text': 'follow the white rabbit',
        'ascii_min': 48,
        'ascii_max': 122
    };

    return {
        getDefault: function(name) { return defaults[name]; }
    };
})();