import Image from "next/image";
import ChatComponent from '../components/ChatComponent';
import FileUploadComponent from "../components/UploadComponent";
export default function Home() {
  return (
    <div>
      <h1 style={{textAlign:'center', marginTop:'10px'}}>Welcome to My PDF Chatbot. Upload any PDF & ask questions!</h1>
      <ChatComponent />
      <FileUploadComponent />
    </div>
  );
}
