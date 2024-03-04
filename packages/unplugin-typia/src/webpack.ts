import { createWebpackPlugin } from 'unplugin'
import { unpluginFactory } from '.'
import { WebpackPluginInstance } from "webpack";

export default createWebpackPlugin(unpluginFactory)
