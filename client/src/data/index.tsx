import {
    IoChatbubbleEllipsesOutline,
    IoPeopleOutline,
    IoSettingsOutline,
    IoLogInOutline,
    IoPersonOutline,
} from 'react-icons/io5';
import avatar from '../assets/avatar_4.jpg';
import { PiRobotLight } from 'react-icons/pi';

interface NavButton {
    index: number;
    icon: unknown;
}
export const Nav_Buttons: NavButton[] = [
    {
        index: 0,
        icon: <IoChatbubbleEllipsesOutline />,
    },
    {
        index: 1,
        icon: <IoPeopleOutline />,
    },
    {
        index: 2,
        icon: <PiRobotLight />,
    },
];
export const Nav_Setting = [
    {
        index: 3,
        icon: <IoSettingsOutline />,
    },
];
export const ChatList = [
    {
        id: 0,
        img: avatar,
        name: 'Quan Phat',
        msg: 'How are you today?',
        time: '9:36',
        unread: 2,
        pinned: true,
        online: true,
    },
    {
        id: 1,
        img: avatar,
        name: 'Ngan Tran',
        msg: 'How are you today?',
        time: '9:36',
        unread: 1,
        pinned: true,
        online: true,
    },
    {
        id: 2,
        img: avatar,
        name: 'Nguyen Van A',
        msg: 'How are you today?',
        time: '9:36',
        unread: 15,
        pinned: true,
        online: false,
    },
    {
        id: 3,
        img: avatar,
        name: 'Tony Kroos',
        msg: 'How are you today?',
        time: '9:36',
        unread: 1,
        pinned: false,
        online: false,
    },
    {
        id: 4,
        img: avatar,
        name: 'David Beckham',
        msg: 'How are you today?',
        time: '9:36',
        unread: 0,
        pinned: false,
        online: true,
    },
    {
        id: 5,
        img: avatar,
        name: 'Quan Phat',
        msg: 'How are you today?',
        time: '9:36',
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: 6,
        img: avatar,
        name: 'Quan Phat',
        msg: 'How are you today?',
        time: '9:36',
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: 7,
        img: avatar,
        name: 'Quan Phat',
        msg: 'How are you today?',
        time: '9:36',
        unread: 0,
        pinned: false,
        online: false,
    },
];
export const Chat_History = [
    {
        type: 'msg',
        message: 'Hi 👋🏻, How are ya ?',
        incoming: true,
        outgoing: false,
    },
    {
        type: 'divider',
        text: 'Today',
    },
    {
        type: 'msg',
        message: 'Hi 👋 Panda, not bad, u ?',
        incoming: false,
        outgoing: true,
    },
    {
        type: 'msg',
        message: 'Can you send me an abstarct image?',
        incoming: false,
        outgoing: true,
    },
    {
        type: 'msg',
        message: 'Ya sure, sending you a pic',
        incoming: true,
        outgoing: false,
    },

    {
        type: 'msg',
        subtype: 'img',
        message: 'Here You Go',
        img: avatar,
        incoming: true,
        outgoing: false,
    },
    {
        type: 'msg',
        message: 'Can you please send this in file format?',
        incoming: false,
        outgoing: true,
    },

    {
        type: 'msg',
        subtype: 'doc',
        message: 'Yes sure, here you go.',
        incoming: true,
        outgoing: false,
    },
    {
        type: 'msg',
        subtype: 'link',
        preview: avatar,
        message: 'Yep, I can also do that',
        incoming: true,
        outgoing: false,
    },
    {
        type: 'msg',
        subtype: 'reply',
        reply: 'This is a reply',
        message: 'Yep, I can also do that',
        incoming: false,
        outgoing: true,
    },
    {
        type: 'msg',
        subtype: 'reply',
        reply: 'This is a reply',
        message: 'Yep, I can also do that',
        incoming: true,
        outgoing: false,
    },
    {
        type: 'msg',
        message: 'Can you please send this in file format?',
        incoming: false,
        outgoing: true,
    },
    {
        type: 'msg',
        message: 'hahaha no ',
        incoming: true,
        outgoing: true,
    },
];

export const Profile_Menu = [
    {
        title: 'Profile',
        icon: <IoPersonOutline size={18} />,
    },
    {
        title: 'Settings',
        icon: <IoSettingsOutline size={18} />,
    },
    {
        title: 'Logout',
        icon: <IoLogInOutline size={20} />,
    },
];

