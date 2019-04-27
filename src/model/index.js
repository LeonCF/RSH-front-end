import mirror from 'mirrorx';
import * as network from './network';

function getInitialState () {
    let initialState = {
        isLogin: false,
        items:['Black&White', 'Web Status', 'About ME', 'Secret']
    };
    return initialState;
};
let reducer = {
    changeIsLogin: function (state) {
        let newState = Object.assign({}, state);
        newState.isLogin = !newState.isLogin;
        return newState;
    }
};

let effects = {

};

mirror.model({
    name: 'app',
    initialState: getInitialState(),
    reducers: reducer,
    effects
});

mirror.model({
    name: 'network',
    initialState: network.initialState(),
    reducers: network.reducers,
    effects: network.effects
});