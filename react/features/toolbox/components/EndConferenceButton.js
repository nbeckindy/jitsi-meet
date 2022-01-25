// @flow

import { endConference } from '../../base/conference';
import { translate } from '../../base/i18n';
import { IconHangup } from '../../base/icons';
import { connect } from '../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox/components';

/**
 * The type of the React {@code Component} props of {@link EndConferenceButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An implementation of a button for ending the meeting.
 */
class EndConferenceButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.endConference';
    icon = IconHangup;
    label = 'toolbar.endConference';
    tooltip = 'toolbar.endConference';

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

        this.props.dispatch(endConference());
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
        visible
    };
}

export default translate(connect(_mapStateToProps)(EndConferenceButton));
