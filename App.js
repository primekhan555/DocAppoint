/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import OptionsScreen from './Screens/OptionsScreen';
import DoctorRegister from './Screens/DoctorRegister';
import PatientRegister from './Screens/PatientRegister';
import DoctorOptions from './Screens/DoctorOptions';
import PatientOptions from './Screens/PatientOptions';
import DoctorSignIn from './Screens/DoctorSignIn';
import PatientSignIn from './Screens/PatientSignIn';
import DoctorHome from './Screens/DoctorHome';
import PatientHome from './Screens/PatientHome';
import PatientHome1 from './Screens/PatientHome1';
import NewAppointment from './Screens/NewAppointment';
import BookingScreen from './Screens/BookingScreen';
import AppointmentDetail from './Screens/AppointmentDetail';
import SplashScreen from './Screens/SplashScreen';
import AreaDoctors from './Screens/AreaDoctors';
import PospondedAppoint from './Screens/PospondedAppoint';
import ForgotPassword from './Screens/ForgotPassword';
import DForgotPassword from './Screens/DForgotPassword';
const App =createStackNavigator({
  SplashScreen:{
    screen:SplashScreen,
  },
  OptionsScreen:{
    screen:OptionsScreen,
  },
  PatientRegister:{
    screen:PatientRegister
  },
  DoctorRegister:{
    screen:DoctorRegister
  },
  DoctorOptions:{
    screen:DoctorOptions,
  },
  PatientOptions:{
    screen:PatientOptions
  },
  DoctorSignIn:{
    screen:DoctorSignIn,
  },
  PatientSignIn:{
    screen:PatientSignIn,
  },
  DoctorHome:{
    screen:DoctorHome,
  },
  PatientHome:{
    screen:PatientHome,
  },
  PatientHome1:{
    screen:PatientHome1,
  },
  NewAppointment:{
    screen:NewAppointment,
  },
  BookingScreen:{
    screen:BookingScreen,
  },
  AppointmentDetail:{
    screen:AppointmentDetail,
  },
  AreaDoctors:{
    screen:AreaDoctors,
  },
  PospondedAppoint:{
    screen:PospondedAppoint,
  },
  ForgotPassword:{
    screen:ForgotPassword
  },
  DForgotPassword:{
    screen:DForgotPassword,
  }
})
export default createAppContainer(App);