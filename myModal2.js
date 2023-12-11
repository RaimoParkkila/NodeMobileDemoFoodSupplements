"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_2 = require("react");
const MyModal2 = ({ isVisible, onClose, data }) => {
    // Check if data is defined before accessing its properties
    const supplementName = data ? data.supplement_name || "" : "";
    const [isModalVisible, setModalVisible] = (0, react_2.useState)(true);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (<react_native_1.View>
      <react_native_1.Text>Insertion Successful!</react_native_1.Text>
      
      {/* Display the data */}
      <react_native_1.Text>Supplement Name: {supplementName}</react_native_1.Text>
      {/* Add more fields as needed */}

      <react_native_1.TouchableOpacity onPress={onClose}>
        <react_native_1.Text>Close</react_native_1.Text>
      </react_native_1.TouchableOpacity>

  

      
    </react_native_1.View>);
};
exports.default = MyModal2;
