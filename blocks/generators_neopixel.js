Blockly.Python['neopixel_setup'] = function(block) {
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC) || '0';
  
  Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['from_neopixel_import_neopixel'] = 'from neopixel import NeoPixel';

  var code = `np = NeoPixel(Pin(${value_pin}, Pin.OUT), ${value_length}); np.bright = 50\n`;
  return code;
};

Blockly.Python['neopixel_set_color1'] = function(block) {
  var value_n = Blockly.Python.valueToCode(block, 'n', Blockly.Python.ORDER_ATOMIC);
  var colour_color = block.getFieldValue('color');

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour_color);
  var red = parseInt(result[1], 16);
  var green = parseInt(result[2], 16);
  var blue = parseInt(result[3], 16);

  var code = `np[${value_n}] = (${red}, ${green}, ${blue})\n`;
  return code;
};

Blockly.Python['neopixel_set_color2'] = function(block) {
  var value_n = Blockly.Python.valueToCode(block, 'n', Blockly.Python.ORDER_ATOMIC);
  var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
  var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
  var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);

  var code = `np[${value_n}] = (${value_red} * np.bright / 100, ${value_green} * np.bright / 100, ${value_blue} * np.bright / 100)\n`;
  return code;
};

Blockly.Python['neopixel_show'] = function(block) {
  var code = 'np.write()\n';
  return code;
};

Blockly.Python['neopixel_clear'] = function(block) {
  var code = 'for x in range(np.n): np[x] = (0, 0, 0)\n';
  return code;
};

Blockly.Python['neopixel_rainbow'] = function(block) {
  var value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC) || '30';

  Blockly.Python.definitions_['from_time_import_sleep_ms'] = 'from time import sleep_ms';

  var functionName = Blockly.Python.provideFunction_(
    'neopixelRainbow',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(np, wait):',
    '  for j in range(256):',
    '    for i in range(np.n):',
    '      WheelPos = (i * 1 + j) & 255',
    '      if WheelPos < 85:',
    '        np[i] = (WheelPos * 3, 255 - WheelPos * 3, 0)',
    '      elif WheelPos < 170:',
    '        WheelPos -= 85',
    '        np[i] = (255 - WheelPos * 3, 0, WheelPos * 3)',
    '      else:',
    '        WheelPos -= 170',
    '        np[i] = (0, WheelPos * 3, 255 - WheelPos * 3)',
    '    sleep_ms(wait)']);

  var code = `${functionName}(${value_wait})\n`;
  return code;
};

Blockly.Python['neopixel_set_brightness'] = function(block) {
  var value_brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC);
  var code = `np.bright = ${value_brightness}\n`;
  return code;
};