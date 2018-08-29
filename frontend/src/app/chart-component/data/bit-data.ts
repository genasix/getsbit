
export const bitChart =
  {

    rangeSelector: {
      buttons: [{
        count: 2,
        type: 'hour',
        text: '2h'
      }, {
        count: 10,
        type: 'hour',
        text: '10h'
      }, {
        type: 'all',
        text: 'All'
      }],
      inputEnabled: false,
      selected: 0
    },

    title: {
      text: 'AAPL Historical'
    },
    xAxis: {
      // crosshair: true,
      ordinal: false,

      labels: {
        format: '{value:%Y-%m-%d<br/>%H:%M:%S}',
        align: 'center'
      },
      title: {
        text: '시간'
      },

    },
    yAxis: [{
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'OHLC'
      },
      height: '60%',
      lineWidth: 2,
      resize: {
        enabled: true
      },
      crosshair: true
    }, {
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'Volume'
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
    }],
    tooltip: {
      split: true
    },

    time: { useUTC: false }
  };
