import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const LIBRARY_NAME = 'ui-compass'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin()
    ],
    build: {
        // Configure build as a UMD library
        lib: {
            entry: resolve(process.cwd(), 'ui/index.js'),
            name: 'ui-compass',
            formats: ['es', 'umd'],
            fileName: (format) => {
                if (format === 'es') {
                    return `${LIBRARY_NAME}.esm.js`
                }
                return `${LIBRARY_NAME}.${format}.js`
            }
        },

        // Build directly to resources folder (required by Node-RED Dashboard 2.0)
        outDir: './resources',

        // Declare dependencies that shouldn't be bundled into the library
        rollupOptions: {
            // Don't rollup the Vue dependency into the build
            external: ['vue', 'vuetify'],
            output: {
                // Provide global variables to use in the UMD build
                globals: {
                    vue: 'Vue',
                    vuetify: 'Vuetify'
                }
            }
        }
    }
})
