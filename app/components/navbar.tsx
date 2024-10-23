import AdminOnly from "./adminOnly";
import HomeButton from "./homebutton";
import UserInfo from "./userInfo";


export default function Navbar() {

    return (
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center">
                <HomeButton />
            </div>
            <div className="flex justify-end space-x-8"> 
                <AdminOnly />
                <UserInfo />
            </div>
        </div>
    );
};