import { notification } from 'antd';
export default function Notification(type, message, desc) {
    notification[type]({
        message: message,
        description: desc,
        
    });
}
