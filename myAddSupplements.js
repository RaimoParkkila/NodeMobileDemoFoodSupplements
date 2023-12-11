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
const myModal_1 = __importDefault(require("./myModal"));
const containerWidth = screenWidth * 1.0;
const containerHeight = screenHeight * 0.90;
const react_1 = require("react");
const SQLite = __importStar(require("expo-sqlite"));
const myAddSupplements = (props) => {
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
    const addSupplementToDB = () => {
        console.log("should insert here");
        let supplement_name = input1 || "";
        let brand = input2 || "";
        let purpose = input3 || "";
        let description = input4 || "";
        let dose = input5 || "";
        let side_effects = input6 || "";
        let effect_terminates = input7 || "";
        let createdAt = new Date().toISOString();
        let upDatedAt = new Date().toISOString();
        let free_additional_information = input8 || "";
        // Pass the values to the modal
        //   toggleModal({
        //   supplement_name,
        //   brand,
        //   purpose,
        //  description,
        //  dose,
        //   side_effects,
        //  effect_terminates,
        // createdAt,
        //  upDatedAt,
        //   free_additional_information,
        //  });
        //modal
        console.log({ supplement_name,
            brand,
            purpose,
            description,
            dose,
            side_effects,
            createdAt,
            upDatedAt,
            free_additional_information,
        });
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO supplement_name (SUPPLEMENT_NAME, BRAND, PURPOSE, DESCRIPTION, DOSE, SIDE_EFFECTS, createdAt, upDatedAt, free_additional_information) VALUES (?,?,?,?,?,?,?,?,?)`, [
                supplement_name,
                brand,
                purpose,
                description,
                dose,
                side_effects,
                createdAt,
                upDatedAt,
                free_additional_information,
            ], (_, { rowsAffected, insertId }) => {
                if (rowsAffected > 0) {
                    //console.log(`Row inserted with ID: ${insertId}`);
                    alert(`Row inserted with ID: ${insertId}`);
                    hideDialog();
                }
                else {
                    //console.warn('No rows were inserted.');
                    alert('No rows were inserted.');
                }
            });
        }, (error) => {
            // This callback is invoked if there is an error in starting the transaction
            console.error('Error starting SQL transaction', error);
        });
        alert("here 115");
    };
    return (<react_native_paper_1.PaperProvider theme={customTheme}>

      <react_native_1.View>
       

        {/* Modal */}
        <myModal_1.default isVisible={isModalVisible} onClose={toggleModal} data={{
            supplement_name: '',
            brand: '',
            purpose: '',
            description: '',
            dose: '',
            side_effects: '',
            effect_terminates: '',
            createdAt: '',
            upDatedAt: '',
            free_additional_information: ''
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

              <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Brand" mode="outlined" placeholder='Brand...' onChangeText={(text) => setInput3(text)}/>

              <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Purpose" mode="outlined" placeholder='Purpose...' onChangeText={(text) => setInput4(text)}/>
              <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Description" mode="outlined" placeholder='Description...' onChangeText={(text) => setInput5(text)}/>

              <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Dose" mode="outlined" placeholder='Dose...' onChangeText={(text) => setInput6(text)}/>

              <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Side effects" mode="outlined" placeholder='Side effects...' onChangeText={(text) => setInput7(text)}/>
              <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Periodicity" mode="outlined" placeholder='Periodicity...' onChangeText={(text) => setInput8(text)}/>


              <react_native_paper_1.TextInput style={{ fontSize: 8, fontWeight: '100', }} label="Additional information" mode="outlined" placeholder='Additional information..' onChangeText={(text) => setInput9(text)}/>

              <react_native_paper_1.Dialog.Actions>

                <react_native_paper_1.FAB style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 90,
            height: 50
        }} icon={({ size }) => <react_native_paper_1.Text style={{ fontSize: 10, color: 'black' }}>S</react_native_paper_1.Text>} onPress={addSupplementToDB}/>





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
exports.default = myAddSupplements;
