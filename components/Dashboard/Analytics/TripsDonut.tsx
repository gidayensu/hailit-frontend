import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.

const options: Highcharts.Options = {
    title: {
        text: 'My chart'
    },
    series: [{
        type: 'pie',
        data: [{
          name: 'Water',
          y: 55.02
      },
      {
          name: 'Fat',
          sliced: true,
          selected: true,
          y: 26.71
      },
      {
          name: 'Carbohydrates',
          y: 1.09
      },
      {
          name: 'Protein',
          y: 15.5
      },
      {
          name: 'Ash',
          y: 1.68
      }
]
    }], 
    plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              
          }, {
              enabled: true,
              
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              },
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              }
          }]
      }
  }
};

export default function TripsDonut (props: HighchartsReact.Props) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};
// Render your App component into the #root element of the document.
