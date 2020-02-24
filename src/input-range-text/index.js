import React, { Component } from "react";
import classnames from "classnames";

require("./index.css");

class InputRangeText extends Component {

  constructor(props) {
    super(props);
    this.startPoint = null;
    this.diffToInitRange = 1;
    this.state = {
      isRanging: false,
      isActive: false,
      isInputting: false,
      isValid: true,
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.refs.eventBox.addEventListener("mousedown", this.handleMouseDown);
    this.refs.eventBox.addEventListener("mouseup", this.handleMouseUp);
    this.refs.eventBox.addEventListener("mousemove", this.handleMouseMove);
    this.refs.eventBox.addEventListener("mouseout", this.handleBlur);
    this.refs.input.addEventListener("blur", this.handleBlur);
    this.updateRangePercent(this.props.value);
  }

  componentWillUnmount() {
    this.refs.eventBox.removeEventListener(
      "mousedown",
      this.handleMouseDown
    );
    this.refs.eventBox.removeEventListener("mouseup", this.handleMouseUp);
    this.refs.eventBox.removeEventListener("mousemove", this.handleMouseMove);
    this.refs.eventBox.removeEventListener("mouseout", this.handleBlur);
    this.refs.input.removeEventListener("blur", this.handleBlur);
  }

  softChangeValue = value => {
    const { step, min, max } = this.props;
    const confusePart = value % step;
    let nextValue =
      confusePart < step / 2 ? value - confusePart : value - confusePart + step;
    if (nextValue > max) {
      nextValue = max;
    } else if (nextValue < min) {
      nextValue = this.props.min;
    }
    this.setState({
      isValid: this.validation(nextValue)
    });
    this.props.onChange(nextValue);
    this.updateRangePercent(nextValue);
  };

  hardChangeValue = nextValue => {
    this.props.onChange(nextValue);
    this.setState({
      isValid: this.validation(nextValue)
    });
    this.updateRangePercent(nextValue);
  };

  validation = value => {
    const { min, max } = this.props;
    if (min <= value && value <= max
      && this.props.validation(value)) {
      return true;
    }
    return false;
  };

  handleMouseMove(e ) {
    e.preventDefault();
    const { isActive, isRanging, isInputting } = this.state;
    if (isActive && this.startPoint === null) {
      this.startPoint = e.layerX;
    }
    if (isActive && !isInputting) {
      const diffState = Math.abs(this.startPoint - e.layerX);
      if (diffState > this.diffToInitRange) {
        this.setState({
          isRanging: true
        });
      }
    }
    if (isRanging) {
      this.handleChangeRangePercent(e.layerX);
    }
  };

  handleChangeRangePercent = point => {
    const allWidth = this.refs.eventBox.offsetWidth;
    const inputPercent = (point * 100) / allWidth;
    this.refs.rangeOfFilled.style.width = `${inputPercent}%`;

    const { max } = this.props;
    const exactValue = (max / 100) * inputPercent;
    this.softChangeValue(exactValue);
  };

  updateRangePercent = value => {
    const { max } = this.props;
    const inputPercent = (value * 100) / max;
    const nextPercent = inputPercent > 100 ? 100 : inputPercent;
    this.refs.rangeOfFilled.style.width = `${nextPercent}%`;
  };

  handleMouseDown(e) {
    this.setState({
      isActive: true
    });
  }

  handleBlur() {
    this.setState({
      isActive: false,
      isRanging: false,
      isInputting: false
    });
  }

  handleMouseUp(e) {
    e.preventDefault();
    const { isRanging } = this.state;
    if (isRanging) {
      this.setState({
        isActive: false,
        isRanging: false
      });
      this.startPoint = null;
    } else {
      this.setState({
        isInputting: true
      });
      this.refs.input.focus();
    }
  }

  handleSubmitButtons(increment) {
    return event => {
      event.preventDefault();
      this.softChangeValue(this.props.value + increment);
    };
  }

  handleChangeInput(e) {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    this.hardChangeValue(value);
  }

  classnames(values, obj) {
    const {disabled} = this.props;
    const {isValid} = this.state;
    return classnames(values, {
      irn__invalid: !isValid,
      irn__disabled: disabled,
      ...obj,
    })
  }

  render() {
    const { step, min, max, value, disabled } = this.props;
    const { isRanging } = this.state;
    const decrementIsDisabled = disabled || value === min;
    const incrementIsDisabled = disabled || value === max;

    return (
			<div
				className={this.classnames("irn__box")}
			>
				<button
					className={this.classnames("irn__button irn_button-decrement", {
            "irn__disabled": decrementIsDisabled,
          })}
          onClick={this.handleSubmitButtons(-1 * step)}
          disabled={disabled}
				>
					-
				</button>
				<div
					className={this.classnames("irn__input-box", {
						"irn__input-box__ranging": isRanging
					})}
				>
					<div className={this.classnames("irn__range")} ref="rangeOfFilled" />
          <input
						className={this.classnames("irn__input")}
						ref="input"
						value={this.props.value}
            onChange={this.handleChangeInput}
            type="text"
            disabled={disabled}
					/>
          <div className={this.classnames("irn__event-box")}
            ref="eventBox" />
				</div>
				<button
					className={this.classnames("irn__button irn_button-increment", {
            "irn__disabled": incrementIsDisabled,
          })}
          onClick={this.handleSubmitButtons(+1 * step)}
          disabled={disabled}
				>
					+
				</button>
			</div>
    );
  }
}
export default InputRangeText;
