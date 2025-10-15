// N_05/fond_transparent/non-regression-tests.js

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

// A simple function to log successes and failures
const test = (name, assertion) => {
  try {
    assertion();
    console.log(`✅ PASS: ${name}`);
    return true;
  } catch (error) {
    console.error(`❌ FAIL: ${name}`);
    console.error(error);
    return false;
  }
};

// --- Our Two Non-Regression Tests ---

// Test 1: Checks that the core HTML structure is intact.
const testHtmlStructure = () => {
  const htmlPath = path.join(__dirname, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  if (!htmlContent.includes('id="loader-wrapper"')) {
    throw new Error('Missing loader wrapper in index.html.');
  }
  if (!htmlContent.includes('id="main-content"')) {
    throw new Error('Missing main content div in index.html.');
  }
};

// Test 2: Checks that the key JavaScript logic for hiding the loader exists.
const testLoaderHidingLogic = () => {
  const jsPath = path.join(__dirname, 'script.js');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  if (!jsContent.includes("loaderWrapper.classList.add('hidden')")) {
    throw new Error("The logic to add the 'hidden' class is missing from script.js.");
  }
};

// --- Run All Tests ---

console.log('--- Running Custom Non-Regression Tests ---');

const results = [
  test('HTML file should contain the essential structure', testHtmlStructure),
  test('JavaScript file should contain the loader hiding logic', testLoaderHidingLogic),
];

console.log('-------------------------------------------');

// If any test returned `false`, exit with an error code to fail the CI pipeline
if (results.includes(false)) {
  console.error('Some non-regression tests failed.');
  process.exit(1);
}

console.log('All non-regression tests passed!');
