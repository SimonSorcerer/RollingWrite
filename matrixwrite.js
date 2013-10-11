var rollingWrite = (function() {
    var _text;
    var _element;
    var _speed;
    var _stopMap;
    var _frame;

    // methods
    var isNodeElement = function(elem) {
        return (elem && elem.nodeType);
    };

    var elementDefined = function() {
        return isNodeElement(_element);
    };

    var setElement = function(elem) {
        if (isNodeElement(elem)) {
            _element = elem;
        }

        setText();
    };

    var setSpeed = function(spd) {
        _speed = spd || CONFIG.getDefault('speed');
    };

    var setText = function() {
        _text = (elementDefined() && _element.innerText) ? _element.innerText : CONFIG.getDefault('text');
    };

    var init = function(element, speed) {
        setElement(element);
        setSpeed(speed);

        if (elementDefined()) {
            createStopMap();
            _frame = 0;

            run();
        }
    };

    var createStopMap = function() {
        _stopMap = [];

        for (var i = 0; i < _text.length; i++) {
            _stopMap[i] = Math.floor(Math.random() * CONFIG.getDefault('repetition_offset')) * 20
                + CONFIG.getDefault('repetitions');
        }
    };

    var run = function() {
        _element.innerText = nextFrame();

        setTimeout(run, _speed + revealedLettersCount());
    };

    var revealedLettersCount = function() {
        var result = 0;

        for (var i = 0; i < _text.length; i++) {
            if (_stopMap[i] <= _frame)
                result++;
        }

        return result;
    };

    var nextFrame = function() {
        var frameText = '';

        for (var i = 0; i < _text.length; i++) {
            frameText += getLetter(_text, i);
        }
        _frame++;

        return frameText;
    };

    var getLetter = function(text, pos) {
        if (text[pos] === ' ') {
            return ' ';
        }
        if (_stopMap[pos] <= _frame) {
            return text[pos];
        }

        return randomLetter();
    };

    var randomLetter = function() {
        var asciiRange = CONFIG.getDefault('ascii_max') - CONFIG.getDefault('ascii_min');

        return String.fromCharCode(Math.floor(Math.random() * asciiRange) + CONFIG.getDefault('ascii_min'));
    };

    // public interface
    return {
        init: init
    }
}());


// Config
// ----------------------------------------------------------
var CONFIG = (function() {
    var defaults = {
        'speed': 1,
        'repetitions': 40,
        'repetition_offset': 20,
        'text': 'follow the white rabbit',
        'ascii_min': 48,
        'ascii_max': 122
    };

    return {
        getDefault: function(name) { return defaults[name]; }
    };
})();