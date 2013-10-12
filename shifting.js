(function() {
    // function body
    // ----------------------------------------------------------
    function Shift(element, speed, repeat) {
        var _text;
        var _element;
        var _speed;
        var _repeat;
        var _shiftedText;

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

        var setRepeat = function(repeat) {
            _repeat = (repeat !== undefined) ? repeat : CONFIG.getDefault('repeat');
        };

        var fullyShifted = function() {
            var delimiter = CONFIG.getDefault('shiftDelimiter');

            return _shiftedText.slice(0, -1 * delimiter.length) === _text;
        };

        var init = function(element, speed, repeat) {
            setElement(element);
            setSpeed(speed);
            setRepeat(repeat);

            if (elementDefined()) {
                _shiftedText = _text + CONFIG.getDefault('shiftDelimiter');

                run();
            }
        };

        var run = function() {
            _element.innerText = nextFrame();

            if (_repeat || !fullyShifted()) {
                setTimeout(run, _speed);
            }
            else {
                _element.innerText = _text;
            }
        };

        var nextFrame = function() {
            var frameText = '';
            var firstLetter = _shiftedText[0];

            for (var i = 0; i < _shiftedText.length - 1; i++) {
                frameText += _shiftedText[i + 1]
            }
            frameText += firstLetter;

            _shiftedText = frameText;
            return frameText;
        };

        // run initialization
        init(element, speed, repeat);
    }


    // Config
    // ----------------------------------------------------------
    var CONFIG = (function() {
        var defaults = {
            'speed': 40,
            'repeat': true,
            'text': 'follow the white rabbit',
            'shiftDelimiter': ' '
        };

        return {
            getDefault: function(name) { return defaults[name]; }
        };
    })();


    // create new instance on call
    if (typeof Object.prototype.shiftText !== 'function') {
        Object.prototype.shiftText = function(speed, repeat) {
            return new Shift(this, speed, repeat);
        }
    }
}());