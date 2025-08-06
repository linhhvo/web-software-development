const {defineConfig, devices} = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests',
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'off',
        // storageState: './tests/state.json',
    },

    projects: [
        // {
        //     name: 'chromium',
        //     use: {...devices['Desktop Chrome']},
        // },
        {
            name: 'auth-tests',
            testMatch: '**/auth-tests.spec.js',
            use: {...devices['Desktop Chrome']},
        },
        {
            name: 'features-tests',
            dependencies: ['auth-tests'],
            testMatch: '**/features-tests.spec.js',
            use: {
                ...devices['Desktop Chrome'],
                storageState: './state.json',  // relative to project root
            }
        }

    ],
});