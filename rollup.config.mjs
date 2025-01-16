import { readFileSync } from 'fs';
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import typescriptEngine from 'typescript';

const packageJson = JSON.parse(readFileSync('./package.json'));

export default defineConfig(
{
	input: './src/index.ts',
	output: [
		{
			file: packageJson.module,
			format: 'es',
			exports: 'named',
			sourcemap: false,
		},
	],
	plugins: [
		resolve(),
		commonjs(),
		typescript({
			tsconfig: './tsconfig.json',
			typescript: typescriptEngine,
			sourceMap: false,
			exclude: [
				'coverage',
				'dist',
				'node_modules/**',
				'*.cjs',
				'*.mjs',
				'**/__tests__',
				'**/*.test.js',
				'**/*.test.ts',
				'setupTests.ts'
			],
		}),
		terser(),
	],
},
{
	input: 'dist/src/index.d.ts',
	output: [{ file: 'dist/index.d.ts', format: 'esm' }],
},
);
