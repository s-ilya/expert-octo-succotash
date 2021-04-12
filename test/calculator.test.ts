import response, { supportedOperators } from '../src/calculator';

describe('Calculator should', () => {
  test('sum two numbers', () => {
    expect(response('1 + 2')).toBe('3');
  });

  test('sum three numbers', () => {
    expect(response('11 + 21 + 31')).toBe('63');
  });

  test('subtract two numbers', () => {
    expect(response('99 - 33')).toBe('66');
  });

  test('subtract three numbers', () => {
    expect(response('99 - 33 - 11')).toBe('55');
  });

  test('mix sum and sub operations', () => {
    expect(response('99 + 42 - 41')).toBe('100');
  });

  test('work with negative numbers', () => {
    expect(response('-10 - 50 + 20')).toBe('-40');
  });

  test('multiply two numbers', () => {
    expect(response('-2 * 42')).toBe('-84');
  });

  test('prioritize operations', () => {
    expect(response('1 + 2 * 3')).toBe('7');
  });

  test('divide numbers', () => {
    expect(response('1 + 3 / 2')).toBe('2.5');
  });

  test('mix priority operators', () => {
    expect(response('10 + 20 * 2 / 4')).toBe('20');
  });

  test('work with random cases', () => {
    function getRandomInt(min: number, max: number): number {
      // eslint-disable-next-line no-param-reassign
      min = Math.ceil(min);
      // eslint-disable-next-line no-param-reassign
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min) + min);
    }

    function getRandomOperation() {
      return Array.from(supportedOperators.keys())[getRandomInt(0, 4)];
    }

    for (let generatedInputIndex = 0; generatedInputIndex < 100; generatedInputIndex += 1) {
      let input = `${getRandomInt(-100, 100)}`;
      for (let generatedIndex = 0; generatedIndex < 10; generatedIndex += 1) {
        input = `${input} ${getRandomOperation()} ${getRandomInt(0, 100)}`;
      }

      // eslint-disable-next-line no-eval
      const expected = eval(input).toString()

      // eslint-disable-next-line no-console
      console.log(`For "${input}" expecting ${expected}`);

      expect(response(input)).toBe(expected);
    }
  });
});
