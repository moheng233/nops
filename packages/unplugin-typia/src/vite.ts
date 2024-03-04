import { createVitePlugin } from 'unplugin'
import { unpluginFactory } from '.'
import { Plugin } from 'vite';

export default createVitePlugin(unpluginFactory)
