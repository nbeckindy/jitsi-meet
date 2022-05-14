// @flow

import { createToolbarEvent, sendAnalytics } from '../../../analytics';
import { appNavigate } from '../../../app/actions';
import { disconnect } from '../../../base/connection';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';

/**
 * The type of the React {@code Component} props of {@link LeaveConferenceButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An implementation of an {@link AbstractButton} for leaving the meeting.
 */
class LeaveConferenceButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.leaveConference';
    label = 'toolbar.leaveConference';
    tooltip = 'toolbar.leaveConference';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        const { handleClick } = this.props;

        if (handleClick) {
            handleClick();

            return;
        }

        sendAnalytics(createToolbarEvent('hangup'));

        // FIXME: these should be unified.
        if (navigator.product === 'ReactNative') {
            this.props.dispatch(appNavigate(undefined));
        } else {
            this.props.dispatch(disconnect(true));
        }
    }
}

/**
 * Maps part of the redux state to the component's props.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component instance.
 * @returns {Props}
 */
function _mapStateToProps(state, ownProps) {
    const { visible = true } = ownProps;

    return {
        hideIcon: true,
        showLabel: true,
        visible
    };
}

export default translate(connect(_mapStateToProps)(LeaveConferenceButton));
