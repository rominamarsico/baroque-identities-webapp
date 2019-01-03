const reader = new NFCReader();

reader.onreading = message => {
  if (message.records[0].recordType == 'empty') {
    return;
  }

for (let record of message.records) {
    switch (record.recordType) {
      case "text":
        console.log(`Text: ${record.data}`);
        break;
    }
  }
};

reader.start();