import React, { Component } from 'react';
import * as d3 from 'd3'

class Arc extends Component {
    constructor(props) {
      super(props);
      this.arc = d3.arc();
      this.arcRef = React.createRef();
    }
    componentDidMount() {
      d3
        .select(this.arcRef.current)
        .datum(this.props.data)
        .attr('d', null)
        .transition()
        .delay(() => {
          return this.props.i * 500;
        })
        .duration(500)
        .attrTween("d", d => {
          var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
          return t => {
            d.endAngle = i(t);
            return this.arc(d);
          };
        });
    }
  
    componentWillMount() {
      this.updateD3(this.props);
    }
  
    componentWillReceiveProps(newProps) {
      this.updateD3(newProps);
    }
  
    updateD3(newProps) {
      this.arc.innerRadius(newProps.innerRadius);
      this.arc.outerRadius(newProps.outerRadius);
    }
    render() {
      const arc = this.arc(this.props.data);
      return <path ref={this.arcRef} d={arc} style={{ fill: this.props.color }} />;
    }
}
  
class LabeledArc extends Arc {

    constructor(props) {
        super(props);
        this.textRef = React.createRef();
    }

    componentDidMount() {
      super.componentDidMount();
      d3
        .select(this.textRef.current)
        .transition()
        .delay(() => {
          return this.props.i * 500 + 500;
        })
        .duration(300)
        .attrTween("fill-opacity", d => {
          return t => {
            return t*.75;
          };
        });
    }
    render() {
      let [labelX, labelY] = this.arc.centroid(this.props.data),
        labelTranslate = `translate(${labelX}, ${labelY})`;
      return (
        <g>
          {super.render()}
          <text
            ref={this.textRef}
            transform={labelTranslate}
            textAnchor="middle"
            fill="#000"
            fillOpacity="0"
            fontSize={12}
          >
            3%
          </text>
        </g>
      );
    }
}
  
class Piechart extends React.Component {
    constructor() {
      super();
      this.pie = d3
        .pie()
        .sort(null)
        .value(d => d.value);
      this.colors = [
        '#e8c189', '#227f9e', '#8c7ad1',
      ];
    }
  
    arcGenerator(d, i) {
      return (
        <LabeledArc
          key={i}
          i={i}
          data={d}
          innerRadius={this.props.innerRadius}
          outerRadius={this.props.outerRadius}
          color={this.colors[i]}
        />
      );
    }
  
    render() {
      let pie = this.pie(this.props.data),
        translate = `translate(${this.props.x}, ${this.props.y})`;
      const width = this.props.x * 2;
      const height = this.props.y * 2;
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <g transform={translate}>
            {pie.map((d, i) => this.arcGenerator(d, i))}
          </g>
        </svg>
      );
    }
}

class CircleChart extends Component {
    constructor() {
      super();
      this.state = {
        data: [{ value: 33.3 }, { value: 33.3 }, { value: 33.3 }],
        outerRadius: 100,
        innerRadius: 50
      };
    }
    handleOuterRadius(event) {
      this.setState({ outerRadius: parseInt(event.target.value) });
    }
    handleInnerRadius(event) {
      this.setState({ innerRadius: parseInt(event.target.value) });
    }
    render() {
      const { data, innerRadius, outerRadius } = this.state;
      return (
        <div className="gabarit">
          <Piechart
            x={100}
            y={100}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            data={data}
          />
        </div>
      );
    }
}

export default CircleChart;
  

