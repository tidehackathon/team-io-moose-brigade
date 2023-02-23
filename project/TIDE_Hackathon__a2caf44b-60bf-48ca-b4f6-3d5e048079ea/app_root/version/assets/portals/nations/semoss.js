class Semoss {
  _insightID = null; //insightID
  _panelId = null; //panelId
  _callbacks = {}; // callbacks for the run/query pixel
  _eventTarget = new EventTarget(); // event target to store event listeners

  constructor() {
    if (!window) {
      console.error("Cannot find window. Component must be mounted");
    }

    // set the insightID and panelId based on the url
    const urlParams = new URLSearchParams(window.location.search);
    this._insightID = urlParams.get("semoss-iframe-insight-id");
    this._panelId = urlParams.get("semoss-iframe-panel-id");

    if (!this._insightID || !this._panelId) {
      console.error("Insight id and panel id are required");
      return;
    }

    // add the listener
    window.addEventListener(
      "message",
      (message) => {
        let messageObject;

        try {
          messageObject = JSON.parse(message.data);
        } catch (e) {
          // not a valid message we're expecting so don't process it
          return;
        }

        // ignore if it is not the correct one
        if (
          !messageObject.data ||
          messageObject.data.insightID !== this._insightID ||
          messageObject.data.panelId !== this._panelId
        ) {
          return;
        }

        if (messageObject.message === "semoss-iframe-run-pixel--end") {
          this._handleRun(messageObject.data);
        } else if (messageObject.message === "semoss-iframe-query-pixel--end") {
          this._handleQuery(messageObject.data);
        } else if (messageObject.message === "semoss-iframe-process-pixel") {
          this._handleProcess(messageObject.data);
        }
      },
      false
    );
  }

  /** Actions */

  /**
   * Run a pixel on the insight and trigger a callback to return results
   */
  run(pixel, callback) {
    // needs an insightID
    if (!this._insightID) {
      console.error("Insight ID not found");
      return;
    }

    // generate a new key
    const key = this._generateId();

    // register the callback
    this._callbacks[key] = callback;

    // emit the message
    window.parent.postMessage(
      JSON.stringify({
        message: "semoss-iframe-run-pixel--start",
        data: {
          key: key,
          insightID: this._insightID,
          panelId: this._panelId,
          pixel: pixel,
        },
      })
    );
  }

  /**
   * Query the insight and trigger a callback to return results
   */
  query(pixel, callback) {
    // needs an insightID
    if (!this._insightID) {
      console.error("Insight ID not found");
      return;
    }

    // generate a new key
    const key = this._generateId();

    // register the callback
    this._callbacks[key] = callback;

    // emit the message
    window.parent.postMessage(
      JSON.stringify({
        message: "semoss-iframe-query-pixel--start",
        data: {
          key: key,
          insightID: this._insightID,
          panelId: this._panelId,
          pixel: pixel,
        },
      })
    );
  }

  /**
   * Dispatch a pixel to update the insight
   */
  dispatch(pixel) {
    // needs an insightID
    if (!this._insightID) {
      console.error("Insight ID not found");
      return;
    }

    // emit the message
    window.parent.postMessage(
      JSON.stringify({
        message: "semoss-iframe-dispatch-pixel",
        data: {
          insightID: this._insightID,
          panelId: this._panelId,
          pixel: pixel,
        },
      })
    );
  }

  /**
   * Add a listener to the message
   */
  addListener(event, callback) {
    this._eventTarget.addEventListener(event, callback);
  }

  /**
   * Remove an event listener to the message
   */
  removeListener(event, callback) {
    this._eventTarget.removeEventListener(event, callback);
  }

  /** Listeners */
  /**
   * Process the pixel return from a query-pixel
   */
  _handleQuery(data) {
    // get the key
    const key = data.key;

    // need a key and a callback
    if (!key || !this._callbacks[key]) {
      console.error(
        "Cannot find callback for key (" + key + ") for query-pixel"
      );
      return;
    }

    // call the callback
    this._callbacks[key](data.payload);

    // delete the callback
    delete this._callbacks[key];
  }

  /**
   * Process the pixel return from a run-pixel
   */
  _handleRun(data) {
    // get the key
    const key = data.key;

    // need a key and a callback
    if (!key || !this._callbacks[key]) {
      console.error("Cannot find callback for key (" + key + ") for run-pixel");
      return;
    }

    // call the callback
    this._callbacks[key](data.payload);

    // delete the callback
    delete this._callbacks[key];
  }

  /**
   * Process any pixel that was run
   */
  _handleProcess(data) {
    // create an event and dispatch it
    const e = new CustomEvent("pixel-update", { detail: data });

    this._eventTarget.dispatchEvent(e);
  }

  /** Utility Methods */
  /**
   * Generate a unique Id
   * @returns unique string
   */
  _generateId() {
    return "key--" + (Math.floor(Math.random() * 1000000000000) + Date.now());
  }
}

// register to the window
window.Semoss = Semoss;
