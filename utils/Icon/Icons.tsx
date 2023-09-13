import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from '@expo/vector-icons';
import React from 'react';
import { RED_COLOR } from '../constants/ui';

export default {
  ImageProfile: (
    <Ionicons name="person-circle-outline" size={40} color="black" />
  ),
  Search: <AntDesign name="search1" />,
  Smile: <FontAwesome name="smile-o" />,
  Right: <AntDesign name="right" />,
  Plus: <MaterialIcons name="add" color="black" />,
  Minus: <Entypo name="minus" size={24} color="black" />,
  Message: (
    <MaterialCommunityIcons
      name="message-reply-text-outline"
      size={24}
      color="black"
    />
  ),
  Send: <FontAwesome name='send' />,
  Visa: <FontAwesome name="cc-visa" size={24} color="black" />,
  Coin: <FontAwesome5 name="bitcoin" size={24} color="black" />,
  Left: <AntDesign name='left' />,
  Recharge: <Ionicons name='download-outline' />,
  Call: <Feather name="phone-call" color="black" />,
  Map: <FontAwesome5 name="map-marked-alt" size={24} color="black" />,
  Email: <MaterialCommunityIcons name="email-outline" size={24} color="black" />,
  Lock: <FontAwesome name="lock" size={24} color="black" />,
  ShowPassword: <Entypo name="eye" size={24} color="black" />,
  HiddenPassword: <Entypo name="eye-with-line" size={24} color="black" />,
  Logout: <MaterialIcons name="logout" size={24} color={RED_COLOR} />
};
