const DEFAULT_APPLICATION_MANAGER_ID = 'oipfApplicationManager';
const HYBRID_TV_VIEWER_FIREFOX_HTML_CLASS_NAME = 'tvViewer';

/**
 * Check if we are on a hbbtv environment.
 *
 * @returns {boolean}
 */
export const isHbbtv = () => {
  const oipfApplicationManager = document.getElementById('oipfApplicationManager');

  return Boolean(oipfApplicationManager && oipfApplicationManager.getOwnerApplication);
};

export const getHbbtvVersion = () =>
  parseFloat(
    navigator.userAgent.substring(
      navigator.userAgent.indexOf('HbbTV/') + 8,
      navigator.userAgent.indexOf(' ', navigator.userAgent.indexOf('HbbTV/')),
    ),
  );

export const isHbbtvTv = () => Number.isNaN(getHbbtvVersion());
export const isHbbtvTv2 = () => isHbbtvTv() || getHbbtvVersion() >= 3.1;

/**
 * Check if we are emulating the OIPF player
 * on Firefox with the extension HybridTvViewer.
 *
 * @see https://github.com/karl-rousseau/HybridTvViewer
 *
 * @returns {boolean}
 */
export const isFirefoxHbbtvEmulation = () => {
  const [htmlTag] = document.getElementsByTagName('html');

  return Boolean(htmlTag.className.trim() === HYBRID_TV_VIEWER_FIREFOX_HTML_CLASS_NAME);
};

/**
 * On firefox hbbtv emulation, the `.stop` method is undefined,
 * therefore we skip that call to be able to play the content
 * and avoid being redirected to the error page.
 */
export const stopBroadcastPlayer = () => {
  const broadcastPlayer = document.getElementById('broadcast');

  broadcastPlayer.bindToCurrentChannel();

  // Explicit condition so webpack excludes the code from the prod build
  if (process.env.REACT_APP_ENV !== 'prod' && isFirefoxHbbtvEmulation()) {
    return;
  }

  broadcastPlayer.stop();
};

export const startBroadcastPlayer = () => {
  const broadcastPlayer = document.getElementById('broadcast');

  broadcastPlayer.bindToCurrentChannel();
};

export const getKeymap = keyset => {
  const { NAVIGATION, VCR, RED, YELLOW, BLUE, GREEN } = keyset;

  return {
    up: NAVIGATION,
    down: NAVIGATION,
    right: NAVIGATION,
    left: NAVIGATION,
    enter: NAVIGATION,
    red: RED,
    green: GREEN,
    yellow: YELLOW,
    blue: BLUE,
    play: VCR,
    pause: VCR,
    back: NAVIGATION,
    rewind: VCR,
    fastForward: VCR,
    stop: VCR,
  };
};

export const getKeyset = (keysList, keyMap) =>
  keysList
    ? Object.keys(keyMap)
        .filter(keyMapIndex => keysList.includes(keyMapIndex))
        /* eslint-disable-next-line no-bitwise */
        .reduce((acc, key) => acc | keyMap[key], 0)
    : 0;

class OipfApplication {
  constructor(applicationManagerId = DEFAULT_APPLICATION_MANAGER_ID) {
    this.applicationManager = document.getElementById(applicationManagerId) || null;
    this.application = null;
    this.keyset = {};
    this.currentKeysets = 0;
    this.keyMap = {};

    if (this.applicationManager && this.applicationManager.getOwnerApplication) {
      this.application = this.applicationManager.getOwnerApplication(document);
      const { keyset } = this.application.privateData;
      this.keyset = keyset;
      this.keyMap = getKeymap(keyset);

      if (this.application.active) {
        this.application.active();
      }

      if (this.application.activateInput) {
        this.application.activateInput();
      }
    }
  }

  updateKeyset = keysList => {
    if (this.application) {
      const keyset = getKeyset(keysList, this.keyMap);
      if (keyset === this.keyset.value) {
        return;
      }
      this.keyset.setValue(keyset);
    }
  };

  show() {
    if (this.application) {
      this.application.show();
    }
  }
}

export default OipfApplication;
