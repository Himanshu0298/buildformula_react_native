import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SnackbarContext from './SnackbarContext';
import DefaultSnackbar from './Snackbar';

export default class SnackbarProvider extends PureComponent {
  state = {
    message: null,
    open: false,
    autoHideDuration: 4000,
  };

  constructor(props) {
    super(props);
    this.contextValue = {
      showMessage: this.showMessage,
    };
  }

  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} variant variant for the message
   * @param {function} [handleAction] click handler for the action button
   * @param {any} [customParameters] custom parameters that will be passed to the snackbar renderer
   * @public
   */
  showMessage = ({
    message = '',
    variant = 'success',
    onClose,
    autoHideDuration = 2500,
  }) => {
    this.setState({open: true, message, variant, onClose, autoHideDuration});
  };

  handleClose = () => {
    const {onClose} = this.state;
    this.setState({open: false});
    onClose && onClose();
  };

  render() {
    const {open, message, variant, autoHideDuration} = this.state;

    const {children, SnackbarComponent = DefaultSnackbar} = this.props;
    return (
      <>
        <SnackbarContext.Provider value={this.contextValue}>
          {children}
        </SnackbarContext.Provider>
        <SnackbarComponent
          open={open}
          message={message}
          variant={variant}
          onClose={this.handleClose}
          stayOpen={Boolean(this.state.onClose)}
          autoHideDuration={autoHideDuration}
        />
      </>
    );
  }
}

SnackbarProvider.propTypes = {
  /**
   * Props to pass through to the action button.
   */
  ButtonProps: PropTypes.object,
  /**
   * The children that are wrapped by this provider.
   */
  children: PropTypes.node,
  /**
   * Custom snackbar component.
   * Props: open, message, action, ButtonProps, SnackbarProps
   */
  SnackbarComponent: PropTypes.elementType,
  /**
   * Props to pass through to the snackbar.
   */
  SnackbarProps: PropTypes.object,
};
