import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AlertContext from './AlertContext';
import DefaultAlert from './Alert';

export default class AlertProvider extends PureComponent {
  state = {open: false};

  constructor(props) {
    super(props);
    this.contextValue = {
      show: this.show,
    };
  }

  /**
   * Display a alert with this alert.
   * @param {string} message message to display
   * @param {string} variant variant for the message
   * @param {function} [handleAction] click handler for the action button
   * @param {any} [customParameters] custom parameters that will be passed to the alert renderer
   * @public
   */
  show = (props) => {
    this.setState({open: true, ...props});
  };

  handleClose = () => {
    const {onClose} = this.state;
    this.setState({open: false});
    onClose && onClose();
  };

  handleConfirm = () => {
    const {onConfirm} = this.state;
    this.setState({open: false});
    onConfirm && onConfirm();
  };

  render() {
    const {children, AlertComponent = DefaultAlert} = this.props;
    return (
      <>
        <AlertContext.Provider value={this.contextValue}>
          {children}
        </AlertContext.Provider>
        <AlertComponent
          {...this.state}
          handleClose={this.handleClose}
          handleConfirm={this.handleConfirm}
        />
      </>
    );
  }
}

//TODO:UPDATE alert prop-types
AlertProvider.propTypes = {
  /**
   * Props to pass through to the action button.
   */
  ButtonProps: PropTypes.object,
  /**
   * The children that are wrapped by this provider.
   */
  children: PropTypes.node,
  /**
   * Custom alert component.
   * Props: open, message, action, ButtonProps, AlertProps
   */
  AlertComponent: PropTypes.elementType,
  /**
   * Props to pass through to the alert.
   */
  AlertProps: PropTypes.object,
};
