import React, { Component } from "react";
import firebase from '../firebase';

class NFCtestAvailability extends Component {
  constructor(props) {
    super(props);
    this.readWriteNfc = this.readWriteNfc.bind(this);
    this.consoleLog = this.consoleLog.bind(this);
    this.processMessage = this.processMessage.bind(this);
    this.processPng = this.processPng.bind(this);
    this.processJSON = this.processJSON.bind(this);
  }

  consoleLog(data) {
    var logElement = document.getElementById('log');
    logElement.innerHTML += '\n' + data;
  }

  processPng(data) {
    this.consoleLog("Known image/png data");

    var img = document.createElement("img");
    img.src = URL.createObjectURL(new Blob(data, 'image/png'));
    img.onload = function () {
      window.URL.revokeObjectURL(this.src);
    };
  };

  processJSON(data) {
    var obj = JSON.parse(data);
    this.consoleLog("JSON data: " + obj.myProperty.toString());
  };

  processMessage(message) {
    message.data.forEach(function (record) {
      if (record.recordType == "string") {
        this.consoleLog('Data is string: ' + record.data);
      } else if (record.recordType == "json") {
        this.processJSON(record.data);
      } else if (record.recordType == "url") {
        this.consoleLog("Data is URL: " + record.data);
      } else if (record.recordType == "opaque" && record.mediaType == 'image/png') {
        this.processPng(record.data);
      };
    });
  }

  readWriteNfc() {
    if ('nfc' in navigator) {
      navigator.nfc.watch(function (message) {
          this.consoleLog("NFC message received from URL " + message.url);
          if (message.data[0].recordType === 'empty') {
            navigator.nfc.push([{
              url: message.url,
              data: [{
                recordType: "text",
                data: 'Hello World'
              }]
            }]);
          }
          this.processMessage(message);
        }, {mode: 'any'})
        .then(() => this.consoleLog("Added a watch."))
        .catch(err => this.consoleLog("Adding watch failed: " + err.name));
    } else {
      this.consoleLog('NFC API not supported.');
    }
  }

  render() {
    return(
      <div>
        <p>
          <button class="btn btn-lg btn-default" onClick={this.readWriteNfc}>Test NFC Read/Write</button>
        </p>
        <pre id="log" />
      </div>
    );
  }
}

export default NFCtestAvailability;
