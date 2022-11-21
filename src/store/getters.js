const getters = {
  currentComponent: state => state.system.currentComponent,
  currentComponentIndex: state => state.system.currentComponentIndex,
  componentStore: state => state.system.componentStore,
  handleCache: state => state.system.handleCache,
  dragStartComponent: state => state.system.dragStartComponent,
  requestConfig: state => state.system.currentComponent?.store.request,
  globalConfig: state => state.system.globalConfig,
  editorScale: state => state.system.globalConfig.editor.scale / 100,
  isReloadComponent: state => state.system.isReloadComponent
}

export default getters
