import { UserConfig, defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { injectHtml } from 'vite-plugin-html';
import qiankun from 'vite-plugin-qiankun';

export default defineConfig({
  server: {
    fs: {
      strict: false,
    },
    cors: true,
  },
  resolve: {
    alias: {
      'easy-email-editor/lib/style.css': path.resolve(__dirname, 'package.json'), // 没有用的，只是防止css 404报错
      'easy-email-extensions/lib/style.css': path.resolve(__dirname, 'package.json'), // 没有用的，只是防止css 404报错
      react: path.resolve('./node_modules/react'),
      'react-final-form': path.resolve(__dirname, './node_modules/react-final-form'),
      '@demo': path.resolve(__dirname, './src'),
      '@extensions': path.resolve('../packages/easy-email-extensions/src'),
      '@core': path.resolve('../packages/easy-email-core/src'),
      '@arco-themes': path.resolve('./node_modules/@arco-themes'),
      '@': path.resolve('../packages/easy-email-editor/src'),
      'easy-email-core': path.resolve('../packages/easy-email-core/src/index.tsx'),
      'easy-email-editor/lib/locales.json': path.resolve(
        '../packages/easy-email-editor/public/locales.json',
      ),
      'easy-email-localization': path.resolve('../packages/easy-email-localization'),
      'easy-email-editor': path.resolve('../packages/easy-email-editor/src/index.tsx'),
      'easy-email-extensions': path.resolve(
        '../packages/easy-email-extensions/src/index.tsx',
      ),
      '@arco-design/web-react/dist/css/arco.css': path.resolve(
        './node_modules/@arco-design/web-react/dist/css/arco.css',
      ),
    },
  },

  define: {},
  esbuild: {
    jsxInject: 'import "@arco-design/web-react/dist/css/arco.css";',
  },
  build: {
    minify: 'terser',
    manifest: true,
    sourcemap: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/\/node_modules\/html2canvas\/.*/.test(id)) {
            return 'html2canvas';
          }
          if (/\/node_modules\/lodash\/.*/.test(id)) {
            return 'lodash';
          }
          if (/\/node_modules\/mjml-browser\/.*/.test(id)) {
            return 'mjml-browser';
          }
          if (/easy-email.*/.test(id)) {
            return 'easy-email-editor';
          }
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {},
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    qiankun('email-editor', {
      useDevMode: true,
    }),
    injectHtml({
      data: {
        buildTime: `<meta name="updated-time" content="${new Date().toUTCString()}" />`,
      },
    }),
  ].filter(Boolean),
  // base: 'http://localhost:3000',
  // base: process.env.VITE_APP_URL || 'https://email-editor.flowx.pro/',
});
// const useDevMode = true;

// const baseConfig: UserConfig = {
//   server: {
//     fs: {
//       strict: false,
//     },
//     cors: true,
//   },
//   resolve: {
//     alias: {
//       'easy-email-editor/lib/style.css': path.resolve(__dirname, 'package.json'), // 没有用的，只是防止css 404报错
//       'easy-email-extensions/lib/style.css': path.resolve(__dirname, 'package.json'), // 没有用的，只是防止css 404报错
//       react: path.resolve('./node_modules/react'),
//       'react-final-form': path.resolve(__dirname, './node_modules/react-final-form'),
//       '@demo': path.resolve(__dirname, './src'),
//       '@extensions': path.resolve('../packages/easy-email-extensions/src'),
//       '@core': path.resolve('../packages/easy-email-core/src'),
//       '@arco-themes': path.resolve('./node_modules/@arco-themes'),
//       '@': path.resolve('../packages/easy-email-editor/src'),
//       'easy-email-core': path.resolve('../packages/easy-email-core/src/index.tsx'),
//       'easy-email-editor/lib/locales.json': path.resolve(
//         '../packages/easy-email-editor/public/locales.json',
//       ),
//       'easy-email-localization': path.resolve('../packages/easy-email-localization'),
//       'easy-email-editor': path.resolve('../packages/easy-email-editor/src/index.tsx'),
//       'easy-email-extensions': path.resolve(
//         '../packages/easy-email-extensions/src/index.tsx',
//       ),
//       '@arco-design/web-react/dist/css/arco.css': path.resolve(
//         './node_modules/@arco-design/web-react/dist/css/arco.css',
//       ),
//     },
//   },

//   define: {},
//   esbuild: {
//     jsxInject: 'import "@arco-design/web-react/dist/css/arco.css";',
//   },
//   build: {
//     minify: 'terser',
//     manifest: true,
//     sourcemap: true,
//     target: 'es2015',
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (/\/node_modules\/html2canvas\/.*/.test(id)) {
//             return 'html2canvas';
//           }
//           if (/\/node_modules\/lodash\/.*/.test(id)) {
//             return 'lodash';
//           }
//           if (/\/node_modules\/mjml-browser\/.*/.test(id)) {
//             return 'mjml-browser';
//           }
//           if (/easy-email.*/.test(id)) {
//             return 'easy-email-editor';
//           }
//         },
//       },
//     },
//     outDir: 'lib',
//   },
//   css: {
//     modules: {
//       localsConvention: 'dashes',
//     },
//     preprocessorOptions: {
//       scss: {},
//       less: {
//         javascriptEnabled: true,
//       },
//     },
//   },
//   plugins: [
//     qiankun('easyBlockEditor', {
//       useDevMode,
//     }),
//     ...(useDevMode ? [] : [reactRefresh()]),
//     injectHtml({
//       data: {
//         buildTime: `<meta name="updated-time" content="${new Date().toUTCString()}" />`,
//       },
//     }),
//   ],
// };

// export default ({ mode }: any) => {
//   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
//   baseConfig.base = process.env.VITE_APP_URL || 'https://email-editor.flowx.pro/';
//   if (mode === 'development') {
//     baseConfig.base = '/';
//   }
//   return baseConfig;
// };
