import CalculatorException from './CalculatorException';
import {div, mul, sub, sum} from './operations';

export const supportedOperators: Map<string, (a: number, b: number) => number> = new Map();

supportedOperators.set('+', sum);
supportedOperators.set('-', sub);
supportedOperators.set('*', mul);
supportedOperators.set('/', div);

const priorityOperators = new Set(['*', '/']);

function parseInput(input: string): [string[], number[]] {
  const operators: string[] = [];
  const numbers: number[] = [];

  input.split(/\s/).forEach((rawToken) => {
    if (supportedOperators.has(rawToken)) {
      operators.push(rawToken);
    } else if (Number.isInteger(parseInt(rawToken, 10))) {
      numbers.push(parseInt(rawToken, 10));
    } else {
      throw new CalculatorException(`Unknown operation "${rawToken}" in expression "${input}"`);
    }
  });

  return [operators, numbers]
}

export default (input: string): string => {
  let [operators, numbers] = parseInput(input);

  while (operators.length !== 0) {
    if (operators.some((operator) => priorityOperators.has(operator))) {
      const priorityOperatorIndex = operators.findIndex((operator) => priorityOperators.has(operator));
      const priorityOperator = supportedOperators.get(operators[priorityOperatorIndex]);

      const a = numbers[priorityOperatorIndex];
      const b = numbers[priorityOperatorIndex + 1];

      operators.splice(priorityOperatorIndex, 1);
      numbers.splice(priorityOperatorIndex, 2, priorityOperator(a, b));
    } else {
      const [operator, ...restOperators] = operators;
      const [a, b, ...restNumbers] = numbers;

      numbers = [supportedOperators.get(operator)(a, b), ...restNumbers];
      operators = restOperators;
    }
  }

  if (numbers.length === 1) {
    return numbers.pop().toString();
  }

  throw new CalculatorException(`Can't calculate ${input}`);
};
