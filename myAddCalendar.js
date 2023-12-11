"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_paper_1 = require("react-native-paper");
const { width: screenWidth, height: screenHeight } = react_native_1.Dimensions.get('window');
const react_native_2 = require("react-native");
const myModal2_1 = __importDefault(require("./myModal2"));
const containerWidth = screenWidth * 1.0;
const containerHeight = screenHeight * 0.90;
const react_1 = require("react");
const SQLite = __importStar(require("expo-sqlite"));
const myAddCalendar = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [isModalVisible, setModalVisible] = (0, react_1.useState)(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [input1, setInput1] = (0, react_1.useState)("");
    const [input2, setInput2] = (0, react_1.useState)("");
    const [input3, setInput3] = (0, react_1.useState)("");
    const [input4, setInput4] = (0, react_1.useState)("");
    const [input5, setInput5] = (0, react_1.useState)("");
    const [input6, setInput6] = (0, react_1.useState)("");
    const [input7, setInput7] = (0, react_1.useState)("");
    const [input8, setInput8] = (0, react_1.useState)("");
    const [input9, setInput9] = (0, react_1.useState)("");
    const [input10, setInput10] = (0, react_1.useState)("");
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const db = SQLite.openDatabase("muistiinpanolista.db");
    const customTheme = Object.assign(Object.assign({}, react_native_paper_1.DefaultTheme), { fonts: Object.assign(Object.assign({}, react_native_paper_1.DefaultTheme.fonts), { regular: { fontFamily: 'FontAwesome', fontWeight: 'normal', fontSize: 12 }, medium: { fontFamily: 'FontAwesome', fontWeight: '500', fontSize: 14 }, light: { fontFamily: 'FontAwesome', fontWeight: '300', fontSize: 10 }, thin: { fontFamily: 'FontAwesome', fontWeight: '100', fontSize: 8 } }) });
    const addCalendarInsertDB = () => {
        console.log("insert");
        //    console.log(input1);
        //     alert(input1);
        const supplement_name = input1;
        const h_number = input2;
        const d_number = input3;
        const w_number = input4;
        const m_number = input5;
        const y_number = input6;
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();
        const dose = input7;
        const taken = "NOT";
        /*
           console.log(supplement_name); //ok
           console.log(h_number);
           console.log(d_number);
           console.log(m_number);
           console.log(createdAt);
           console.log(updatedAt);
           console.log(dose);
           console.log(taken);
           */
        //FAKE VALUE
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO myCalendar (supplement_name, h_number, d_number, w_number, m_number, y_number, createdAt, updatedAt, dose, taken)  VALUES (?, ?,?,?,?,?,?,?,?,?)`, [supplement_name, h_number, d_number, w_number, m_number, y_number, new Date().toISOString(), new Date().toISOString(), dose, taken], (_, { rowsAffected, insertId }) => {
                if (rowsAffected > 0) {
                    console.log(`Row inserted into myCalendar with ID: ${insertId}`);
                    hideDialog();
                    //alert(`Row inserted into myCalendar with ID: ${insertId}`);
                }
                else {
                    console.warn('No rows were inserted into myCalendar.');
                    alert('No rows were inserted into myCalendar.');
                }
            });
        }, (error) => {
            // This callback is invoked if there is an error in starting the transaction
            console.error('Error starting SQL transaction', error);
        });
    };
    const addCalendarToDB = () => {
        //modal
    };
    return (<react_native_paper_1.PaperProvider theme={customTheme}>

            <react_native_1.View>
                {/* Your insertion button */}
                <react_native_2.TouchableOpacity onPress={addCalendarToDB}>
                    <react_native_paper_1.Text>Insert</react_native_paper_1.Text>
                </react_native_2.TouchableOpacity>




                {/* Modal */}
                <myModal2_1.default isVisible={isModalVisible} onClose={toggleModal} data={{
            supplement_name: '',
            h_number: 0,
            d_number: 0,
            w_number: 0,
            y_number: 0,
            m_number: 0,
            CreatedAt: '',
            UpdateddAt: '',
            dose: '',
            taken: ''
        }}/>
            </react_native_1.View>
            <react_native_1.View>
                <react_native_paper_1.Button onPress={showDialog}>Show Dialog</react_native_paper_1.Button>
                <react_native_paper_1.Portal>
                    <react_native_paper_1.Dialog visible={visible} onDismiss={hideDialog}>

                        <react_native_paper_1.Dialog.Content>


                            <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="New supplement" mode="outlined" placeholder='New supplement...' 
    // onChangeText={ (uusiOtsikko : string) => setDialogi({...dialogi, otsikko: uusiOtsikko})}
    onChangeText={(text) => setInput1(text)}/>

                            <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Hour" mode="outlined" placeholder='Hour...' 
    // onChangeText={ (uusiOtsikko : string) => setDialogi({...dialogi, otsikko: uusiOtsikko})}
    onChangeText={(text) => setInput2(text)}/>

                            <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="D number" mode="outlined" placeholder='D number..' 
    // onChangeText={ (uusiOtsikko : string) => setDialogi({...dialogi, otsikko: uusiOtsikko})}
    onChangeText={(text) => setInput3(text)}/>


                            <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="W number" mode="outlined" placeholder='W number..' 
    // onChangeText={ (uusiOtsikko : string) => setDialogi({...dialogi, otsikko: uusiOtsikko})}
    onChangeText={(text) => setInput4(text)}/>
                            
                            <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="M number" mode="outlined" placeholder='M number..' 
    // onChangeText={ (uusiOtsikko : string) => setDialogi({...dialogi, otsikko: uusiOtsikko})}
    onChangeText={(text) => setInput5(text)}/>

                            <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Y number" mode="outlined" placeholder='Y number..' 
    // onChangeText={ (uusiOtsikko : string) => setDialogi({...dialogi, otsikko: uusiOtsikko})}
    onChangeText={(text) => setInput6(text)}/>

                            <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Dose" mode="outlined" placeholder='Dose ..' 
    // onChangeText={ (uusiOtsikko : string) => setDialogi({...dialogi, otsikko: uusiOtsikko})}
    onChangeText={(text) => setInput7(text)}/>






                            <react_native_paper_1.Dialog.Actions>

                                <react_native_paper_1.FAB style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 90,
            height: 50
        }} icon={({ size }) => <react_native_paper_1.Text style={{ fontSize: 10, color: 'black' }}>S</react_native_paper_1.Text>} onPress={addCalendarInsertDB}/>





                                <react_native_paper_1.FAB style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 90,
            height: 50
        }} icon={({ size }) => <react_native_paper_1.Text style={{ fontSize: 10, color: 'black' }}>D</react_native_paper_1.Text>} onPress={hideDialog}/>





                            </react_native_paper_1.Dialog.Actions>


                        </react_native_paper_1.Dialog.Content>
                        <react_native_paper_1.Dialog.Actions>
                            <react_native_paper_1.Button onPress={hideDialog}>Done</react_native_paper_1.Button>
                        </react_native_paper_1.Dialog.Actions>
                    </react_native_paper_1.Dialog>
                </react_native_paper_1.Portal>
            </react_native_1.View>
        </react_native_paper_1.PaperProvider>);
};
exports.default = myAddCalendar;
