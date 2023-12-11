"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// myCalendar.tsx
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const MyAbout = () => {
    return (<react_native_1.View style={styles.container}>
        <react_native_1.View style={styles.card}>
          
        {/* App Logo */}
        {/* App Information */}
        <react_native_1.Text>Food supplement controller</react_native_1.Text>
        <react_native_1.Text>This application helps you to, make plan for suppliments</react_native_1.Text>
        {/* Features */}
        <react_native_1.Text>Food suppliment information</react_native_1.Text>
        <react_native_1.Text>Plan is written into calendar</react_native_1.Text>
        <react_native_1.Text>Confirm taken supplement</react_native_1.Text>
        {/* Developer Information */}
        <react_native_1.Text>Developed by Raimo P</react_native_1.Text>
    
        </react_native_1.View>
        </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        top: 100,
        marginright: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        valignItems: 'bottom',
        justifyContent: 'center',
        width: 420,
        height: 200,
        // height: 0.2 * screenHeight, // Set the height to 80% of the screen height
    },
    dataCell: {
        fontSize: 8,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: 'pink',
        padding: 16,
        bottom: 220,
        width: 300,
        right: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
exports.default = MyAbout;
