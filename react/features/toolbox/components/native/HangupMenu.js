// @flow

import React, { PureComponent } from 'react';

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { BottomSheet, hideDialog, isDialogOpen } from '../../../base/dialog';
import { getLocalParticipant, PARTICIPANT_ROLE } from '../../../base/participants';
import { connect } from '../../../base/redux';
import { StyleType } from '../../../base/styles';

import EndConferenceButton from './EndConferenceButton';
import LeaveConferenceButton from './LeaveConferenceButton';


/**
 * The type of the React {@code Component} props of {@link HangupMenu}.
 */
type Props = {

    /**
     * The color-schemed stylesheet of the dialog feature.
     */
    _bottomSheetStyles: StyleType,

    /**
     * True if the hangup menu is currently visible, false otherwise.
     */
    _isOpen: boolean,

    /**
     *  Whether the local participant is a moderator or not.
     */
    _isModerator: boolean,

    /**
     * Used for hiding the dialog when the selection was completed.
     */
    dispatch: Function
};

/**
 * The exported React {@code Component}. We need it to execute
 * {@link hideDialog}.
 *
 * XXX It does not break our coding style rule to not utilize globals for state,
 * because it is merely another name for {@code export}'s {@code default}.
 */
let HangupMenu_; // eslint-disable-line prefer-const

/**
 * Implements a React {@code Component} with some extra actions in addition to
 * those in the toolbar.
 */
class HangupMenu extends PureComponent<Props, *> {
    /**
     * Initializes a new {@code HangupMenu} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onCancel = this._onCancel.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _bottomSheetStyles, _isModerator } = this.props;

        const buttonProps = {
            afterClick: this._onCancel,
            showLabel: true,
            styles: _bottomSheetStyles.buttons
        };

        return (
            <BottomSheet
                onCancel = { this._onCancel }>
                { _isModerator && <EndConferenceButton { ...buttonProps } /> }
                <LeaveConferenceButton { ...buttonProps } />
            </BottomSheet>
        );
    }

    _onCancel: () => boolean;

    /**
     * Hides this {@code HangupMenu}.
     *
     * @private
     * @returns {boolean}
     */
    _onCancel() {
        if (this.props._isOpen) {
            this.props.dispatch(hideDialog(HangupMenu_));

            return true;
        }

        return false;
    }

}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    const isModerator = getLocalParticipant(state).role === PARTICIPANT_ROLE.MODERATOR;

    return {
        _bottomSheetStyles: ColorSchemeRegistry.get(state, 'BottomSheet'),
        _isModerator: isModerator,
        _isOpen: isDialogOpen(state, HangupMenu_)
    };
}

HangupMenu_ = connect(_mapStateToProps)(HangupMenu);

export default HangupMenu_;
