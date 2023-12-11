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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_native_paper_1 = require("react-native-paper");
const SQLite = __importStar(require("expo-sqlite"));
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const Location = __importStar(require("expo-location"));
const MyCalendar_1 = __importDefault(require("./MyCalendar"));
const mySupplements_1 = __importDefault(require("./mySupplements"));
const MyBottomFABs_1 = __importDefault(require("./MyBottomFABs"));
const myAbout_1 = __importDefault(require("./myAbout"));
const myAddSupplements_1 = __importDefault(require("./myAddSupplements"));
const myAddCalendar_1 = __importDefault(require("./myAddCalendar"));
const react_native_2 = require("react-native");
const { width: screenWidth, height: screenHeight } = react_native_2.Dimensions.get('window');
const containerWidth = screenWidth * 1.0;
const containerHeight = screenHeight * 0.90;
let lastNoteId;
let deleteThis;
const db = SQLite.openDatabase("muistiinpanolista.db");
db.transaction((tx) => {
    //tx.executeSql(`DROP TABLE supplement_name`);
    // tx.executeSql(`DROP TABLE myCalendar`);
    tx.executeSql(`DROP TABLE myCalendar`);
    tx.executeSql(`
     CREATE TABLE IF NOT EXISTS myCalendar (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  
      supplement_name TEXT,                    
       h_number NUMBER,                       
       d_number NUMBER,                    
       w_number NUMBER,                       
       m_number NUMBER,                       
       y_number NUMBER,                       
        createdAt  DATETIME,                  
        updatedAt  DATETIME,                   
        dose TEXT,                             
        taken TEXT                       
    ) `);
    //tx.executeSql(`DROP TABLE myCalendar`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS supplement_name (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    SUPPLEMENT_NAME TEXT,
    BRAND NUMBER,
    PURPOSE TEXT,
    DESCRIPTION TEXT,
    DOSE TEXT,
    SIDE_EFFECTS TEXT,
    EFFECT_TERMINATES TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    free_additional_information TEXT,
    FOREIGN KEY (supplement_name) REFERENCES myCalendar(supplement_name)
 )`);
    //tx.executeSql(`DROP TABLE supplement_name`);
}, (err) => {
    console.log(err);
    // alert("virhe rivi 87");
});
console.log("kaikki kunnossa2");
let extractedData = {};
let timestamp2 = "";
let note_id2 = 0;
let information2 = "";
let title2 = "";
let imagedata2 = "";
let supplement_name = "";
let brand = "";
let purpose = "";
let description = "";
let dose = "";
let side_effects = "";
let effect_terminates = "";
let createdAt = "";
let updatedAt = "";
let free_additional_information = "";
const App = () => {
    const [calendarLineGenerated, setCalendarLineGenerated] = (0, react_1.useState)(false);
    const generateAndSetLines = () => {
        generateCalendarLine("fake1", 10, 3, 2, 1, 2023, '15gr', 'NOT');
        setCalendarLineGenerated(true);
    };
    (0, react_1.useEffect)(() => {
        if (!calendarLineGenerated) {
            generateAndSetLines();
        }
    }, [calendarLineGenerated]);
    const [calendarData, setCalendarData] = (0, react_1.useState)([]);
    const [pressedStatus, setPressedStatus] = react_2.default.useState(1);
    const handleFabPress = (status) => {
        // Handle pressed status in App
        console.log(`FAB pressed with status: ${status}`);
        setPressedStatus(status);
    };
    const [myStatus, setMystatus] = (0, react_1.useState)(1);
    const [myTaken, setMyTaken] = (0, react_1.useState)(0);
    const [isDialogVisible, setDialogVisible] = (0, react_1.useState)(false);
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [currentNote, setCurrentNote] = (0, react_1.useState)(0);
    const [myFlag, setmyFlag] = (0, react_1.useState)(0);
    const generateCalendarLine = (supplement_name, h_number, d_number, w_number, m_number, y_number, dose, taken) => {
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO myCalendar (supplement_name, h_number, d_number, w_number, m_number, y_number, createdAt, updatedAt, dose, taken) VALUES (?, ?,?,?,?,?,?,?,?,?)`, [supplement_name, h_number, d_number, w_number, m_number, y_number, new Date().toISOString(), new Date().toISOString(), dose, taken], (_, { rowsAffected, insertId }) => {
                if (rowsAffected > 0) {
                    console.log(`Row inserted into myCalendar with ID: ${insertId}`);
                    //alert(`Row inserted into myCalendar with ID: ${insertId}`);
                }
                else {
                    console.warn('No rows were inserted into myCalendar.');
                    alert('No rows were inserted into myCalendar.');
                }
            });
        }, (error) => {
            console.error('Error starting SQL transaction', error);
        });
    };
    //generateCalendarLine("fake1", 10, 3, 2, 1, 2023, '15gr', 'NOT');
    const RenderJsonTable = (data) => {
        //console.log(108);
        if (typeof data === 'object' && 'data' in data) {
            extractedData = data.data;
            timestamp2 = extractedData.timestamp;
            supplement_name = extractedData.supplement_name;
            brand = extractedData.brand;
            purpose = extractedData.purpose;
            description = extractedData.description;
            dose = extractedData.dose;
            side_effects = extractedData.side_effects;
            effect_terminates = extractedData.effect_terminates;
            createdAt = extractedData.createdAt;
            updatedAt = extractedData.updatedAt;
            free_additional_information = extractedData.free_additional_information;
            information2 = extractedData.information;
            title2 = extractedData.title;
            title2 = extractedData.title;
            imagedata2 = extractedData.imagedata;
            note_id2 = extractedData.id;
        }
        else {
            console.error("Data does not have a 'data' property");
        }
        return (<react_native_1.View style={[styles.container, { width: containerWidth }]}>

        <div>My Calendar Component</div>
      </react_native_1.View>);
    };
    ////useEffect(() => {
    //// Function to fetch and log data
    ////const logSupplementData = () => {
    ////db.transaction((tx) => {
    //// tx.executeSql('SELECT * FROM supplement_name', [], (_, { rows }) => {
    //// const data = rows._array;
    //// console.log('Supplement Data:', data);
    ////});
    ////});
    ////};
    // Call the function when the component mounts
    //// logSupplementData();
    ////}, []); // Empty dependency array ensures the effect runs only once
    ////return;
    const getLocation = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { status } = yield Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // alert('Permission to access location was denied');
                return;
            }
            const location = yield Location.getCurrentPositionAsync({});
        }
        catch (error) {
            //console.error('Error getting location:', error);
        }
    });
    const [dialogi, setDialogi] = (0, react_1.useState)({ auki: false, otsikko: "", teksti: "" });
    const [userLocation, setUserLocation] = (0, react_1.useState)(null);
    const Dialogi2 = () => {
        const [visible, setVisible] = react_2.default.useState(false);
        const showDialog2 = () => setVisible(true);
        const hideDialog2 = () => setVisible(false);
        const paluu = () => {
            //alert("paluu");
            hideDialog2();
            setDialogi(Object.assign(Object.assign({}, dialogi), { auki: false, teksti: "", otsikko: "" }));
            //kuvaustiedot.tilanne = 2;
        };
        const handleFabPress = (e) => {
            // Your logic here
            //alert("the number is currentNote");
            const myNumber = currentNote;
            deleteOneOld(currentNote);
        };
        return (<react_native_paper_1.PaperProvider>
        <react_native_1.View>


          <react_native_paper_1.FAB style={styles.fabLeft} label="Haluatko poistaa" onPress={showDialog2}/>

          <react_native_paper_1.FAB style={styles.fabRight} label="Paluu listaukseen" onPress={paluu}/>
          <react_native_paper_1.Portal>
            <react_native_paper_1.Dialog visible={visible} onDismiss={hideDialog2} style={styles.dialogi2}>
              <react_native_paper_1.Dialog.Title>Poistetaanko?</react_native_paper_1.Dialog.Title>
              <react_native_paper_1.Dialog.Actions>
                <react_native_paper_1.FAB style={styles.vahvistaNappi} label="EI" onPress={hideDialog2}/>



              </react_native_paper_1.Dialog.Actions>
              <react_native_paper_1.Dialog.Actions>


                <react_native_paper_1.FAB style={styles.vahvistaNappi} label="KYLLÄ" onPress={handleFabPress}/>


              </react_native_paper_1.Dialog.Actions>
            </react_native_paper_1.Dialog>
          </react_native_paper_1.Portal>
        </react_native_1.View>

      </react_native_paper_1.PaperProvider>);
    };
    getLocation();
    const [notes, setNotes] = (0, react_1.useState)([]);
    const [images, setImages] = (0, react_1.useState)([]);
    const showDialog2 = () => {
        setVisible(true);
    };
    const hideDialog2 = () => {
        setVisible(false);
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
    const deleteOne = (number) => {
        // alert(292);
        setCurrentNote(number);
        //kuvaustiedot.tilanne = 5;
        setDialogi(Object.assign(Object.assign({}, dialogi), { auki: true }));
    };
    const deleteOneOld = (number) => {
        console.log(63);
        console.log(number);
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM supplements WHERE id = ?`, [number], (_tx, rs) => {
                haeNotes();
            });
        }, (err) => console.log(err));
    };
    const tyhjennaMuistiinpanolista = () => {
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM supplement_name`, [], (_tx, rs) => {
            });
        }, (err) => console.log(err));
    };
    const lisaaMuistiinpano = () => {
        //alert(423); //this is okay
        let supplement_name = input1;
        let brand = input2;
        let purpose = input3;
        let description = input4;
        let dose = input5;
        let side_effects = input6;
        let effect_terminates = input7;
        let createdAt = new Date().toISOString();
        let upDatedAt = new Date().toISOString();
        let free_additional_information = input8;
        console.log(free_additional_information);
        //alert(free_additional_information);
        let h_number = 20;
        let d_number = 1;
        let _number = 1;
        let w_number = 47;
        let m_number = 11;
        let y_number = 2023;
        let taken = "early in the evening";
        let myString2 = " tx.executeSql(`INSERT INTO supplement_name (SUPPLEMENT_NAME, BRAND, PURPOSE, DESCRIPTION, DOSE, SIDE_EFFECTS, createdAt, upDatedAt, free_additional_information) VALUES (?,?,?,?,?,?,?,?,?)`";
        console.log(myString2);
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
            ], (_tx, rs) => {
                console.log("inserted");
                // alert("fine_fine_fine");
                haeNotes();
            });
        }, (err) => console.log(err));
        //TEMPORAL INSERT END
        // console.log("not inserted");
        setDialogi(Object.assign(Object.assign({}, dialogi), { auki: false, teksti: "", otsikko: "" }));
        haeNotes();
    };
    // console.log("445");
    //lisaaMuistiinpano();
    const haeNotes = () => {
        console.log(460);
        ///
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM supplement_name`, [], (_tx, rs) => {
                setNotes(rs.rows._array);
                // console.log("468 " + JSON.stringify(rs.rows._array));
                // console.log("done 542, this is fine totally fine"); //record set is empty?
                // console.log("468 " + JSON.stringify(rs.rows._array));
            });
        }, (err) => console.log(err));
        db.transaction((tx) => {
            tx.executeSql(`SELECT MAX(id) as lastNoteId FROM supplements`, [], (tx, result) => {
                lastNoteId = result.rows.item(0).lastNoteId;
            });
        }, (error) => {
            //console.error(error);
        });
    };
    //lisaaMuistiinpano();
    haeNotes();
    (0, react_1.useEffect)(() => {
        haeNotes();
    }, []);
    const handleFabPressX = (e) => {
        // Your logic here
        // alert("the number is currentNote");
        //   const myNumber: number = currentNote;
        //  deleteOneOld(currentNote);
        lisaaMuistiinpano();
        setMystatus(1);
    };
    const handleFabPress2 = (e) => {
        alert("Kalenteri");
        //setMystatus(2);
        // setmyFlag(2);
    };
    const handleFabPress3 = (e) => {
        //alert("Vahvista otettu");
        if (myTaken == 0) {
            setMyTaken(1);
            // alert("TAKEN");
        }
        else {
            setMyTaken(0);
            //alert("NOT TAKEN");
        }
        //UPDATE CALENDARTAKEN STATUS INTO DATABASE
    };
    //display calendar
    //more the select elsewhere
    //console.log("do select from calendar here")
    let dose = "21gr";
    //let stops_effecting="20:30";
    let taken = "YES";
    let y_number = 2023;
    const theme = Object.assign(Object.assign({}, react_native_paper_1.DefaultTheme), { colors: Object.assign(Object.assign({}, react_native_paper_1.DefaultTheme.colors), { text: "orange" }) });
    return (<react_native_1.View style={styles.container}>
      {/* Case 1: List Supplements */}
      {pressedStatus === 1 && (
        // Put your logic for listing supplements here
        <>

          <react_native_1.View style={styles.container}>

            <MyBottomFABs_1.default onFabPress={handleFabPress}/>





            <react_native_1.View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
              <react_native_1.View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


                <mySupplements_1.default key="some_unique_value660p"/>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>
        </>)}

      {/* Case 2: Display Add Supplement */}
      {pressedStatus === 2 && (
        // Put your logic for listing supplements here
        <>
          <react_native_1.View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>

            <MyBottomFABs_1.default onFabPress={handleFabPress}/>




            <react_native_1.View style={[styles.container2, { width: containerWidth }, { height: containerHeight }]}>
              <react_native_1.View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>
                <react_native_paper_1.Text>case  2 </react_native_paper_1.Text>
                <react_native_paper_1.Text>Add Supplement </react_native_paper_1.Text>

                <myAddSupplements_1.default key="some_unique_value2" visible={true} hideDialog={undefined}/>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>
        </>)}

      {/* Case 3: List Calendar */}
      {pressedStatus === 3 && !calendarLineGenerated && (<>
          {generateCalendarLine("fake1", 10, 3, 2, 1, 2023, '15gr', 'NOT')}
    
        </>)}


      {/* Case 4: Add to Calendar */}
      {pressedStatus === 4 && (
        // Put your logic for listing supplements here
        // Put your logic for listing supplements here
        <>



          <react_native_1.View style={styles.container}>

            <MyBottomFABs_1.default onFabPress={handleFabPress}/>





            <react_native_1.View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
              <react_native_1.View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


                <MyCalendar_1.default key="some_unique_value660e"/>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>
        </>)}

      {pressedStatus === 5 && (
        // Put your logic for listing supplements here
        <>
          <react_native_1.View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>

            <MyBottomFABs_1.default onFabPress={handleFabPress}/>




            <react_native_1.View style={[styles.container2, { width: containerWidth }, { height: containerHeight }]}>
              <react_native_1.View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>
                <react_native_paper_1.Text>case  5 </react_native_paper_1.Text>
                <react_native_paper_1.Text>Add to Calendar </react_native_paper_1.Text>

                <myAddCalendar_1.default key="some_unique_value2f" visible={true} hideDialog={undefined}/>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>
        </>)}


      {pressedStatus === 6 && (<>

          <react_native_1.View style={styles.container}>

            <MyBottomFABs_1.default onFabPress={handleFabPress}/>





            <react_native_1.View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
              <react_native_1.View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


                <myAbout_1.default key="about"/>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>
        </>)}
      {/* Default: Other Cases */}
      {myStatus !== 1 && myStatus !== 2 && myStatus !== 3 && myStatus !== 4 && myStatus !== 6 && myStatus !== 6 && (<react_native_1.View>
          <react_native_paper_1.Text>Other Case</react_native_paper_1.Text>
        </react_native_1.View>)}
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    submitButton: {
        position: 'absolute',
        alignItems: 'center',
        valignItems: 'bottom',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        valignItems: 'bottom',
        width: containerWidth,
        height: containerHeight,
        backgroundColor: 'pink', // Adjust as needed
        paddingHorizontal: 16, // Optional: Add horizontal padding
    },
    container2: {
        flex: 1,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        valignItems: 'bottom',
        width: containerWidth,
        height: containerHeight,
        backgroundColor: 'pink', // Adjust as needed
        paddingHorizontal: 16, // Optional: Add horizontal padding
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 420,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dialogi2: {
        flex: 1,
        top: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        valignItems: 'bottom',
        justifyContent: 'center',
        width: 420,
        height: '80%',
        // height: 0.2 * screenHeight, // Set the height to 80% of the screen height
    },
    dialog: {
        flex: 1,
        top: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        valignItems: 'bottom',
        justifyContent: 'center',
        width: 420,
        height: '80%',
        // height: 0.2 * screenHeight, // Set the height to 80% of the screen height
    },
    nappiSulje: {
        position: 'absolute',
        margin: 20,
        bottom: 0,
        right: 0,
        width: 120
    },
    vahvistaNappi: {
        position: 'absolute',
        margin: 20,
        botton: 20,
        left: 0,
        width: 150,
        height: 15,
    },
    vahvistaNappi2: {
        position: 'absolute',
        margin: 20,
        top: 20,
        right: 0,
        width: 20,
        height: 15,
    },
    vahvistaNappi3: {
        position: 'absolute',
        margin: 20,
        bottom: 10,
        right: 0,
        width: 200,
        height: 45,
    },
    kuva: {
        top: 55,
        width: '20%',
        resizeMode: 'stretch'
    },
    fileName: {
        fontSize: 30,
        marginTop: 10,
    },
    image: {
        width: screenWidth,
        height: 0.6 * screenHeight,
        aspectRatio: 9 / 16,
        resizeMode: 'stretch',
        bottom: 0,
    },
    fabLeftSecond: {
        position: 'absolute',
        margin: 16,
        left: 0,
        width: 200,
        bottom: 55,
    },
    fabLeftRight: {
        position: 'absolute',
        margin: 16,
        right: 0,
        width: 200,
        bottom: 125,
    },
    fabLeftThird: {
        position: 'absolute',
        margin: 16,
        left: 0,
        width: 200,
        bottom: 125,
    },
    fabLeft: {
        position: 'absolute',
        margin: 16,
        left: 0,
        width: 200,
        bottom: 0,
    },
    fabRight: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    formText: {
        fontSize: 8,
        fontWeight: 'bold',
    },
    dataCell: {
        fontSize: 8,
        fontWeight: 'bold',
    },
    fabRightSecond: {
        position: 'absolute',
        margin: 16,
        right: 0,
        width: 200,
        bottom: 55,
    },
    fabRightThird: {
        position: 'absolute',
        margin: 16,
        right: 0,
        width: 200,
        bottom: 55,
    },
});
exports.default = App;
