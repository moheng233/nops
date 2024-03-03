import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { compileScript, parse as sfcPaser } from "vue/compiler-sfc";
import ts from "typescript";
import { FileTransformer } from "typia/src/transformers/FileTransformer";
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name: 'unplugin-starter',
  transformInclude(id) {
    return id.endsWith('.vue');
  },
  transform(code) {
    const { descriptor: { script }, errors } = sfcPaser(code, {});
    if (errors.length == 0 && script != null && script.lang == "ts") {
      const output = ts.transpileModule(script.content, {
        compilerOptions: {
          
        },
        transformers: {
          before: [
            (context) => transform(context.)
          ]
        }
      });
    }

    return code;
  },
});

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
