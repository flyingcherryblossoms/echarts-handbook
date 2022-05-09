(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{391:function(n,e,t){"use strict";t.r(e),e.default="# 数据集\n\n`数据集`（`dataset`）是专门用来管理数据的组件。虽然每个系列都可以在 `series.data` 中设置数据，但是从 ECharts4 支持 `数据集` 开始，更推荐使用 `数据集` 来管理数据。因为这样，数据可以被多个组件复用，也方便进行 “数据和其他配置” 分离的配置风格。毕竟，在运行时，数据是最常改变的，而其他配置大多并不会改变。\n\n## 在系列中设置数据\n\n如果数据设置在 `系列`（`series`）中，例如：\n\n```js live\noption = {\n  xAxis: {\n    type: 'category',\n    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']\n  },\n  yAxis: {},\n  series: [\n    {\n      type: 'bar',\n      name: '2015',\n      data: [89.3, 92.1, 94.4, 85.4]\n    },\n    {\n      type: 'bar',\n      name: '2016',\n      data: [95.8, 89.4, 91.2, 76.9]\n    },\n    {\n      type: 'bar',\n      name: '2017',\n      data: [97.7, 83.1, 92.5, 78.1]\n    }\n  ]\n};\n```\n\n这种方式的优点是，适于对一些特殊的数据结构（如“树”、“图”、超大数据）进行一定的数据类型定制。\n但是缺点是，常需要用户先处理数据，把数据分割设置到各个系列（和类目轴）中。此外，不利于多个系列共享一份数据，也不利于基于原始数据进行图表类型、系列的映射安排。\n\n## 在数据集中设置数据\n\n而数据设置在 `数据集`（`dataset`）中，会有这些好处：\n\n- 能够贴近数据可视化常见思维方式：（I）提供数据，（II）指定数据到视觉的映射，从而形成图表。\n- 数据和其他配置可以被分离开来。数据常变，其他配置常不变。分开易于分别管理。\n- 数据可以被多个系列或者组件复用，对于大数据量的场景，不必为每个系列创建一份数据。\n- 支持更多的数据的常用格式，例如二维数组、对象数组等，一定程度上避免使用者为了数据格式而进行转换。\n\n下面是一个最简单的 `dataset` 的例子：\n\n```js live\noption = {\n  legend: {},\n  tooltip: {},\n  dataset: {\n    // 提供一份数据。\n    source: [\n      ['product', '2015', '2016', '2017'],\n      ['Matcha Latte', 43.3, 85.8, 93.7],\n      ['Milk Tea', 83.1, 73.4, 55.1],\n      ['Cheese Cocoa', 86.4, 65.2, 82.5],\n      ['Walnut Brownie', 72.4, 53.9, 39.1]\n    ]\n  },\n  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。\n  xAxis: { type: 'category' },\n  // 声明一个 Y 轴，数值轴。\n  yAxis: {},\n  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。\n  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]\n};\n```\n\n或者也可以使用常见的“对象数组”的格式：\n\n```js live\noption = {\n  legend: {},\n  tooltip: {},\n  dataset: {\n    // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，\n    // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。\n    // 如果不指定 dimensions，也可以通过指定 series.encode\n    // 完成映射，参见后文。\n    dimensions: ['product', '2015', '2016', '2017'],\n    source: [\n      { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },\n      { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },\n      { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },\n      { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }\n    ]\n  },\n  xAxis: { type: 'category' },\n  yAxis: {},\n  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]\n};\n```\n\n## 数据到图形的映射\n\n如上所述，数据可视化的一个常见思路是：（I）提供数据，（II）指定数据到视觉的映射。\n\n简而言之，可以进行这些映射的设定：\n\n- 指定 `数据集` 的列（column）还是行（row）映射为 `系列`（`series`）。这件事可以使用 [series.seriesLayoutBy](${optionPath}#series.seriesLayoutBy) 属性来配置。默认是按照列（column）来映射。\n- 指定维度映射的规则：如何从 dataset 的维度（一个“维度”的意思是一行/列）映射到坐标轴（如 X、Y 轴）、提示框（tooltip）、标签（label）、图形元素大小颜色等（visualMap）。这件事可以使用 [series.encode](${optionPath}#series.encode) 属性，以及 [visualMap](${optionPath}#visualMap) 组件来配置（如果有需要映射颜色大小等视觉维度的话）。上面的例子中，没有给出这种映射配置，那么 ECharts 就按最常见的理解进行默认映射：X 坐标轴声明为类目轴，默认情况下会自动对应到 `dataset.source` 中的第一列；三个柱图系列，一一对应到 `dataset.source` 中后面每一列。\n\n下面详细解释这些映射的设定。\n\n## 把数据集（ dataset ）的行或列映射为系列（series）\n\n有了数据表之后，使用者可以灵活地配置：数据如何对应到轴和图形系列。\n\n用户可以使用 `seriesLayoutBy` 配置项，改变图表对于行列的理解。`seriesLayoutBy` 可取值：\n\n- 'column': 默认值。系列被安放到 `dataset` 的列上面。\n- 'row': 系列被安放到 `dataset` 的行上面。\n\n看这个例子：\n\n```js live\noption = {\n  legend: {},\n  tooltip: {},\n  dataset: {\n    source: [\n      ['product', '2012', '2013', '2014', '2015'],\n      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],\n      ['Milk Tea', 86.5, 92.1, 85.7, 83.1],\n      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]\n    ]\n  },\n  xAxis: [\n    { type: 'category', gridIndex: 0 },\n    { type: 'category', gridIndex: 1 }\n  ],\n  yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],\n  grid: [{ bottom: '55%' }, { top: '55%' }],\n  series: [\n    // 这几个系列会出现在第一个直角坐标系中，每个系列对应到 dataset 的每一行。\n    { type: 'bar', seriesLayoutBy: 'row' },\n    { type: 'bar', seriesLayoutBy: 'row' },\n    { type: 'bar', seriesLayoutBy: 'row' },\n    // 这几个系列会出现在第二个直角坐标系中，每个系列对应到 dataset 的每一列。\n    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },\n    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },\n    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },\n    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }\n  ]\n};\n```\n\n## 维度（ dimension ）\n\n常用图表所描述的数据大部分是“二维表”结构，上述的例子中，我们都使用二维数组来容纳二维表。现在，当我们把系列（ series ）对应到“列”的时候，那么每一列就称为一个“维度（ dimension ）”，而每一行称为数据项（ item ）。反之，如果我们把系列（ series ）对应到表行，那么每一行就是“维度（ dimension ）”，每一列就是数据项（ item ）。\n\n维度可以有单独的名字，便于在图表中显示。维度名（ dimension name ）可以在定义在 dataset 的第一行（或者第一列）。例如上面的例子中，`'score'`、`'amount'`、`'product'` 就是维度名。从第二行开始，才是正式的数据。`dataset.source` 中第一行（列）到底包含不包含维度名，ECharts 默认会自动探测。当然也可以设置 `dataset.sourceHeader: true` 显示声明第一行（列）就是维度，或者 `dataset.sourceHeader: false` 表明第一行（列）开始就直接是数据。\n\n维度的定义，也可以使用单独的 `dataset.dimensions` 或者 `series.dimensions` 来定义，这样可以同时指定维度名，和维度的类型（ dimension type ）：\n\n```js\nvar option1 = {\n  dataset: {\n    dimensions: [\n      { name: 'score' },\n      // 可以简写为 string ，表示 dimension name 。\n      'amount',\n      // 可以在 type 中指定维度类型。\n      { name: 'product', type: 'ordinal' }\n    ],\n    source: [\n      //...\n    ]\n  }\n  // ...\n};\n\nvar option2 = {\n  dataset: {\n    source: [\n      // ...\n    ]\n  },\n  series: {\n    type: 'line',\n    // series.dimensions 会更优先于 dataset.dimension 采纳。\n    dimensions: [\n      null, // 可以设置为 null 表示不想设置维度名\n      'amount',\n      { name: 'product', type: 'ordinal' }\n    ]\n  }\n  // ...\n};\n```\n\n大多数情况下，我们并不需要去设置维度类型，因为 ECharts 会自动尝试判断。但是如果不足够准确时，可以手动设置维度类型。\n\n维度类型（ dimension type ）可以取这些值：\n\n- `'number'`: 默认，表示普通数据。\n- `'ordinal'`: 对于类目、文本这些 string 类型的数据，如果需要能在数轴上使用，须是 'ordinal' 类型。ECharts 默认会试图自动判断这个类型。但是自动判断也可能不准确，所以使用者也可以手动强制指定。\n- `'time'`: 表示时间数据。设置成 `'time'` 则能支持自动解析数据成时间戳（timestamp），比如该维度的数据是 '2017-05-10'，会自动被解析。如果这个维度被用在时间数轴（[axis.type](${optionPath}#xAxis.type) 为 `'time'`）上，那么会被自动设置为 `'time'` 类型。时间类型的支持参见 [data](${optionPath}#series.data)。\n- `'float'`: 如果设置成 `'float'`，在存储时候会使用 `TypedArray`，对性能优化有好处。\n- `'int'`: 如果设置成 `'int'`，在存储时候会使用 `TypedArray`，对性能优化有好处。\n\n## 数据到图形的映射（ series.encode ）\n\n了解了维度的概念后，我们就可以使用 [series.encode](${optionPath}#series.encode) 来做映射。总体是这样的感觉：\n\n```js live\nvar option = {\n  dataset: {\n    source: [\n      ['score', 'amount', 'product'],\n      [89.3, 58212, 'Matcha Latte'],\n      [57.1, 78254, 'Milk Tea'],\n      [74.4, 41032, 'Cheese Cocoa'],\n      [50.1, 12755, 'Cheese Brownie'],\n      [89.7, 20145, 'Matcha Cocoa'],\n      [68.1, 79146, 'Tea'],\n      [19.6, 91852, 'Orange Juice'],\n      [10.6, 101852, 'Lemon Juice'],\n      [32.7, 20112, 'Walnut Brownie']\n    ]\n  },\n  xAxis: {},\n  yAxis: { type: 'category' },\n  series: [\n    {\n      type: 'bar',\n      encode: {\n        // 将 \"amount\" 列映射到 X 轴。\n        x: 'amount',\n        // 将 \"product\" 列映射到 Y 轴。\n        y: 'product'\n      }\n    }\n  ]\n};\n```\n\n`series.encode` 声明的基本结构如下。其中冒号左边是坐标系、标签等特定名称，如 `'x'`, `'y'`, `'tooltip'` 等，冒号右边是数据中的维度名（string 格式）或者维度的序号（number 格式，从 0 开始计数），可以指定一个或多个维度（使用数组）。通常情况下，下面各种信息不需要所有的都写，按需写即可。\n\n下面是 `series.encode` 支持的属性：\n\n```js\n// 在任何坐标系和系列中，都支持：\nencode: {\n  // 使用 “名为 product 的维度” 和 “名为 score 的维度” 的值在 tooltip 中显示\n  tooltip: ['product', 'score']\n  // 使用 “维度 1” 和 “维度 3” 的维度名连起来作为系列名。（有时候名字比较长，这可以避免在 series.name 重复输入这些名字）\n  seriesName: [1, 3],\n  // 表示使用 “维度2” 中的值作为 id。这在使用 setOption 动态更新数据时有用处，可以使新老数据用 id 对应起来，从而能够产生合适的数据更新动画。\n  itemId: 2,\n  // 指定数据项的名称使用 “维度3” 在饼图等图表中有用，可以使这个名字显示在图例（legend）中。\n  itemName: 3\n}\n\n// 直角坐标系（grid/cartesian）特有的属性：\nencode: {\n  // 把 “维度1”、“维度5”、“名为 score 的维度” 映射到 X 轴：\n  x: [1, 5, 'score'],\n  // 把“维度0”映射到 Y 轴。\n  y: 0\n}\n\n// 单轴（singleAxis）特有的属性：\nencode: {\n  single: 3\n}\n\n// 极坐标系（polar）特有的属性：\nencode: {\n  radius: 3,\n  angle: 2\n}\n\n// 地理坐标系（geo）特有的属性：\nencode: {\n  lng: 3,\n  lat: 2\n}\n\n// 对于一些没有坐标系的图表，例如饼图、漏斗图等，可以是：\nencode: {\n  value: 3\n}\n```\n\n这是个更丰富的 `series.encode` 的 [示例](${exampleEditorPath}dataset-encode1&edit=1&reset=1) 。\n\n## 默认的 series.encode\n\n值得一提的是，当 `series.encode` 并没有指定时，ECharts 针对最常见直角坐标系中的图表（折线图、柱状图、散点图、K 线图等）、饼图、漏斗图，会采用一些默认的映射规则。默认的映射规则比较简单，大体是：\n\n- 在坐标系中（如直角坐标系、极坐标系等）\n  - 如果有类目轴（axis.type 为 'category'），则将第一列（行）映射到这个轴上，后续每一列（行）对应一个系列。\n  - 如果没有类目轴，假如坐标系有两个轴（例如直角坐标系的 X Y 轴），则每两列对应一个系列，这两列分别映射到这两个轴上。\n- 如果没有坐标系（如饼图）\n  - 取第一列（行）为名字，第二列（行）为数值（如果只有一列，则取第一列为数值）。\n\n默认的规则不能满足要求时，就可以自己来配置 `encode`，也并不复杂。这是一个 [例子](${exampleEditorPath}dataset-default&edit=1&reset=1)。\n\n## 几个常见的 series.encode 设置方式举例\n\n问：如何把第三列设置为 X 轴，第五列设置为 Y 轴？\n\n答：\n\n```js\noption = {\n  series: {\n    // 注意维度序号（dimensionIndex）从 0 开始计数，第三列是 dimensions[2]。\n    encode: { x: 2, y: 4 }\n    // ...\n  }\n};\n```\n\n问：如何把第三行设置为 X 轴，第五行设置为 Y 轴？\n\n答：\n\n```js\noption = {\n  series: {\n    encode: { x: 2, y: 4 },\n    seriesLayoutBy: 'row'\n    // ...\n  }\n};\n```\n\n问：如何把第二列设置为标签？\n\n答：\n关于标签的显示 [label.formatter](${optionPath}#series.label.formatter)，现在支持引用特定维度的值，例如：\n\n```js\nseries: {\n  label: {\n    // `'{@score}'` 表示 “名为 score” 的维度里的值。\n    // `'{@[4]}'` 表示引用序号为 4 的维度里的值。\n    formatter: 'aaa{@product}bbb{@score}ccc{@[4]}ddd';\n  }\n}\n```\n\n问：如何让第 2 列和第 3 列显示在提示框（tooltip）中？\n\n答：\n\n```js\noption = {\n  series: {\n    encode: {\n      tooltip: [1, 2]\n      // ...\n    }\n    // ...\n  }\n};\n```\n\n问：数据里没有维度名，那么怎么给出维度名？\n\n答：\n\n```js\nvar option = {\n  dataset: {\n    dimensions: ['score', 'amount'],\n    source: [\n      [89.3, 3371],\n      [92.1, 8123],\n      [94.4, 1954],\n      [85.4, 829]\n    ]\n  }\n};\n```\n\n问：如何把第三列映射为气泡图的点的大小？\n\n答：\n\n```js live\nvar option = {\n  dataset: {\n    source: [\n      [12, 323, 11.2],\n      [23, 167, 8.3],\n      [81, 284, 12],\n      [91, 413, 4.1],\n      [13, 287, 13.5]\n    ]\n  },\n  visualMap: {\n    show: false,\n    dimension: 2, // 指向第三列（列序号从 0 开始记，所以设置为 2）。\n    min: 2, // 需要给出数值范围，最小数值。\n    max: 15, // 需要给出数值范围，最大数值。\n    inRange: {\n      // 气泡尺寸：5 像素到 60 像素。\n      symbolSize: [5, 60]\n    }\n  },\n  xAxis: {},\n  yAxis: {},\n  series: {\n    type: 'scatter'\n  }\n};\n```\n\n问：encode 里指定了映射，但是不管用？\n\n答：可以查查有没有拼错，比如，维度名是：`'Life Expectancy'`，encode 中拼成了 `'Life Expectency'`。\n\n## 视觉通道（颜色、尺寸等）的映射\n\n我们可以使用 [visualMap](${optionPath}#visualMap) 组件进行视觉通道的映射。详见 [visualMap](${optionPath}#visualMap) 文档的介绍。这是一个 [示例](${exampleEditorPath}dataset-encode0&edit=1&reset=1)。\n\n## 数据的各种格式\n\n多数常见图表中，数据适于用二维表的形式描述。广为使用的数据表格软件（如 MS Excel、Numbers）或者关系数据数据库都是二维表。他们的数据可以导出成 JSON 格式，输入到 `dataset.source` 中，在不少情况下可以免去一些数据处理的步骤。\n\n> 假如数据导出成 csv 文件，那么可以使用一些 csv 工具如 [dsv](https://github.com/d3/d3-dsv) 或者 [PapaParse](https://github.com/mholt/PapaParse) 将 csv 转成 JSON。\n\n在 JavaScript 常用的数据传输格式中，二维数组可以比较直观的存储二维表。前面的示例都是使用二维数组表示。\n\n除了二维数组以外，dataset 也支持例如下面 key-value 方式的数据格式，这类格式也非常常见。但是这类格式中，目前并不支持 [seriesLayoutBy](${optionPath}#series.seriesLayoutBy) 参数。\n\n```js\ndataset: [\n  {\n    // 按行的 key-value 形式（对象数组），这是个比较常见的格式。\n    source: [\n      { product: 'Matcha Latte', count: 823, score: 95.8 },\n      { product: 'Milk Tea', count: 235, score: 81.4 },\n      { product: 'Cheese Cocoa', count: 1042, score: 91.2 },\n      { product: 'Walnut Brownie', count: 988, score: 76.9 }\n    ]\n  },\n  {\n    // 按列的 key-value 形式。\n    source: {\n      product: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],\n      count: [823, 235, 1042, 988],\n      score: [95.8, 81.4, 91.2, 76.9]\n    }\n  }\n];\n```\n\n## 多个 dataset 以及如何引用他们\n\n可以同时定义多个 dataset。系列可以通过 [series.datasetIndex](${optionPath}#series.datasetIndex) 来指定引用哪个 dataset。例如：\n\n```js\nvar option = {\n  dataset: [\n    {\n      // 序号为 0 的 dataset。\n      source: []\n    },\n    {\n      // 序号为 1 的 dataset。\n      source: []\n    },\n    {\n      // 序号为 2 的 dataset。\n      source: []\n    }\n  ],\n  series: [\n    {\n      // 使用序号为 2 的 dataset。\n      datasetIndex: 2\n    },\n    {\n      // 使用序号为 1 的 dataset。\n      datasetIndex: 1\n    }\n  ]\n};\n```\n\n## ECharts 3 的数据设置方式（series.data）仍正常使用\n\nECharts 4 之前一直以来的数据声明方式仍然被正常支持，如果系列已经声明了 [series.data](${optionPath}#series.data)， 那么就会使用 [series.data](${optionPath}#series.data) 而非 `dataset`。\n\n```js live\noption = {\n  xAxis: {\n    type: 'category',\n    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']\n  },\n  yAxis: {},\n  series: [\n    {\n      type: 'bar',\n      name: '2015',\n      data: [89.3, 92.1, 94.4, 85.4]\n    },\n    {\n      type: 'bar',\n      name: '2016',\n      data: [95.8, 89.4, 91.2, 76.9]\n    },\n    {\n      type: 'bar',\n      name: '2017',\n      data: [97.7, 83.1, 92.5, 78.1]\n    }\n  ]\n};\n```\n\n其实，[series.data](${optionPath}#series.data) 也是种会一直存在的重要设置方式。一些特殊的非 table 格式的图表，如 [treemap](${optionPath}#series-treemap)、[graph](${optionPath}#series-graph)、[lines](${optionPath}#series-lines) 等，现在仍不支持在 dataset 中设置，仍然需要使用 [series.data](${optionPath}#series.data)。另外，对于巨大数据量的渲染（如百万以上的数据量），需要使用 [appendData](api.html#echartsInstance.appendData) 进行增量加载，这种情况不支持使用 `dataset`。\n\n## 其他\n\n目前并非所有图表都支持 dataset。支持 dataset 的图表有：\n`line`、`bar`、`pie`、`scatter`、`effectScatter`、`parallel`、`candlestick`、`map`、`funnel`、`custom`。\n后续会有更多的图表进行支持。\n\n最后，给出这个 [示例](${exampleEditorPath}dataset-link&edit=1&reset=1)，多个图表共享一个 `dataset`，并带有联动交互。\n"}}]);