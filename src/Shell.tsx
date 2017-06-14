import * as React from 'react';
import { ChatActions, ChatState, FormatState } from './Store';
import { User } from 'botframework-directlinejs';
import { sendMessage, sendFiles } from './Chat';
import { Dispatch, connect } from 'react-redux';
import { Strings } from './Strings';

interface Props {
    inputText: string,
    strings: Strings,

    onChangeText: (inputText: string) => void

    sendMessage: (inputText: string) => void,
    sendFiles: (files: FileList) => void,
    leaveIntroMode: () => void
}

class ShellContainer extends React.Component<Props, {}> {
    private textInput: HTMLInputElement;
    private fileInput: HTMLInputElement;

    constructor(props: Props) {
        super(props);
    }

    private sendMessage() {
        this.props.leaveIntroMode();
        if (this.props.inputText.trim().length > 0)
            this.props.sendMessage(this.props.inputText);
    }

    private onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter')
            this.sendMessage();
    }

    private onClickSend() {
        this.textInput.focus();
        this.sendMessage();
    }

    private onChangeFile() {
        this.textInput.focus();
        this.props.sendFiles(this.fileInput.files);
        this.fileInput.value = null;
    }

    render() {
        let className = 'wc-console';
        if (this.props.inputText.length > 0) className += ' has-text';

        return (
            <div className={className}>
                {/*<input id="wc-upload-input" type="file" ref={ input => this.fileInput = input } multiple onChange={ () => this.onChangeFile() } />
                <label className="wc-upload" htmlFor="wc-upload-input">
                    <svg>
                        <path d="M19.96 4.79m-2 0a2 2 0 0 1 4 0 2 2 0 0 1-4 0zM8.32 4.19L2.5 15.53 22.45 15.53 17.46 8.56 14.42 11.18 8.32 4.19ZM1.04 1L1.04 17 24.96 17 24.96 1 1.04 1ZM1.03 0L24.96 0C25.54 0 26 0.45 26 0.99L26 17.01C26 17.55 25.53 18 24.96 18L1.03 18C0.46 18 0 17.55 0 17.01L0 0.99C0 0.45 0.47 0 1.03 0Z" />
                    </svg>
                </label>*/}
                <div className="wc-textbox">
                    <input
                        type="text"
                        className="wc-shellinput"
                        ref={ input => this.textInput = input }
                        value={ this.props.inputText }
                        onChange={ _ => this.props.onChangeText(this.textInput.value) }
                        onKeyPress={ e => this.onKeyPress(e) }
                        placeholder={ this.props.strings.consolePlaceholder }
                    />
                </div>
                <a className="wc-send-btn" onClick={ () => this.onClickSend() }>
                    <svg>
                      <path d="M19.6875235,4.97989042 C19.5759162,4.90176533 19.4308267,4.85712242 19.2857373,4.85712242 C19.1629693,4.85712242 19.0402013,4.8906046 18.928594,4.95756897 L0.357143283,15.6718675 C0.122768003,15.8057962 -0.0111607276,16.0624929 5.55111512e-17,16.3303504 C0.0223214552,16.6093686 0.189732369,16.8437439 0.446429104,16.9441904 L4.8549165,18.7522283 L16.7857343,8.42855525 L7.14286566,20.2477658 L7.14286566,24.1428597 C7.14286566,24.4441993 7.33259803,24.7120568 7.61161622,24.8125034 C7.68974131,24.8459855 7.77902713,24.8571463 7.85715222,24.8571463 C8.06920605,24.8571463 8.27009914,24.7678604 8.40402788,24.6004495 L11.104924,21.3080349 L16.1607336,23.3727695 C16.2500194,23.4062517 16.3393052,23.4285731 16.428591,23.4285731 C16.551359,23.4285731 16.674127,23.3950909 16.7745736,23.3392873 C16.9643059,23.22768 17.0982347,23.0491084 17.1317169,22.8370546 L19.9888631,5.69417699 C20.033506,5.4151588 19.9218987,5.14730134 19.6875235,4.97989042 Z" id=""></path>
                    </svg>Send</a>
                {/*<label className="wc-send" onClick={ () => this.onClickSend() } >
                    <svg>
                        <path d="M26.79 9.38A0.31 0.31 0 0 0 26.79 8.79L0.41 0.02C0.36 0 0.34 0 0.32 0 0.14 0 0 0.13 0 0.29 0 0.33 0.01 0.37 0.03 0.41L3.44 9.08 0.03 17.76A0.29 0.29 0 0 0 0.01 17.8 0.28 0.28 0 0 0 0.01 17.86C0.01 18.02 0.14 18.16 0.3 18.16A0.3 0.3 0 0 0 0.41 18.14L26.79 9.38ZM0.81 0.79L24.84 8.79 3.98 8.79 0.81 0.79ZM3.98 9.37L24.84 9.37 0.81 17.37 3.98 9.37Z" />
                    </svg>
                </label>*/}
            </div>
        );
    }
}

export const Shell = connect(
    (state: ChatState) => ({
        // passed down to ShellContainer
        inputText: state.shell.input,
        strings: state.format.strings,
        // only used to create helper functions below 
        locale: state.format.locale,
        user: state.connection.user,
    }), {
        // passed down to ShellContainer
        onChangeText: (input: string) => ({ type: 'Update_Input', input } as ChatActions),
        // only used to create helper functions below 
        sendMessage,
        sendFiles
    }, (stateProps: any, dispatchProps: any, ownProps: any): Props => { 
        return {
        // from stateProps
        inputText: stateProps.inputText,
        strings: stateProps.strings,
        // from dispatchProps
        onChangeText: dispatchProps.onChangeText,
        // helper functions
        sendMessage: (text: string) => dispatchProps.sendMessage(text, stateProps.user, stateProps.locale),
        sendFiles: (files: FileList) => dispatchProps.sendFiles(files, stateProps.user, stateProps.locale),
        leaveIntroMode: ownProps.leaveIntroMode
 }}
)(ShellContainer);
