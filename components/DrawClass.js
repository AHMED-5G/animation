import { StyleSheet, Text, View, PanResponder, Animated } from "react-native";
import React, { Component } from "react";
import Pen from "../node_modules/expo-draw/src/tools/pen";
import Point from "../node_modules/expo-draw/src/tools/point";
import Svg, { G, Path } from "react-native-svg";
export default class DrawClass extends Component {
  constructor(props) {
    super();
    this.state = {
      tracker: 0,
      currentPoints: [],
      previousStrokes: [],
      pen: new Pen(),
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gs) => true,
      onMoveShouldSetPanResponder: (evt, gs) => true,
      onPanResponderGrant: (evt, gs) => this.onResponderGrant(evt, gs),
      onPanResponderMove: (evt, gs) => this.onResponderMove(evt, gs),
      onPanResponderRelease: (evt, gs) => this.onResponderRelease(evt, gs),
    });
    const rewind = props.rewind || function () {};
    const clear = props.clear || function () {};

    this._clientEvents = {
      rewind: rewind(this.rewind),
      clear: clear(this.clear),
    };
  }

  componentDidMount() {
    if (this.props.strokes) this.setState({ strokes: this.props.strokes });
  }

  componentDidUpdate() {
    if (
      this.props.enabled == false &&
      this.props.strokes !== undefined &&
      this.props.strokes.length !== this.state.previousStrokes.length
    )
      this.setState({
        previousStrokes: this.props.strokes || this.state.previousStrokes,
      });
  }

  rewind = () => {
    console.log("undo");
    if (
      this.state.currentPoints.length > 0 ||
      this.state.previousStrokes.length < 1
    )
      return;
    let strokes = this.state.previousStrokes;
    strokes.pop();

    this.state.pen.rewindStroke();

    this.setState({
      previousStrokes: [...strokes],
      currentPoints: [],
      tracker: this.state.tracker - 1,
    });

    this._onChangeStrokes([...strokes]);
  };

  clear = () => {
    console.log("clear");
    this.setState({
      previousStrokes: [],
      currentPoints: [],
      tracker: 0,
    });
    this.state.pen.clear();
    this._onChangeStrokes([]);
  };

  onTouch(evt) {
    if (this.props.enabled == false) return;
    let x, y, timestamp;
    [x, y, timestamp] = [
      evt.nativeEvent.locationX,
      evt.nativeEvent.locationY,
      evt.nativeEvent.timestamp,
    ];

    let newCurrentPoints = this.state.currentPoints;
    newCurrentPoints.push({ x, y, timestamp });

    this.setState({
      previousStrokes: this.state.previousStrokes,
      currentPoints: newCurrentPoints,
      tracker: this.state.tracker,
    });
  }

  onResponderGrant(evt) {
    this.onTouch(evt);
    this.onStart(evt);
  }

  onResponderMove(evt) {
    this.onTouch(evt);
    this.onActive(evt);
  }

  onResponderRelease(evt) {
    let strokes = this.state.previousStrokes;
    if (this.state.currentPoints.length < 1) return;

    var points = this.state.currentPoints;

    this.state.pen.addStroke(this.state.currentPoints);

    this.setState({
      previousStrokes: [...strokes, points],
      strokes: [],
      currentPoints: [],
      tracker: this.state.tracker + 1,
    });
    this._onChangeStrokes([...strokes, points]);
    this.onEnd(evt);
  }

  onStart(evt) {
    if (this.props.onStart) {
      let [x, y] = [evt.nativeEvent.locationX, evt.nativeEvent.locationY];
      this.props.onStart(x, y);
    }
  }

  onActive(evt) {
    if (this.props.onActive) {
      let [x, y] = [evt.nativeEvent.locationX, evt.nativeEvent.locationY];
      this.props.onActive(x, y);
    }
  }

  onEnd(evt) {
    if (this.props.onEnd) {
      let [x, y] = [evt.nativeEvent.locationX, evt.nativeEvent.locationY];
      this.props.onEnd(x, y);
    }
  }

  _onLayoutContainer = (e) => {
    this.state.pen.setOffset(e.nativeEvent.layout);
  };

  _onChangeStrokes = (strokes) => {
    // if (this.props.onChangeStrokes) this.props.onChangeStrokes(strokes);
  };

  render() {
    var props =
      this.props.enabled != false ? this._panResponder.panHandlers : {};

    return (
      <View
        onLayout={this._onLayoutContainer}
        style={[styles.drawContainer, this.props.containerStyle]}
      >
        <View style={styles.svgContainer} {...props}>
          <Svg style={styles.drawSurface}>
            <G>
              {this.state.previousStrokes.map((e) => {
                var points = [];
                for (var i in e) {
                  let newPoint = new Point(e[i].x, e[i].y, e[i].timestamp);
                  points.push(newPoint);
                }
                return (
                  <Path
                    key={e[0].timestamp}
                    d={this.state.pen.pointsToSvg(points)}
                    stroke={this.props.color || "#000000"}
                    strokeWidth={this.props.strokeWidth || 4}
                    fill="none"
                  />
                );
              })}
              <Path
                key={this.state.tracker}
                d={this.state.pen.pointsToSvg(this.state.currentPoints)}
                stroke={this.props.color || "#000000"}
                strokeWidth={this.props.strokeWidth || 4}
                fill="none"
              />
            </G>
          </Svg>
          {this.props.children}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  drawContainer: {
    // flex: 1,
    display: "flex",
    zIndex: 4,
  },
  svgContainer: {
    // flex: 1,
    zIndex: 4,
  },
  drawSurface: {
    flex: 1,
    zIndex: 4,
  },
});
