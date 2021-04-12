import { createInterface } from 'readline';
import response from './calculator';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (): Promise<null> =>
  new Promise((resolve) => {
    rl.question('> ', (answer: string) => {
      try {
        const result = response(answer);
        console.log(`> ${result}`);
      } catch (e) {
        console.log(`> ${e.message}`);
      } finally {
        resolve(null);
      }
    });
  });

async function app(): Promise<null> {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await question();
  }
}

app();
