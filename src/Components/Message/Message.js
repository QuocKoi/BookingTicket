import {message} from 'antd'
export default function Message(type,text) {
    message[type](<span className='font-semibold'>{text}</span>)
}
