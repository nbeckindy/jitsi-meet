// @flow

import { translate } from '../../../base/i18n';
import { IconHangup } from '../../../base/icons';
import { AbstractHangupButton, type AbstractButtonProps } from '../../../base/toolbox/components';


/**
 * The type of the React {@code Component} props of {@link HangupToggleButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether the more options menu is open.
     */
    isOpen: boolean,

    /**
     * External handler for key down action.
     */
    onKeyDown: Function,
};

/**
 * Implementation of a button for toggling the hangup menu.
 */
class HangupToggleButton extends AbstractHangupButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.hangup';
    icon = IconHangup;
    label = 'toolbar.hangup';
    toggledLabel = 'toolbar.hangup';

    /**
     * Retrieves tooltip dynamically.
     */
    get tooltip() {
        return 'toolbar.hangup';
    }

    /**
     * Required by linter due to AbstractButton overwritten prop being writable.
     *
     * @param {string} _value - The value.
     */
    set tooltip(_value) {
        // Unused.
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props.isOpen;
    }

    /**
     * Indicates whether a key was pressed.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _onKeyDown() {
        this.props.onKeyDown();
    }
}


export default translate(HangupToggleButton);
