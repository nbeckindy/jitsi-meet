// @flow

import { openDialog } from '../../../base/dialog';
import { getFeatureFlag, HANGUP_MENU_ENABLED } from '../../../base/flags';
import { translate } from '../../../base/i18n';
import { IconHangup } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { AbstractHangupButton, type AbstractButtonProps } from '../../../base/toolbox/components';

import HangupMenu from './HangupMenu';

/**
 * The type of the React {@code Component} props of {@link HangupMenuButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether the hangup menu should be displayed.
     */
    _hangupMenuEnabled: Boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An implementation of a button for showing the {@code HangupMenu}.
 */
class HangupMenuButton extends AbstractHangupButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.hangup';
    icon = IconHangup;
    label = 'toolbar.hangup';

    /**
     * Handles clicking / pressing this {@code HangupMenuButton}.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(openDialog(HangupMenu));
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code HangupMenuButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state): Object {
    const _hangupMenuEnabled = getFeatureFlag(state, HANGUP_MENU_ENABLED, true);

    return {
        _hangupMenuEnabled
    };
}

export default translate(connect(_mapStateToProps)(HangupMenuButton));
