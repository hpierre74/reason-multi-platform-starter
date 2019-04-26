import React, { Component } from "react";
// import PropTypes from 'prop-types';
import styled from "styled-components";

import { isHbbtv } from "./oipf.utils";

// import Toggler from './toggler.component';

const Toolbar = styled.div`
  display: block;
  height: 20px;
  padding: 0 10px;

  position: fixed;
  top: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  background: #222;
`;

const Marker = styled.div`
  position: absolute;

  opacity: 0.5;
  background: cyan;
`;

const VerticalMarker = styled(Marker)`
  width: 1px;
  height: 100%;

  top: 0;
  left: 50%;
  bottom: 0;
`;

const HorizontalMarker = styled(Marker)`
  width: 100%;
  height: 1px;

  top: 50%;
  right: 0;
  left: 0;
`;

const VerticalCenterMarker = styled(VerticalMarker)``;

const VerticalLeftMarker = styled(VerticalMarker)`
  margin-left: ${p => p.theme.sizes.safetyHorizontalMargin - 640}px;
`;

const VerticalRightMarker = styled(VerticalMarker)`
  margin-left: ${p => 640 - p.theme.sizes.safetyHorizontalMargin + 1}px;
`;

const HorizontalCenterMarker = styled(HorizontalMarker)``;

const HorizontalTopMarker = styled(HorizontalMarker)`
  margin-top: ${p => p.theme.sizes.safetyVerticalMargin - 360 - 1}px;
`;

const HorizontalBottomMarker = styled(HorizontalMarker)`
  margin-top: ${p => 360 - p.theme.sizes.safetyVerticalMargin + 1}px;
`;

const HorizontalHeaderMarker = styled(HorizontalMarker)`
  margin-top: ${p =>
    p.theme.sizes.safetyVerticalMargin +
    p.theme.sizes.headerHeight -
    360 -
    1}px;

  border-top: yellow dashed 1px;
  background: none;
`;

const HorizontalFooterMarker = styled(HorizontalHeaderMarker)`
  margin-top: ${p =>
    360 -
    p.theme.sizes.footerHeight -
    p.theme.sizes.safetyVerticalMargin +
    1}px;
`;

const Inner = styled.div`
  width: 1280px;
  height: 720px;

  position: relative;

  background: url("https://picsum.photos/1280/720/?random") center;
  background-size: cover;
  overflow: hidden;
`;

class HbbtvScaffold extends Component {
  constructor() {
    super();

    this.isHbbtv = isHbbtv();

    this.state = {
      withMarkers: false
    };
  }

  render() {
    const { children } = this.props;
    const { withMarkers } = this.state;

    if (this.isHbbtv) {
      return children;
    }

    return (
      <Wrapper>
        <Inner>{children}</Inner>

        {withMarkers && (
          <div>
            <VerticalLeftMarker />
            <VerticalCenterMarker />
            <VerticalRightMarker />
            <HorizontalTopMarker />
            <HorizontalHeaderMarker />
            <HorizontalCenterMarker />
            <HorizontalFooterMarker />
            <HorizontalBottomMarker />
          </div>
        )}
        <Toolbar>
          {/* <Toggler
            show={withMarkers}
            label="misc.scaffold.markers"
            onClick={() => this.setState({ withMarkers: !withMarkers })}
          />
          */}
        </Toolbar>
      </Wrapper>
    );
  }
}

// HbbtvScaffold.propTypes = {
//   children: PropTypes.node.isRequired,
//   debug: PropTypes.bool.isRequired
// };

export default HbbtvScaffold;
