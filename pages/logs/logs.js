// logs.js
import * as echarts from '../../component/ec-canvas/echarts';


function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: 500,
    height: 500,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  let option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({

  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
