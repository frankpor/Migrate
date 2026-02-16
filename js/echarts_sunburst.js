eCharts_sunburstChart = function (data, elementId) {
  let chartDom = document.getElementById(elementId);

  //prevent default right click behavior
  chartDom.oncontextmenu = function (e) {
    e.preventDefault();
  };

  let myChart = echarts.init(chartDom, null, {
    renderer: "svg",
  });
  function outputsize() {
    myChart.resize();
  }
  new ResizeObserver(outputsize).observe(chartDom);

  data = data.children;
  const baseNodeLabel = data.label;
  drawStack();

  const option = {
    series: {
      type: "sunburst",
      data: data,
      radius: [0, "95%"],
      label: {
        show: true,
      },
      itemStyle: {
        borderWidth: 2,
        color: "#fff",
      },
      label: {
        align: "right",
      },
      emphasis: {
        focus: "ancestor",
      },
    },
    tooltip: {
      formatter: function (params) {
        if (params.treePathInfo?.length === 1) {
          return "Click to zoom out";
        }
        return `${params.name}`;
      },
    },
  };

  function drawControls() {
    const text = `
        <p class="m-0 font-weight-bold">How to Navigate:</p>
        <p class="m-0">
          <span class="font-italic">Left Click: </span>
          Click on a segment to zoom into that section. Click the center to go back to the previous level.
        </p>
        <p class="m-0">
          <span class="font-italic">Right Click: </span>
          View its thesaurus page.
        </p>
    `;
    document.getElementById("controls").innerHTML = text;
  }

  drawControls();

  function drawStack() {
    const text = baseNodeLabel;
    document.getElementById("stackContent").innerHTML = text;
  }

  option && myChart.setOption(option);
  myChart.on("mouseup", { seriesIndex: 0 }, function (params) {
    const mouseEvent = params.event.event;

    // right click
    if (mouseEvent.button === 2) {
      const uri = params.data?.title;
      if (uri) {
        window.open(uri, "_blank", "noopener,noreferrer");
      }
    }
  });
};
