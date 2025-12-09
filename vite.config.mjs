import { resolve } from 'path'
import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const LIBRARY_NAME = 'ui-compass'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin(),
        viteStaticCopy({
            targets: [
                {
                    // Copy the build output into Node-RED's /resources folder
                    src: normalizePath(resolve(process.cwd(), `./ui/dist/${LIBRARY_NAME}.umd.js`)),
                    dest: normalizePath(resolve(process.cwd(), 'resources'))
                },
                {
                    // Copy the ESM build too
                    src: normalizePath(resolve(process.cwd(), `./ui/dist/${LIBRARY_NAME}.esm.js`)),
                    dest: normalizePath(resolve(process.cwd(), 'resources'))
                }
            ]
        })
    ],
    build: {
        // Configure build as a UMD library
        lib: {
            entry: resolve(process.cwd(), 'ui/index.js'),
            name: 'UICompass',
            formats: ['es', 'umd'],
            fileName: (format) => {
                if (format === 'es') {
                    return `${LIBRARY_NAME}.esm.js`
                }
                return `${LIBRARY_NAME}.${format}.js`
            }
        },

        // This is the target location for the build output
        outDir: './ui/dist',

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
