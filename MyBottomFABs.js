"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_paper_1 = require("react-native-paper");
const MyBottomFABs = ({ onFabPress }) => {
    const handleFabPress1 = () => {
        alert("hei 1");
        // Assign value 1 and pass it back to App
        const myStatus = 1;
        console.log(`FAB 1 pressed with status: ${myStatus}`);
        onFabPress(myStatus);
    };
    const handleFabPress2 = () => {
        // Assign value 2 and pass it back to App
        alert("hei 2");
        const myStatus = 2;
        console.log(`FAB 2 pressed with status: ${myStatus}`);
        onFabPress(myStatus);
    };
    const handleFabPress3 = () => {
        // Assign value 3 and pass it back to App
        alert("hei 3");
        const myStatus = 3;
        console.log(`FAB 3 pressed with status: ${myStatus}`);
        onFabPress(myStatus);
    };
    const handleFabPress4 = () => {
        // Assign value 4 and pass it back to App
        const myStatus = 4;
        alert("hei 4");
        console.log(`FAB 4 pressed with status: ${myStatus}`);
        onFabPress(myStatus);
    };
    const handleFabPress5 = () => {
        // Assign value 4 and pass it back to App
        const myStatus = 5;
        alert("hei 5");
        console.log(`FAB 5 pressed with status: ${myStatus}`);
        onFabPress(myStatus);
    };
    const handleFabPress6 = () => {
        // Assign value 4 and pass it back to App
        const myStatus = 6;
        alert("hei 6");
        console.log(`FAB 6 pressed with status: ${myStatus}`);
        onFabPress(myStatus);
    };
    return (<react_native_paper_1.Provider>
      <react_native_1.View style={styles.container}>
        <react_native_paper_1.FAB style={styles.fab1} label="List supplements" onPress={() => handleFabPress1()} //assign 1
    />

        <react_native_paper_1.FAB style={styles.fab2} label="Add Supplement" onPress={() => handleFabPress2()}/>

        <react_native_paper_1.FAB style={styles.fab3} label="Generate Data to Cal" onPress={() => handleFabPress3()}/>

        <react_native_paper_1.FAB style={styles.fab4} label="List your calendar" onPress={() => handleFabPress4()}/>


        <react_native_paper_1.FAB style={styles.fab5} label="Add to Call" onPress={() => handleFabPress5()}/>

        <react_native_paper_1.FAB style={styles.fab6} label="About" onPress={() => handleFabPress6()}/>
      </react_native_1.View>
    </react_native_paper_1.Provider>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        width: '90%',
        backgroundColor: 'yellow', // Adjust as needed
    },
    fab1: {
        backgroundColor: 'lightblue', // Adjust as needed
        position: 'absolute',
        margin: 16,
        left: 0,
        width: 150,
        height: 49,
        top: 80,
    },
    fab2: {
        backgroundColor: 'lightblue', // Adjust as needed
        position: 'absolute',
        margin: 16,
        right: 0,
        width: 150,
        top: 80,
        height: 49,
    },
    fab3: {
        backgroundColor: 'lightblue', // Adjust as needed
        position: 'absolute',
        margin: 16,
        left: 0,
        width: 150,
        top: 140,
        height: 49,
    },
    fab4: {
        backgroundColor: 'lightblue', // Adjust as needed
        position: 'absolute',
        margin: 16,
        right: 0,
        width: 150,
        top: 140,
        height: 49,
    },
    fab5: {
        backgroundColor: 'lightblue', // Adjust as needed
        position: 'absolute',
        margin: 16,
        left: 0,
        width: 150,
        top: 200,
        height: 49,
    },
    fab6: {
        backgroundColor: 'lightblue', // Adjust as needed
        position: 'absolute',
        margin: 16,
        right: 0,
        width: 150,
        top: 200,
        height: 49,
    },
});
exports.default = MyBottomFABs;
